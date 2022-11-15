import { useContext, useState } from "react"

import { RouteContext } from "../../contexts/Table/route"
import * as Dialog from '@radix-ui/react-dialog'

import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import { event, param } from "jquery"
import { Route } from "react-router-dom"
import UserModel from "../../models/RouteModel"
import { api } from "../../services/apiClient"
import RouteModal from "../modals/route/RouteModal"
import RouteModel from "../../models/RouteModel"
import Pagination from "./route/pagination"


function RouteTable() {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [routeModel, setRouteModel] = useState<RouteModel>()
    let { routes, count, pageR, handleDelete } = useContext(RouteContext)

    function handleOpenModal(route: RouteModel) {
        setRouteModel(route)
        setOpen(false)
    }

    return (
        <>
            {routes && routes.length > 0 ?
                <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4 p-10">
                    <table className='bg-white w-full rounded-2xl'>
                        <thead >
                            <tr className="">
                                <th className="p-4 dark:bg-gray-900 rounded-tl-xl text-white text-lg font-bold">Destino</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Distância (km)</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Preço por Km (R$)</th>
                                <th className="p-4 dark:bg-gray-900 rounded-tr-xl text-white text-lg font-bold">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {routes && routes.map((route, index) => {
                                return (
                                    <tr key={route.id} className={index % 2 == 0 ? "border-t-2 border-b-2" : "border-t-2 border-b-2 bg-gray-200"}>

                                        {index % 2 == 0 ? <>
                                            <td title="Destino" className='text-gray-400 px-8 py-4 font-bold'>{route.destination}</td>
                                            <td title="Distância" className='text-gray-400 px-6 py-4 font-bold'>{route.distance}</td>
                                            <td title="Preço" className='text-gray-400 px-6 py-4 font-bold'>{new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(route.price)}</td>
                                        </> :
                                            <>
                                                <td title="Destino" className='text-gray-900 px-8 py-4 font-bold'>{route.destination}</td>
                                                <td title="Distância" className='text-gray-900 px-6 py-4 font-bold'>{route.distance}</td>
                                                <td title="Preço" className='text-gray-400 px-6 py-4 font-bold'>{new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(route.price)}</td>
                                            </>}
                                        {/* <td className='text-[#C4C4CC] px-8 py-4'>{new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createAt)
                                )}</td> */}
                                        <td key={route.id} className='text-gray-400 px-2 py-4'>
                                            <div className="flex gap-4 justify-center">
                                                <Dialog.Root open={open} onOpenChange={setOpen}>
                                                    <Dialog.Trigger title="Editar" >
                                                        <div className='flex items-center  gap-2'>
                                                            <FiEdit className=" text-xl text-blue-400 hover:text-blue-600" onClick={() => handleOpenModal(route)} />
                                                        </div>
                                                    </Dialog.Trigger>
                                                    <RouteModal route={routeModel} open={open} setOpen={setOpen} />
                                                </Dialog.Root>
                                                <button title="Deletar" onClick={() => handleDelete(route)}><BsTrash className="text-xl text-red-400 hover:text-red-600" /></button>
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

export default RouteTable