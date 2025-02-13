
export type ApiError = {
    message: string
}

export type ApiResponse<T> = {
    data: T,
    isSuccess: boolean,
    error: ApiError
}

type UserRoles = {
    roles: string[]
}

export type JWUserToken = {
    exp: number,
    iat: number,
    jti: string
    iss: string
    aud: string
    sub: string
    typ: string
    sid: string
    realmAccess: UserRoles,
    name: string,
    preferredUsername: string,
    familyName: string,
    givenName: string,
    picture: string,
    email: string,
    emailVerified: boolean
}

export type AuthFlow = 'sign-in' | 'sign-out';

export type Status = 'success' | 'failed'

export type AuthResponse = {
    status: Status,
    message: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

