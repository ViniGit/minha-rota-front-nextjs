import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { FiPower } from 'react-icons/fi'
import { Authcontext, signOut } from '../contexts/AuthContext'

import { withSSRAuth } from '../utils/withSSRAuth'


import style from '../styles/dashboard.module.scss'
import { setupApiClient } from '../services/api'

const Dashboard: NextPage = () => {

    const { user } = useContext(Authcontext)

    function handleLogout() {
        signOut()
    }

    return (
        <>
            <Head>
                <title>Minha Rota</title>
            </Head>
            <div className={style['profile-container']}>
                <header>
                    <span> Bem-vindo(a), {user?.email} </span>

                    <a className={"button"} href='/incidents/new'> Cadastrar novo usuário </a>
                    <button onClick={handleLogout} type="button">
                        <FiPower size={18} color="e02041" />
                    </button>
                </header>
                <h1> Dashboard </h1>
                {/* <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong> CASO: </strong>
                        <p> {incident.title} </p>

                        <strong> DESCRIÇÃO: </strong>
                        <p> {incident.description} </p>

                        <strong> VALOR: </strong>
                        <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} </p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul> */}
            </div>
        </>
    )
}

export default Dashboard


export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setupApiClient(ctx)
    const response = await apiClient.get('/me')

    return {
        props: {}
    }
})