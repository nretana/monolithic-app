import { SSO_API_URL, 
         AUTH_CLIENT_ID_PARAM,
         SSO_RESPONSE_TYPE_PARAM,
         AUTH_SCOPE_PARAM } from '@/modules/auth/constants/auth.api.constant';

export const ssoConfig = {
    authority: SSO_API_URL,
    client_id: AUTH_CLIENT_ID_PARAM,
    scope: AUTH_SCOPE_PARAM,
    response_type: SSO_RESPONSE_TYPE_PARAM,
    staleStateAgeInSeconds: 30
}