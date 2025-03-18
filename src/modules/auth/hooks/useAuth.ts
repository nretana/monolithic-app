import { jwtDecode } from 'jwt-decode';
import { setUser, signInSuccess, signOutSuccess } from '@/modules/auth/store/slices/index';
import type { User } from 'oidc-client-ts';
import type { JWUserToken, AuthResponse } from '@/modules/auth/@auth-types/auth';
import type { SignInResponse } from '@/modules/auth/@auth-types/signinAuth';
import type { UserInfo } from '@/modules/auth/@auth-types/userInfo';
import { appConfig } from '@/modules/core/configs/app.config';
import { REDIRECT_URL_KEY } from '@/modules/core/constants/app.constant';
import { SSO_IDP_HINT_KEY, SSO_GOOGLE_IDP_HINT_PARAM, SSO_SIGN_IN_REDIRECT_URI } from '@/modules/auth/constants/auth.api.constant';
import { useAuth as useOidc } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/modules/core/store';
import useQuery from '@/modules/core/hooks/useQuery';
import { useSignInMutation, useSignUpMutation } from '@/modules/auth/store/services/AuthService';
import removeAllCookies from '@/modules/core/utils/removeAllCookies';
import { useSignOutMutation } from '@/modules/auth/store/services/AuthService';


function useAuth() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const { token, signedIn, refreshToken } = useAppSelector((state) => state.auth.session);
    const signInMutation = useSignInMutation();
    const signUpMutation = useSignUpMutation();
    const signOutMutation = useSignOutMutation();
    const { clearStaleState, removeUser, signinRedirect } = useOidc();


    const signIn = async({ username, password }: { username: string, password: string }): Promise<AuthResponse | undefined> => {
        try {

            const response = await signInMutation.mutateAsync({ username: username, password });
            if(response && !response.isSuccess){
                return { status: 'failed',
                         message: response.error && response.error?.message && response.error?.message };
            }

            const { token, refreshToken } = response?.data as SignInResponse;
            afterSignIn(token, refreshToken);
            return { status: 'success', message: '' };
        }
        catch (error: any){
            return { status: 'failed',
                     message: error && error?.message && error?.message };
        }
    }

    const signInSSO = async (idpHint: string) => {
        try{
            const extraParams = { [SSO_IDP_HINT_KEY]: idpHint };
            await signinRedirect({ redirect_uri: SSO_SIGN_IN_REDIRECT_URI, 
                                   extraQueryParams: extraParams});
        }
        catch(error){
            clearStaleState();
            removeUser();
            removeAllCookies();
        }
    }

    const signInSSOCallback = (user: User) => {
        try {
            const token = user.access_token;
            const refreshToken = user.refresh_token || '';
            if(token === '' || refreshToken === ''){
                throw Error('Empty user data');
            }

            afterSignIn(token, refreshToken, true);
            navigate(appConfig.authenticatedEntryPath);
        }
        catch(error) {
            clearStaleState();
            removeUser();
            navigate(appConfig.unAuthenticatedEntryPath);
        }
    }

    const signUp  = async({ username, email, password }: { username: string, email: string, password: string }): Promise<AuthResponse | undefined> => {

        try {

            const response = await signUpMutation.mutateAsync({ username, email, password });
            if(response && !response.isSuccess){
                return { status: 'failed',
                         message: response.error && response.error?.message && response.error?.message };
            }
            return { status: 'success', message: '' };
        }
        catch (error: any) {
            return { status: 'failed',
                     message: error && error?.message && error?.message };
        }
    }

    const signOut = async (): Promise<AuthResponse | undefined> => {
        try{
            if(refreshToken === null){
                throw Error("refresh token not provided");
            }

            const response = await signOutMutation.mutateAsync(refreshToken);
            if(response && !response.isSuccess){
                return { status: 'failed',
                         message: response.error && response.error?.message && response.error?.message };
            }

            handleSignOut();
            clearStaleState();
            removeUser();
            removeAllCookies();
        }
        catch(error: any){
            return { status: 'failed',
                     message: error && error?.message && error?.message };
        }
    }

    const afterSignIn = (token: string, refreshToken: string, isSignInSSO?: boolean) => {
        const tokenInfo = jwtDecode<JWUserToken>(token);
        const userInfo: UserInfo = {
            avatar: tokenInfo?.picture || '',
            name: tokenInfo?.name || '',
            username: tokenInfo.preferredUsername || 'Anonymous',
            email: tokenInfo?.email || '',
            authority: tokenInfo?.resourceAccess ?
                       [...tokenInfo?.resourceAccess?.roles] : 
                       ['USER']
        }

        dispatch(signInSuccess({ token, refreshToken, isSignInSSO }));
        dispatch(setUser(userInfo));
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                name: '',
                username: '',
                email: '',
                authority: [],
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    return {
        authenticated: token && signedIn,
        signUp,
        signIn,
        signInSSO,
        signInSSOCallback,
        signOut
    }
}

export default useAuth;
