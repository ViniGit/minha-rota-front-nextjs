
import type { NextPage } from 'next'
import Head from 'next/head'
import * as Dialog from '@radix-ui/react-dialog'


import Admin from "."
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md'
import RouteModal from '../../components/modals/route/RouteModal'
import RouteTable from '../../components/table/RouteTable'
import { ToastContainer } from 'react-toastify'
import { TravelProvider } from '../../contexts/Table/travel'
import TravelModal from '../../components/modals/travel/TravelModal'
import { RouteProvider } from '../../contexts/Table/route'
import { VehicleProvider } from '../../contexts/Table/vehicle'
import TravelTable from '../../components/table/TravelTable'


export default function Travel() {

    const [color, setColor] = useState('blue');

    const [open, setOpen] = useState(false)

    return (
        <TravelProvider>
            <Head>
                <title>Viagens | Minha Rota</title>
            </Head>
            <div className="p-8 w-full">
                <div className='p-8 w-full content-center'>
                    <div className=" relative m-2 flex w-11/12 justify-end mx-auto mb-5">
                        <Dialog.Root open={open} onOpenChange={setOpen}>
                            <Dialog.Trigger className="px-3 py-4 text-white text-base font-semibold bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">
                                <div className='flex items-center  gap-2'>
                                    <MdAddCircleOutline
                                        className=" h-5 w-5 text-white"
                                        aria-hidden="true"
                                    />
                                    <p className='font-semibold'>Registrar Viagem</p>
                                </div>
                            </Dialog.Trigger>
                            <RouteProvider>
                                <VehicleProvider>
                                    <TravelModal open={open} setOpen={setOpen} />
                                </VehicleProvider>
                            </RouteProvider>
                        </Dialog.Root>
                    </div>
                    <div className="relative flex w-11/12 flex-col min-w-0 break-words mb-6 shadow-lg rounded-xl border-0 bg-dark bg-white mx-auto mt-2">
                        <div className="rounded-t bg-white mb-0 px-6 py-6 mt-3">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-2xl font-semibold text-dark ml-2">Viagens</h6>

                            </div>
                        </div>
                        {/* table route pagination */}
                        <TravelTable />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </TravelProvider>
    )
}

Travel.layout = Admin
