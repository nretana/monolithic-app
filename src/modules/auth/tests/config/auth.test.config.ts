import { AppMockTestConfig } from '@/modules/core/@core-types/app-test';
import { AuthModule, AuthFeatures } from '@/modules/auth/@auth-types/auth-module';
import { AuthTestCases } from '@/modules/auth/@auth-types/auth-test';


export const authTestConfig: AppMockTestConfig<AuthModule, AuthFeatures, AuthTestCases> = {
    auth: {
        signin: [
            {
                testCase:  'signin',
                state: 'success',
                handlers: {
                    success: [],
                    failed: []
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
        ]
    }
}