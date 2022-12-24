
import Head from 'next/head'

import Admin from "."
import CardExpenses from '../../components/cards/CardExpenses'
import CardRoutes from '../../components/cards/CardRoutes'
import CardTravels from '../../components/cards/CardTravels'
import CardVehicles from '../../components/cards/CardVehicles'
import CardChart from '../../components/cards/Chart'
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

            <div className='w-full'>
                <div className='p-8  xl:flex '>
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

                <div className="p-8 flex-auto flex-wrap">
                    <div className="w-full mb-12 px-5">
                        < CardChart/>
                    </div>
                </div>
            </div>
        </>
    )
}

AdminDashboard.layout = Admin

