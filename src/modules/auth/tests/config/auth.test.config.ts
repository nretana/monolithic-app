import { http, HttpResponse } from 'msw';
import { AppMockTestConfig } from '@/modules/core/@core-types/app-test';
import { AuthModule, AuthFeatures } from '@/modules/auth/@auth-types/auth-module';
import { AuthTestCases } from '@/modules/auth/@auth-types/auth-test';
import { authEndpoints } from '@/modules/auth/config/auth.endpoints.config';
import { getJsonResponse } from '@/modules/core/tests/utils/getJsonResponse';


export const authTestConfig: AppMockTestConfig<AuthModule, AuthFeatures, AuthTestCases> = {
    auth: {
        signin: [
            {
                testCase: 'signin',
                state: 'success',
                handlers: {
                    success: [http.post(`${authEndpoints.baseUrl}${authEndpoints.endpoints.signIn}`,
                                        async({ request }) => {
                                            const jsonResponse = await getJsonResponse('auth', 'signin');
                                            return HttpResponse.json(jsonResponse);
                              })],
                    failed: [http.post(`${authEndpoints.baseUrl}${authEndpoints.endpoints.signIn}`,
                                      ({ request }) => new HttpResponse(null, { status: 500 }))]
                }
            }
        ],
        signup: [
            {
                testCase: 'signup',
                state: 'success',
                handlers: {
                    success: [],
                    failed: []
                }
            }
        ],
        signout: [
            {
                testCase: 'signout',
                state: 'success',
                handlers: {
                    success: [http.post(`${authEndpoints.baseUrl}${authEndpoints.endpoints.signOut}`,
                                        ({ request }) => HttpResponse.json({}, { status: 204 }))],
                    failed: [http.post(`${authEndpoints.baseUrl}${authEndpoints.endpoints.signOut}`,
                                        ({ request }) => new HttpResponse(null, { status: 500 }))]
                }
            }
        ]
    }
}