
import Head from 'next/head'

import Admin from "."
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MdAddCircleOutline } from 'react-icons/md'
import { ToastContainer } from 'react-toastify'
import { ExpenseProvider } from '../../contexts/Table/expense'
import ExpenseTable from '../../components/table/ExpenseTable'
import ExpenseModal from '../../components/modals/expense/ExpenseModal'
import { RouteProvider } from '../../contexts/Table/route'


export default function Expense() {

    const [open, setOpen] = useState(false)

    return (
        <ExpenseProvider>
            <Head>
                <title>Despesas | Minha Rota</title>
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
                                    <p className='font-semibold' >Cadastrar Despesa</p>
                                </div>
                            </Dialog.Trigger>
                            <RouteProvider>
                                <ExpenseModal open={open} setOpen={setOpen} />
                            </RouteProvider>
                        </Dialog.Root>
                    </div>
                    <div className="relative flex w-11/12 flex-col min-w-0 break-words mb-6 shadow-lg rounded-xl border-0 bg-dark bg-white mx-auto mt-2">
                        <div className="rounded-t bg-white mb-0 px-6 py-6 mt-3">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-2xl font-semibold text-dark ml-2">Despesas</h6>

                            </div>
                        </div>
                        {/* table vehicle pagination */}
                        <ExpenseTable />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </ExpenseProvider>
    )
}

Expense.layout = Admin