
export type UserCredentials = {
    type: "password",
    value: string,
    temporary: boolean
}

export type SignUpRequestParams = {
    username: string,
    email: string,
    enable: boolean,
    credentials: UserCredentials[]
}


export type SignUpCredential = {
    username: string
    email: string
    password: string
}


export type SignUpResponse = {
    username: string,
    email: string
};