
import type { NextPage } from 'next'
import Head from 'next/head'

import Admin from "."
import CardExpenses from '../../components/cards/CardExpenses'
import CardRide from '../../components/cards/CardRide'
import CardRoutes from '../../components/cards/CardRoutes'
import CardVehicles from '../../components/cards/CardVehicles'

export default function AdminDashboard() {

    return (
        < >
            <Head>
                <title>Dashboard | Minha Rota</title>
            </Head>
            <div className='p-8  xl:flex w-full '>
                <div className="flex-auto">
                    <div className="w-full mb-12 px-5">
                        < CardExpenses />
                    </div>
                </div>
                <div className="flex-auto ">
                    <div className="w-full mb-12 px-5">
                        < CardRoutes />
                    </div>
                </div>
                <div className="flex-auto">
                    <div className="w-full mb-12 px-5">
                        < CardVehicles />
                    </div>
                </div>
                <div className="flex-auto">
                    <div className="w-full mb-12 px-5">
                        < CardRide />
                    </div>
                </div>
            </div>
        </>
    )
}

AdminDashboard.layout = Admin

