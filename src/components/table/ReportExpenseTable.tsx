import { useContext, useState } from "react"

import * as Dialog from '@radix-ui/react-dialog'

import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import Pagination from "./pagination"
import { ExpenseContext } from "../../contexts/Table/expense"
import ExpenseModel from "../../models/ExpenseModel"
import ExpenseModal from "../modals/expense/ExpenseModal"
import { RouteProvider } from "../../contexts/Table/route"
import { ReportExpenseContext } from "../../contexts/Table/expense/report"
import { format } from "../../utils/formatData"
import { typeExpenseTransform } from "../../utils/Expense"

function ReportExpenseTable() {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [expenseModel, setExpenseModel] = useState<ExpenseModel>()
    let { expenseReport, totalValue, count, pageR, handleRequest } = useContext(ReportExpenseContext)

    // const [totalCountRegisters, setTotalCountRegisters] = useState(0)

    // const totalValueExpense = expenseReport.reduce((acc, expense) => {
    //     return acc + expense.value
    // }, 0)


    // function handleOpenModal(expense: ExpenseModel) {
    //     setExpenseModel(expense)
    // }


    return (
        <>
            {expenseReport && expenseReport.length > 0 ?
                <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4 p-2">
                    <table className='bg-white w-full rounded-2xl mb-5'>
                        <thead >
                            <tr className="">
                                <th className="p-2 bg-gray-900 rounded-tl-xl text-white text-lg font-bold">Descrição</th>
                                <th className="p-2 bg-gray-900 text-white text-lg font-bold">Tipo</th>
                                <th className="p-2 bg-gray-900 text-white text-lg font-bold">Data</th>
                                <th className="p-2 bg-gray-900 rounded-tr-xl text-white text-lg font-bold">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {expenseReport && expenseReport.map((expense, index) => {
                                return (
                                    <tr key={expense.id} className={index % 2 == 0 ? "border-t-2 border-b-2" : "border-t-2 border-b-2 bg-gray-200"}>

                                        {index % 2 == 0 ? <>
                                            <td title="Descrição" className='text-gray-400 px-4 py-2 font-bold'>{expense.description}</td>
                                            <td title="Tipo" className='text-gray-400 px-3 py-2 font-bold'>{typeExpenseTransform(expense.type)}</td>
                                            <td title="Data" className='text-gray-400 px-3 py-2 font-bold'>{format(expense.created_at)}</td>
                                            <td title="Valor" className='text-gray-400 px-3 py-2 font-bold'>{new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(expense.value)}</td>
                                        </> :
                                            <>
                                                <td title="Descrição" className='text-gray-400 px-4 py-2 font-bold'>{expense.description}</td>
                                                <td title="Tipo" className='text-gray-400 px-3 py-2 font-bold'>{typeExpenseTransform(expense.type)}</td>
                                                <td title="Data" className='text-gray-400 px-3 py-2 font-bold'>{format(expense.created_at)}</td>
                                                <td title="Valor" className='text-gray-400 px-3 py-2 font-bold'>{new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(expense.value)}</td>
                                            </>}

                                        {/* <td>{{ expense.value }}</td> */}



                                        {/* <td key={expense.id} className='text-gray-400 px-2 py-4'>
                                            <div className="flex gap-4 justify-center">
                                                <Dialog.Root open={open && expense.id == expenseModel?.id} onOpenChange={setOpen}>
                                                    <Dialog.Trigger title="Editar" >
                                                        <div className='flex items-center  gap-2'>
                                                            <FiEdit className=" text-xl text-blue-400 hover:text-blue-600" onClick={() => handleOpenModal(expense)} />
                                                        </div>
                                                    </Dialog.Trigger>
                                                    <RouteProvider>
                                                        <ExpenseModal expense={expenseModel} setOpen={setOpen} />
                                                    </RouteProvider>
                                                </Dialog.Root>
                                                <button title="Deletar" onClick={() => handleDelete(expense)}><BsTrash className="text-xl text-red-400 hover:text-red-600" /></button>
                                            </div>

                                        </td> */}
                                    </tr>
                                )
                            })}

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="border-t-2 border-2 text-gray-600 px-4 py-2 font-bold">Total: {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(totalValue)}</td>
                            </tr>

                        </tbody>
                    </table>

                    {/* <Pagination
                        totalCountRegisters={count}
                        currentPage={pageR}
                        onPageChange={setPage}
                        // @ts-ignore
                        modelContext={ExpenseContext}
                    /> */}
                </div>

                :
                <div className="flex gap-2 ml-10 mb-10">
                    <GoAlert className="text-red-400" />
                    <p className=" font-medium">Sem registros.</p>
                </div>
            }

        </>
    )
}

export default ReportExpenseTable