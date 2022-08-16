import styles from '../styles/sign-up.module.scss'

import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { FormEvent, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { api } from '../services/apiClient'

import { ToastifyWarn } from '../toastify/toastify-warn'
import { ToastifySuccess } from '../toastify/toastify-succes'
import { ToastifyError } from '../toastify/toastify-error'
import { ToastContainer } from 'react-toastify'



const SignUp: NextPage = () => {

    const [email, setEmail] = useState('')
    const [cell, setCell] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [birthDate, setBirthDate] = useState('')

    function formatData(data: string) {
        var [year, month, day] = data.split("-")

        return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        let birth_date = formatData(birthDate)

        const data = {
            name,
            email,
            password,
            cpf,
            cell,
            birth_date
        }

        try {
            api.post('/users', data).then(response => {

                if (response.status === 201) {

                    ToastifySuccess('Cadastro realizado!')

                    setTimeout(() => {
                        Router.push('/login')
                    }, 4000)
                }
            }).catch((err) => {
                if (err.response.data.message == 'User already exists') {
                    return ToastifyWarn('Usuario já cadastrado!')
                }

                return ToastifyError('Erro interno do servidor')
            })
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <>
            <Head>
                <title>Cadastro | Minha Rota</title>
            </Head>
            <div className={styles['register-container']}>
                <div className={styles.content}>
                    <section>
                        <h1> Cadastro </h1>
                        <p> Faça seu cadastro, entre na plataforma e comece a administrar suas rotas!</p>
                        <a className="back-link" href="/login">
                            <FiArrowLeft size={16} color="#e02041" />
                            Já possui cadastro?
                        </a>
                    </section>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input placeholder="Celular" value={cell} onChange={e => setCell(e.target.value)} />
                        <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
                        <input type="date" placeholder="Date de Nascimento" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
                        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                        {/* <div className="input-group">
                            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
                            <input placeholder="UF" value={cpf} onChange={e => setCpf(e.target.value)} style={{ width: 80 }} />
                        </div> */}
                        <button className="button" type="submit"> Cadastrar </button>
                    </form>
                    <ToastContainer />

                </div>
            </div>
        </>
    )
}

export default SignUp
