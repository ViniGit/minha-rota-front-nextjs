import Head from 'next/head'
import Admin from "."
import { useState } from 'react';
import { VehicleProvider } from '../../contexts/Table/vehicle';
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdAdd } from 'react-icons/io'
import { ToastContainer } from 'react-toastify';
import VehicleModal from '../../components/modals/vehicle/VehicleModal';
import VehicleTable from '../../components/table/VehicleTable';


export default function Vehicle() {

    const [open, setOpen] = useState(false)

    return (
        <VehicleProvider>
            <Head>
                <title>Veículos | Minha Rota</title>
            </Head>
            <div className="p-8 w-full">
                <div className='p-8 w-full content-center'>
                    <div className=" relative m-2 flex w-11/12 justify-end mx-auto mb-5">
                        <Dialog.Root open={open} onOpenChange={setOpen}>
                            <Dialog.Trigger className="px-3 py-4 text-white text-base font-semibold bg-gray-900 rounded-md hover:bg-gray-600 hover:outline-none">
                                <div className='flex items-center  gap-2'>
                                    <IoMdAdd
                                        className=" h-5 w-5 text-white"
                                        aria-hidden="true"
                                    />
                                    <p className='font-semibold' >Cadastrar Veículo</p>
                                </div>
                            </Dialog.Trigger>
                            <VehicleModal setOpen={setOpen} />
                        </Dialog.Root>
                    </div>
                    <div className="relative flex w-11/12 flex-col min-w-0 break-words mb-6 shadow-lg rounded-xl border-0 bg-dark bg-white mx-auto mt-2">
                        <div className="rounded-t bg-white mb-0 px-6 py-6 mt-3">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-2xl font-semibold text-dark ml-2">Veículos</h6>

                            </div>
                        </div>
                        {/* table vehicle pagination */}
                        <VehicleTable />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </VehicleProvider>
    )
}

Vehicle.layout = Admin