import axios, { Axios, AxiosError, HeadersDefaults } from 'axios'
import Router from 'next/router'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useContext } from 'react'
import { Authcontext } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'
// import { signOut } from '../contexts/AuthContext'

let isRefreshing = false
let failedRequestsQueue: { onSuccess: (token: string) => void; onFailure: (err: AxiosError<unknown, any>) => void }[] = []
interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

export function setupApiClient(ctx = undefined) {
    // const { signOut } = useContext(Authcontext)


    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['minha-rota-token']}`
        }
    })

    async function signOut() {

        destroyCookie(null, 'minha-rota-token', {
            path: "/"
        })
        destroyCookie(null, 'minha-rota-refresh-token', {
            path: "/"
        })

        Router.push('/')
    }

    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            const message = error.response.data
            //@ts-ignore
            if (message?.message === 'Invalid token!') {

                cookies = parseCookies(ctx)

                const { 'minha-rota-refresh-token': refreshToken } = cookies

                const originalConfig = error.config

                if (!isRefreshing) {

                    isRefreshing = true

                    api.post('/refresh-token', {
                        token: refreshToken
                    }).then(response => {
                        debugger

                        const { token } = response.data

                        setCookie(ctx, 'minha-rota-token', token, {
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        })
                        setCookie(ctx, 'minha-rota-refresh-token', response.data.refresh_token, {
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        })

                        api.defaults.headers = { Authorization: `Bearer ${token}` } as CommonHeaderProperties

                        failedRequestsQueue.forEach(request => request.onSuccess(token))
                        failedRequestsQueue = []

                    }).catch((err) => {
                        failedRequestsQueue.forEach(request => request.onFailure(err))
                        failedRequestsQueue = []

                        if (!(typeof window === "undefined")) {
                            signOut()
                        }

                    }).finally(() => {
                        isRefreshing = false
                    })
                }

                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        onSuccess: (token: string) => {
                            originalConfig.headers = { Authorization: `Bearer ${token}` }

                            resolve(api(originalConfig))
                        },
                        onFailure: (err: AxiosError) => {
                            reject(err)
                        }
                    })
                })

            } else {
                if (!(typeof window === "undefined")) {
                    signOut()
                } else {
                    return Promise.reject(new AuthTokenError())
                }
            }
        }

        return Promise.reject(error)
    })

    return api
}