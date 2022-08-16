import React, { createContext, ReactNode, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Router from "next/router";


import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { HeadersDefaults } from 'axios'
import { api } from '../services/apiClient';

type User = {
    email: string,
    name: string,
    isAdmin: boolean
}

type SignInCredentials = {
    email: string,
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    user: User | undefined
    isAuthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode
}

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

export const Authcontext = createContext({} as AuthContextData)

export function signOut() {

    destroyCookie(undefined, 'minha-rota-token')
    destroyCookie(undefined, 'minha-rota-refresh-token')

    Router.push('/login')
}

export function AuthProvider({ children }: AuthProviderProps) {


    const [user, setUser] = useState<User>()
    const isAuthenticated = false

    useEffect(() => {
        const { 'minha-rota-token': token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                const { email, isAdmin, name } = response.data
                setUser({ email, isAdmin, name })

            }).catch(() => {
                signOut()
            })
        }

    }, [])

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', {
                email,
                password
            })

            if (response.data) {
                const { token, refresh_token, isAdmin } = response.data
                const { name } = response.data.user

                setCookie(undefined, 'minha-rota-token', token, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                })
                setCookie(undefined, 'minha-rota-refresh-token', refresh_token, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                })

                setUser({
                    email,
                    isAdmin,
                    name
                })


                api.defaults.headers = { Authorization: `Bearer ${token}` } as CommonHeaderProperties

                Router.push('/dashboard')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Authcontext.Provider value={{ signIn, user, isAuthenticated }}>
            {children}
        </Authcontext.Provider>
    )
}
