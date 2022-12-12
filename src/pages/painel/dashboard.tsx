
import type { NextPage } from 'next'
import Head from 'next/head'

import Admin from "."
import CardExpenses from '../../components/cards/CardExpenses'
import CardRoutes from '../../components/cards/CardRoutes'
import CardTravels from '../../components/cards/CardTravels'
import CardVehicles from '../../components/cards/CardVehicles'
import { ExpenseProvider } from '../../contexts/Table/expense'
import { RouteProvider } from '../../contexts/Table/route'
import { TravelProvider } from '../../contexts/Table/travel'
import { VehicleProvider } from '../../contexts/Table/vehicle'

export default function AdminDashboard() {

    return (
        <>
            <Head>
                <title>Dashboard | Minha Rota</title>
            </Head>
            <div className='p-8  xl:flex w-full '>
                <ExpenseProvider>
                    <div className="flex-auto">
                        <div className="w-full mb-12 px-5">
                            < CardExpenses />
                        </div>
                    </div>
                </ExpenseProvider>

                <RouteProvider>
                    <div className="flex-auto ">
                        <div className="w-full mb-12 px-5">
                            < CardRoutes />
                        </div>
                    </div>
                </RouteProvider>

                <VehicleProvider>
                    <div className="flex-auto">
                        <div className="w-full mb-12 px-5">
                            < CardVehicles />
                        </div>
                    </div>
                </VehicleProvider>
                <TravelProvider>
                    <div className="flex-auto">
                        <div className="w-full mb-12 px-5">
                            < CardTravels />
                        </div>
                    </div>
                </TravelProvider>
            </div>
        </>
    )
}

AdminDashboard.layout = Admin

