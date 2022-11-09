import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { FiPower } from 'react-icons/fi'

import { withSSRAuth } from '../../utils/withSSRAuth'


import style from '../styles/painel.module.scss'
import { setupApiClient } from '../../services/api'
import AdminDashboard from './dashboard'
import SideBarMenu from '../../components/SideBarMenu'
import NavBar from '../../components/NavBar'

type Props = {
    title: string
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[]
}

export default function Painel({ children }: Props) {
    return (
        <>
            <NavBar />
            <div className="mt-16 sm:ml-0 lg:ml-60 flex content-center">
                {children || <AdminDashboard />}
            </div>
            <SideBarMenu />
        </>
    )
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//     // @ts-ignore
//     const apiClient = setupApiClient(ctx)
//     const response = await apiClient.get('/me')

//     return {
//         props: {}
//     }
// })
