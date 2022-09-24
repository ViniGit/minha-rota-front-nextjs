
import type { NextPage } from 'next'
import Head from 'next/head'

import Admin from "."
import CardDashboard from '../../components/CardDashboard'

export default function AdminDashboard() {

    return (
        < >
            <Head>
                <title>Dashboard | Minha Rota</title>
            </Head>
            <div className='p-5 flex'>
                <div className="flex-auto">
                    <div className="w-full mb-12 px-5">
                        < CardDashboard />
                    </div>
                </div>
                <div className="flex-auto">
                    <div className="w-full mb-12 px-5">
                        < CardDashboard />
                    </div>
                </div>
                <div className="flex-auto">
                    <div className="w-full mb-12 px-5">
                        < CardDashboard />
                    </div>
                </div>
            </div>
        </>
    )
}

AdminDashboard.layout = Admin

