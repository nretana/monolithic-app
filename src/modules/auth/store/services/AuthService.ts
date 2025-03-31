import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '@/modules/auth/@auth-types/auth';
import type { SignInCredential, SignInResponse } from '@/modules/auth/@auth-types/signinAuth';
import type { SignUpCredential, SignUpRequestParams, SignUpResponse } from '@/modules/auth/@auth-types/signupAuth';
import {  CONTENT_TYPE_URL_ENCODED, 
          REQUEST_HEADER_CONTENT_TYPE_KEY, 
          CONTENT_TYPE_JSON } from '@/modules/core/constants/api.constant';
import { AUTH_API_BASE_URL,
         AUTH_GRANT_TYPE_KEY, 
         AUTH_CLIENT_ID_KEY,
         AUTH_REFRESH_TOKEN_KEY, 
         AUTH_CLIENT_ID_PARAM, 
         AUTH_PASSWORD_GRANT_TYPE_PARAM } from '@/modules/auth/constants/auth.api.constant';
import { ERROR_CODE_BAD_REQUEST } from '@/modules/auth/constants/auth.errorcodes.constant';
import { ERROR_MESSAGE_GENERAL_ERROR } from '@/modules/core/constants/errormessages.constant';
import { ERROR_MESSAGE_INVALID_CREDENTIALS, 
         ERROR_MESSAGE_INVALID_TOKEN } from '@/modules/auth/constants/auth.errormessages.constant';
import BaseService from '@/modules/core/store/services/BaseService';
import { authEndpoints } from '../../configs/auth.endpoints.config';


type AuthApiService = {
    initRequestConfig: AxiosRequestConfig,
    useSignInMutation: (params?: SignInCredential) => UseMutationResult<ApiResponse<SignInResponse | null>, Error, SignInCredential, unknown>,
    useSignUpMutation: (params?: SignUpCredential) => UseMutationResult<ApiResponse<SignUpResponse | null>, Error, SignUpCredential, unknown>
    useSignOutMutation: () => UseMutationResult<ApiResponse<null>, Error, string, unknown>
}

const getErrorResponse = (error: AxiosError) => {
    let errorMessage = ERROR_MESSAGE_GENERAL_ERROR;
    const response = error.response as AxiosResponse;

    if(response){
        switch(response.status){
            case 401:
                errorMessage = error.code === ERROR_CODE_BAD_REQUEST ? 
                               ERROR_MESSAGE_INVALID_CREDENTIALS : 
                               ERROR_MESSAGE_INVALID_TOKEN;
                break;
            case 500:
            default:
                errorMessage = ERROR_MESSAGE_GENERAL_ERROR;
                break;
        }
    }
    return errorMessage
}

const authApi: AuthApiService = {
    initRequestConfig: {
         baseURL: AUTH_API_BASE_URL,
         headers: { [REQUEST_HEADER_CONTENT_TYPE_KEY]: CONTENT_TYPE_URL_ENCODED }
    },
    useSignInMutation: function () : UseMutationResult<ApiResponse<SignInResponse | null>, Error, SignInCredential, unknown> {
            const mutationFn = async (params: SignInCredential) : Promise<ApiResponse<SignInResponse | null>> => {
                try {
                    const signInParams = new URLSearchParams();
                    signInParams.append("username", params?.username);
                    signInParams.append("password", params?.password);
                    signInParams.append(AUTH_GRANT_TYPE_KEY, AUTH_PASSWORD_GRANT_TYPE_PARAM);
                    signInParams.append(AUTH_CLIENT_ID_KEY, AUTH_CLIENT_ID_PARAM);

                    const response = await BaseService({ ...authApi.initRequestConfig,
                                                            url: authEndpoints.endpoints.signIn,
                                                            data: signInParams,
                                                            method: 'POST' });
                    if(response && response.data !== null) {
                        const signInData: any = {
                            token: response?.data['access_token'],
                            refreshToken: response?.data['refresh_token']
                        }
                        return { data: signInData, 
                                 isSuccess: true } as ApiResponse<SignInResponse | null>;
                    }

                    return { data: null, 
                             isSuccess: false, 
                             error: { message:  ERROR_MESSAGE_GENERAL_ERROR }
                           } as ApiResponse<SignInResponse | null>;
                }
                catch(error: unknown){
                    return { data: null, 
                             isSuccess: false, 
                             error: { message:  getErrorResponse(error as AxiosError) }  
                           } as ApiResponse<SignInResponse | null>;
                }
            }

            return useMutation({ mutationKey: ['sign-in'], mutationFn });
    },
    useSignUpMutation: function () {
        const mutationFn = async(params: SignUpCredential) => {
            const initConfig: AxiosRequestConfig = {
                headers: { [REQUEST_HEADER_CONTENT_TYPE_KEY]: CONTENT_TYPE_JSON }
            }

            const signUpParams: SignUpRequestParams = {
                username: params.username,
                email: params.email,
                enable: true,
                credentials: [{ type:'password', 
                                value: params.password, 
                                temporary: false }]
            }

            try {
                const response = await BaseService({ ...initConfig,
                                                        url: authEndpoints.endpoints.signUp,
                                                        data: signUpParams,
                                                        method: 'POST'});
                if(response && response.status === 201){
                    return { data: { username: signUpParams.username, email: signUpParams.email },
                             isSuccess: true, 
                             error: { message:  ERROR_MESSAGE_GENERAL_ERROR } 
                      } as ApiResponse<SignUpResponse | null>;
                }

                return { data: null, 
                         isSuccess: false, 
                         error: { message:  ERROR_MESSAGE_GENERAL_ERROR } 
                       } as ApiResponse<SignUpResponse | null>;
            }
            catch(error: unknown){
                return { data: null, 
                         isSuccess: false, 
                         error: { message:  getErrorResponse(error as AxiosError) }
                  } as ApiResponse<SignUpResponse | null>;
            }
        }

        return useMutation({ mutationKey: ['sign-up'], mutationFn, retry: false });
    },
    useSignOutMutation: function (): UseMutationResult<ApiResponse<null>, Error, string, unknown> {

        const mutationFn = async(refreshToken: string) => {
            try {
               
                const signoutRequestParams = new URLSearchParams();
                signoutRequestParams.append(AUTH_CLIENT_ID_KEY, AUTH_CLIENT_ID_PARAM);
                signoutRequestParams.append(AUTH_REFRESH_TOKEN_KEY, refreshToken);

                const response = await BaseService({ ...authApi.initRequestConfig,
                                                        url: authEndpoints.endpoints.signOut,
                                                        method: 'POST',
                                                        data: signoutRequestParams
                });

                if(response && response.status === 204){
                    return { isSuccess: true,
                             error: { message:  ERROR_MESSAGE_GENERAL_ERROR } } as ApiResponse<null>;
                }

                return { isSuccess: false,
                         error: { message:  ERROR_MESSAGE_GENERAL_ERROR } } as ApiResponse<null>;
            }
            catch(error: unknown){
                return { isSuccess: false, 
                         error: { message:  getErrorResponse(error as AxiosError) } } as ApiResponse<null>;
            }
        }

        return useMutation({ mutationKey: ['sign-out'], mutationFn });
    }
}

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = authApi;
