//auth flows
export const SIGN_IN_AUTH_FLOW = 'sign-in'; 
export const SIGN_OUT_AUTH_FLOW = 'sign-out';


//auth urls
export const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;


//sso urls
export const SSO_API_URL = `${AUTH_API_BASE_URL}`;
export const SSO_REDIRECT_URI = import.meta.env.VITE_SSO_REDIRECT_URI;
export const SSO_SIGN_IN_REDIRECT_URI = `${import.meta.env.VITE_SSO_REDIRECT_URI}?authflow=${SIGN_IN_AUTH_FLOW}`;


//auth keys
export const AUTH_CLIENT_ID_KEY = 'client_id'
export const AUTH_GRANT_TYPE_KEY = 'grant_type';
export const AUTH_REFRESH_TOKEN_KEY = 'refresh_token';

//sso keys
export const SSO_SCOPE_KEY= 'scope'
export const SSO_IDP_HINT_KEY = 'kc_idp_hint';


//auth params
export const AUTH_CLIENT_ID_PARAM = import.meta.env.VITE_AUTH_APP_CLIENT_ID;
export const AUTH_REST_CLIENT_ID_PARAM = import.meta.env.VITE_AUTH_REST_CLIENT_ID;
export const AUTH_PASSWORD_GRANT_TYPE_PARAM = import.meta.env.VITE_AUTH_PASSWORD_GRANT_TYPE;
export const AUTH_CREDENTIALS_GRANT_TYPE_PARAM = import.meta.env.VITE_AUTH_CREDENTIALS_GRANT_TYPE;
export const AUTH_REFRESH_TOKEN_GRANT_TYPE_PARAM = import.meta.env.VITE_AUTH_REFRESH_TOKEN_GRANT_TYPE;


//sso params
export const SSO_RESPONSE_TYPE_PARAM = import.meta.env.VITE_SSO_RESPONSE_TYPE;
export const SSO_SCOPE_PARAM= import.meta.env.VITE_SSO_SCOPE;
export const SSO_GOOGLE_IDP_HINT_PARAM = import.meta.env.VITE_SSO_GOOGLE_IDP_HINT;
export const SSO_GITHUB_IDP_HINT_PARAM = import.meta.env.VITE_SSO_GITHUB_IDP_HINT;
