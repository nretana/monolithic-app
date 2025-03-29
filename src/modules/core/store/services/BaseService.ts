import axios, { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { PERSIST_STORE_NAME } from '@/modules/core/constants/app.constant'
import deepParseJson from '@/modules/core/utils/deepParseJson'
import type { JWUserToken } from '@/modules/auth/@auth-types/auth'
import store from '@/modules/core/store'
import { signInSuccess, signOutSuccess, tokenExpired } from '@/modules/auth/store/slices'
import { appConfig } from '@/modules/core/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/modules/core/constants/api.constant'
import { AUTH_API_BASE_URL, 
         AUTH_GRANT_TYPE_KEY, 
         AUTH_REFRESH_TOKEN_KEY,
         AUTH_CLIENT_ID_KEY,
         AUTH_CLIENT_ID_PARAM,
         AUTH_REFRESH_TOKEN_GRANT_TYPE_PARAM } from '@/modules/auth/constants/auth.api.constant'


const unauthorizedCode = [401];
const BaseService = axios.create();

const BackgroundService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
});

BaseService.interceptors.request.use(
    async (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let session = (persistData as any).auth.session;
        let accessToken = session.token;
        let isSignedIn = session.signedIn || session.signedInSSO;

        const unixDateNow = Math.floor(Date.now() / 1000);
        const tokenInfo = accessToken ? jwtDecode<JWUserToken>(accessToken) : null;
        if(tokenInfo && tokenInfo.exp && isSignedIn){
            const expirationTokenDate = tokenInfo.exp;
            const diffTime = dayjs(expirationTokenDate).diff(unixDateNow);

            if(diffTime <= 0){
                try {
                    const newAccessTokenParams = new URLSearchParams();
                    newAccessTokenParams.append(AUTH_GRANT_TYPE_KEY, AUTH_REFRESH_TOKEN_GRANT_TYPE_PARAM);
                    newAccessTokenParams.append(AUTH_CLIENT_ID_KEY, AUTH_CLIENT_ID_PARAM);
                    newAccessTokenParams.append(AUTH_REFRESH_TOKEN_KEY, session.refreshToken);
                    
                    const newAccessTokenResponse = await BackgroundService.post(`${AUTH_API_BASE_URL}/protocol/openid-connect/token`, newAccessTokenParams);
                    const newAccessToken: { token: string, refreshToken: string } = {
                        token: newAccessTokenResponse?.data['access_token'],
                        refreshToken: newAccessTokenResponse?.data['refresh_token']
                    }
                    store.dispatch(signInSuccess(newAccessToken));
                    config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
                }
                catch(error){
                    store.dispatch(tokenExpired(true));
                }
                return config;
            }
        }

        if (!accessToken) {
            const { auth } = store.getState();
            accessToken = auth.session.token;
        }

        if (accessToken) {
            config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error as AxiosError;

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess());
        }

        return Promise.reject(error);
    }
)

export default BaseService;
