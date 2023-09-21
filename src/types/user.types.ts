export type LoginCredentials = {
    email: string
    password: string
}

export type SignUpCredentials = {
    // name:
    email: string
    password: string
    passwordConfirm: string
    isAdmin: boolean
}