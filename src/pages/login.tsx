import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useContext, useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Authcontext } from '../contexts/AuthContext'

import { parseCookies } from 'nookies'

import { GetServerSideProps } from 'next'

import styles from '../styles/login.module.scss'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function Login() {

    const { signIn } = useContext(Authcontext)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const data = {
            email,
            password
        }

        signIn(data)

    }
    return (
        <>
            <Head>
                <title>Login | Minha Rota</title>
            </Head>
            <div className={styles['logon-container']}>
                <div className={styles.login}>
                    <section className={styles.form}>
                        <form onSubmit={handleSubmit}>
                            <h2> Seja bem vindo!</h2>
                            <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                            <button className="button" type="submit"> Entrar </button>
                            <a className="back-link" href="/sign-up">
                                <FiLogIn size={16} color="#e02041" />
                                Não tenho cadastro
                            </a>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})