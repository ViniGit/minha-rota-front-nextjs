import React, { createContext, ReactNode, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Router from "next/router";


import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { HeadersDefaults } from 'axios'
import { api } from '../services/apiClient';
import { ToastifySuccess } from '../toastify/toastify-succes';
import { ToastifyWarn } from '../toastify/toastify-warn';
import { ToastifyError } from '../toastify/toastify-error';

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
    updateReferenceUser(user: User): Promise<void>
    signOut(): Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

export const Authcontext = createContext({} as AuthContextData)



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

    async function signOut() {

        destroyCookie(null, 'minha-rota-token', {
            path: "/"
        })
        destroyCookie(null, 'minha-rota-refresh-token', {
            path: "/"
        })

        Router.push('/')
    }
    async function updateReferenceUser(user: User) {
        setUser(user)
    }

    async function signIn({ email, password }: SignInCredentials) {

        try {
            await api.post('/sessions', {
                email,
                password
            }).then(response => {
                if (response.status === 200) {
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

                    }
                    setTimeout(() => {
                        Router.push('/painel')
                    }, 1000)
                }
            }).catch((err) => {
                if (err.response.data.message == 'Email or password incorrect' && err.response.data.statusCode == 400) {
                    return ToastifyWarn('Email ou senha inválidos!')
                }
                return ToastifyError('Erro interno do servidor')
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Authcontext.Provider value={{ signIn, user, isAuthenticated, updateReferenceUser, signOut }}>
            {children}
        </Authcontext.Provider>
    )
}
