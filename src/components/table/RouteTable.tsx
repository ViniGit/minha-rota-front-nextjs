import { useContext, useState } from "react"

import { RouteContext } from "../../contexts/Table/route"
import Pagination from "./route/pagination"

import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import { event, param } from "jquery"
import { Route } from "react-router-dom"
import UserModel from "../../models/RouteModel"
import { api } from "../../services/apiClient"


function RouteTable() {
    const [page, setPage] = useState(1)
    let { routes, count, pageR, handleDelete, setRouteEdit } = useContext(RouteContext)

    return (
        <>
            {routes && routes.length > 0 ?
                <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4 p-10">
                    <table className='bg-white w-full rounded-2xl'>
                        <thead >
                            <tr className="">
                                <th className="p-4 dark:bg-gray-900 rounded-tl-xl text-white text-lg font-bold">Destino</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Distância</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Preço</th>
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
                                            <td title="Preço" className='text-gray-400 px-6 py-4 font-bold'>{route.price}</td>
                                        </> :
                                            <>
                                                <td title="Destino" className='text-gray-900 px-8 py-4 font-bold'>{route.destination}</td>
                                                <td title="Distância" className='text-gray-900 px-6 py-4 font-bold'>{route.distance}</td>
                                                <td title="Preço" className='text-gray-900 px-6 py-4 font-bold'>{route.price}</td>
                                            </>}
                                        {/* <td className='text-[#C4C4CC] px-8 py-4'>{new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createAt)
                                )}</td> */}
                                        <td className='text-gray-400 px-2 py-4'>
                                            <div className="flex gap-4 justify-center">
                                                <button title="Editar" onClick={() => setRouteEdit(route)} ><FiEdit className="text-xl hover:text-blue-400" /></button>
                                                <button title="Deletar" onClick={() => handleDelete(route)}><BsTrash className="text-xl hover:text-red-400" /></button>
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