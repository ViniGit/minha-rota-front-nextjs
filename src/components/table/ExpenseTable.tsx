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

function ExpenseTable() {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [expenseModel, setExpenseModel] = useState<ExpenseModel>()
    let { expenses, count, pageR, handleDelete } = useContext(ExpenseContext)

    function handleOpenModal(expense: ExpenseModel) {
        setExpenseModel(expense)
    }


    function textTransform(type: string) {
        switch (type) {
            case 'mechanics':
                return 'Mecânica'
            case 'driver':
                return 'Motorista'
            case 'fuel':
                return 'Combustível'
            case 'other':
                return 'Outro'

            default:
                break;
        }

    }

    return (
        <>
            {expenses && expenses.length > 0 ?
                <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4 p-10">
                    <table className='bg-white w-full rounded-2xl'>
                        <thead >
                            <tr className="">
                                <th className="p-4 dark:bg-gray-900 rounded-tl-xl text-white text-lg font-bold">Descrição</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Tipo</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Valor</th>
                                <th className="p-4 dark:bg-gray-900 rounded-tr-xl text-white text-lg font-bold">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {expenses && expenses.map((expense, index) => {
                                return (
                                    <tr key={expense.id} className={index % 2 == 0 ? "border-t-2 border-b-2" : "border-t-2 border-b-2 bg-gray-200"}>

                                        {index % 2 == 0 ? <>
                                            <td title="Descrição" className='text-gray-400 px-8 py-4 font-bold'>{expense.description}</td>
                                            <td title="Tipo" className='text-gray-400 px-6 py-4 font-bold'>{textTransform(expense.type)}</td>
                                            <td title="Valor" className='text-gray-400 px-6 py-4 font-bold'>{new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(expense.value)}</td>
                                        </> :
                                            <>
                                                <td title="Descrição" className='text-gray-400 px-8 py-4 font-bold'>{expense.description}</td>
                                                <td title="Tipo" className='text-gray-400 px-6 py-4 font-bold'>{textTransform(expense.type)}</td>
                                                <td title="Valor" className='text-gray-400 px-6 py-4 font-bold'>{new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(expense.value)}</td>
                                            </>}

                                        <td key={expense.id} className='text-gray-400 px-2 py-4'>
                                            <div className="flex gap-4 justify-center">
                                                <Dialog.Root open={open} onOpenChange={setOpen}>
                                                    <Dialog.Trigger title="Editar" >
                                                        <div className='flex items-center  gap-2'>
                                                            <FiEdit className=" text-xl text-blue-400 hover:text-blue-600" onClick={() => handleOpenModal(expense)} />
                                                        </div>
                                                    </Dialog.Trigger>
                                                    <RouteProvider>
                                                        <ExpenseModal expense={expenseModel} open={open} setOpen={setOpen} />
                                                    </RouteProvider>
                                                </Dialog.Root>
                                                <button title="Deletar" onClick={() => handleDelete(expense)}><BsTrash className="text-xl text-red-400 hover:text-red-600" /></button>
                                            </div>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <Pagination
                        totalCountRegisters={count}
                        currentPage={pageR}
                        onPageChange={setPage}
                        // @ts-ignore
                        modelContext={ExpenseContext}
                    />
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

export default ExpenseTable