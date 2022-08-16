
export interface IUser {
    email: string,
    password: string
}

export type UserContextType = {
    authenticated: Boolean,
    user: IUser,
    login: (user: IUser) => void
    logout: () => void
}