import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { FiPower } from 'react-icons/fi'
import { Authcontext, signOut } from '../../contexts/AuthContext'

import { withSSRAuth } from '../../utils/withSSRAuth'


import style from '../styles/painel.module.scss'
import { setupApiClient } from '../../services/api'
import AdminDashboard from '../admin/dashboard'
import ProviderDashboard from '../service-provider/dashboard'
import SideBarMenu from '../../components/SideBarMenu'
import NavBar from '../../components/NavBar'

const Painel: NextPage = () => {

    const { user } = useContext(Authcontext)

    function handleLogout() {
        signOut()
    }

    return (
        <>
            <div className='dark:bg-gray-900 h-full w-full lg:left-0'>
                <Head>
                    <title>Minha Rota | Painel</title>
                </Head>
                <NavBar/>
                {/* <div className={style['profile-container']}>
                    <header>
                        <span> Bem-vindo(a), {user?.email} </span>

                        {user?.isAdmin && <a className={"button"} href='/sign-up'> Cadastrar novo usuário </a>}

                        {!user?.isAdmin && <a className={"button"} href='/'> Visualizar dados do usuário </a>}


                        <button onClick={handleLogout} type="button">
                            <FiPower size={18} color="e02041" />
                        </button>
                    </header>

                     {user?.isAdmin && <AdminDashboard />}


                    {!user?.isAdmin && <ProviderDashboard />}

                </div> */}
            </div>
            <SideBarMenu />

        </>
    )
}

export default Painel


export const getServerSideProps = withSSRAuth(async (ctx) => {
    // @ts-ignore
    const apiClient = setupApiClient(ctx)
    const response = await apiClient.get('/me')

    return {
        props: {}
    }
})