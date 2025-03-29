
export type AuthEndpoint = {
    baseUrl: string,
    headers?: {
        'Content-Type': String
    },
    endpoints: {
        signIn: string,
        signUp: string,
        signOut: string
    }
}