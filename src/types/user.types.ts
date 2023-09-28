export type LoginCredentials = {
    email: string
    password: string
}

export type SignUpCredentials = {
    displayName: string
    email: string
    password: string
    passwordConfirm: string
    isAdmin: boolean
}