
export type SignInCredential = {
    username: string
    password: string
}

export type SignInRequest = SignInCredential & {
    grantType: string,
    clientId: string
}

export type SignInResponse = {
    token: string,
    refreshToken: string
}