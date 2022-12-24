
import Head from 'next/head'
import Admin from "../"
import MaskedInput from 'react-maskedinput'
import { useEffect, useState, useContext } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
import { ToastifySuccess } from '../../../toastify/toastify-succes'
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../../utils/formatData'
import { api } from '../../../services/apiClient'
import { ToastifyError } from '../../../toastify/toastify-error'

import * as Dialog from '@radix-ui/react-dialog'
import { IoMdAdd } from 'react-icons/io'
import { RouteProvider } from '../../../contexts/Table/route'
import ExpenseModal from '../../../components/modals/expense/ExpenseModal'
import ExpenseTable from '../../../components/table/ExpenseTable'
import { ToastContainer } from 'react-toastify'
import ReportExpenseTable from '../../../components/table/ReportExpenseTable'
import { ReportExpenseContext } from '../../../contexts/Table/expense/report'

registerLocale('ptBR', ptBR)


interface IRequest {
    type: string,
    startDate: Date,
    finaltDate: Date
}

export default function ReportExpense() {

    const [startDate, setStartDate] = useState(getFirstDayOfMonth())
    const [finaltDate, setFinalDate] = useState(getLastDayOfMonth())
    const [typeExpense, setTypeExpense] = useState('')
    const [open, setOpen] = useState(false)

    let { handleRequest } = useContext(ReportExpenseContext)


    // function handleRequest(data: IRequest) {
    //     try {
    //         api.get(`/expense/report/${data.startDate}/${data.finaltDate}/${data.type}`).then(response => {
    //             if (response.status === 201) {
    //                 console.log(response.data)
    //             }
    //         }).catch((err) => {
    //             console.log(err)
    //             if (err.response && err.response.data && err.response.data.message && err.response.data.statusCode == 400)
    //                 return ToastifyError(err.response.data.message)
    //             else
    //                 return ToastifyError('Erro interno do servidor')
    //         })
    //     } catch (error) {
    //         ToastifyError('Erro interno do servidor')
    //         console.warn(error)
    //     }
    // }

    // useEffect(() => {

    //     let data = {
    //         type: '',
    //         startDate: getFirstDayOfMonth(),
    //         finaltDate: getLastDayOfMonth()
    //     }

    //     handleRequest(data)

    // }, [])

    function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault()

        let data = {
            type: typeExpense,
            startDate: startDate,
            finaltDate: finaltDate
        }

        handleRequest(data)

    }

    return (
        <>
            <Head>
                <title>Despesas | Minha Rota</title>
            </Head>
            <div className='p-2 xl:flex w-full content-center '>
                <div className="relative flex w-11/12 flex-col min-w-0 break-words mb-6 shadow-lg rounded-xl border-0 bg-dark bg-white mx-auto mt-10">
                    <div className="rounded-t bg-white px-6 py-2 mt-2">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-2xl font-light text-dark ml-2">Relatório de despesas</h6>
                        </div>
                    </div>
                    <div className="flex-auto px-2 lg:px-10 py-2 pt-0">
                        {/* @ts-ignore */}
                        <form onSubmit={(e: React.FormEvent<HTMLInputElement>) => handleSubmit(e)}>
                            <h6 className="text-blueGray-400 text-lg mt-2 mb-6 ml-4 font-light text-dark">
                                Filtros
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">

                                    <div className="relative w-full mb-1">
                                        <label
                                            className="block text-base font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Tipo
                                        </label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={typeExpense}
                                            onChange={(e) => setTypeExpense(e.target.value)}
                                            // onBlur={formik.handleBlur}
                                            className="w-full px-4 py-5 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                        >
                                            <option value="" label="Sem filtro">
                                            </option>

                                            <option value="mechanics" label="Mecânica">
                                            </option>

                                            <option value="driver" label="Motorista">
                                            </option>

                                            <option value="fuel" label="Combustível">
                                            </option>

                                            <option value="other" label="Outro">
                                            </option>

                                        </select>

                                    </div>
                                </div>


                                <div className="w-full lg:w-6/12 px-4 flex gap-12">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block text-base font-thin mb-2 text-gray-400 "
                                            htmlFor="grid-password"
                                        >
                                            Data inicial
                                        </label>

                                        <DatePicker
                                            className='w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600 '
                                            locale={ptBR}
                                            selected={startDate}
                                            onChange={(date: Date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={
                                                <MaskedInput mask="11/11/1111" placeholder="dd/mm/yyyy" />
                                            }
                                        />

                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block text-base font-thin mb-2 text-gray-400 "
                                            htmlFor="grid-password"
                                        >
                                            Data final
                                        </label>

                                        <DatePicker
                                            className='w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600 '
                                            locale={ptBR}
                                            selected={finaltDate}
                                            onChange={(date: Date) => setFinalDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={
                                                <MaskedInput mask="11/11/1111" placeholder="dd/mm/yyyy" />
                                            }
                                        />

                                    </div>
                                </div>
                            </div>

                            <div className="m-2 flex justify-end">
                                <button type="submit" className="px-4 py-3 text-white text-base font-semibold bg-green-500 rounded-md hover:bg-green-600 focus:bg-green-600 focus:outline-none">Pesquisar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="p-2 pt-4 w-full">
                <div className=' w-full content-center'>
                    {/* <div className=" relative m-2 flex w-11/12 justify-end mx-auto mb-5">
                        <Dialog.Root open={open} onOpenChange={setOpen}>
                            <Dialog.Trigger className="px-3 py-4 text-white text-base font-semibold bg-gray-900 rounded-md hover:bg-gray-600 hover:outline-none">
                                <div className='flex items-center  gap-2'>
                                    <IoMdAdd
                                        className=" h-5 w-5 text-white"
                                        aria-hidden="true"
                                    />
                                    <p className='font-semibold' >Cadastrar Despesa</p>
                                </div>
                            </Dialog.Trigger>
                            <RouteProvider>
                                <ExpenseModal setOpen={setOpen} />
                            </RouteProvider>
                        </Dialog.Root>
                    </div> */}
                    <div className="relative flex w-11/12 flex-col min-w-0 break-words mb-6 shadow-lg rounded-xl border-0 bg-dark bg-white mx-auto mt-2">
                        <div className="rounded-t bg-white mb-0 px-6 py-6 mt-3">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-2xl font-semibold text-dark ml-2">Despesas</h6>

                            </div>
                        </div>
                        {/* table vehicle pagination */}
                        <ReportExpenseTable />
                    </div>
                    <ToastContainer />
                </div>
            </div>


        </>
    )
}

ReportExpense.layout = Admin