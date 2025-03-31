import { AuthEndpoint } from '@/modules/auth/@auth-types/auth-endpoint';
import { AUTH_API_BASE_URL } from '../constants/auth.api.constant';

export const authEndpoints: AuthEndpoint = {
    baseUrl: AUTH_API_BASE_URL,
    endpoints: {
        signIn: '/protocol/openid-connect/token',
        signUp: '/users',
        signOut: '/protocol/openid-connect/logout'
    }
}