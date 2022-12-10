import { useContext, useState } from "react"

import { RouteContext } from "../../contexts/Table/route"
import * as Dialog from '@radix-ui/react-dialog'

import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import RouteModal from "../modals/route/RouteModal"
import RouteModel from "../../models/RouteModel"
import Pagination from "./route/pagination"
import { TravelContext } from "../../contexts/Table/travel"
import TravelModal from "../modals/travel/TravelModal"
import TravelModel from "../../models/TravelModel"

function textTransform(type: string) {
    switch (type) {
        case 'microbus':
            return 'Micro ônibus'
        case 'bus':
            return 'Ônibus'
        case 'van':
            return 'Van'
        case 'minivan':
            return 'Mini van'

        default:
            break;
    }

}


function TravelTable() {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [travelModel, setTravelModel] = useState<TravelModel>()
    let { travels, count, pageR, handleDelete } = useContext(TravelContext)

    function handleOpenModal(route: TravelModel) {
        setTravelModel(route)
        setOpen(false)
    }

    return (
        <>
            {travels && travels.length > 0 ?
                <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4 p-10">
                    <table className='bg-white w-full rounded-2xl'>
                        <thead >
                            <tr className="">
                                <th className="p-4 dark:bg-gray-900 rounded-tl-xl text-white text-lg font-bold">Destino</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Trajeto</th>
                                <th className="p-4 dark:bg-gray-900 text-white text-lg font-bold">Veículo</th>
                                <th className="p-4 dark:bg-gray-900 rounded-tr-xl text-white text-lg font-bold">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {travels && travels.map((travel, index) => {
                                return (
                                    <tr key={travel.id} className={index % 2 == 0 ? "border-t-2 border-b-2" : "border-t-2 border-b-2 bg-gray-200"}>

                                        {index % 2 == 0 ? <>
                                            {/* <td title={travel.description} className='text-gray-400 px-8 py-4 font-bold'>{travel.description}</td> */}
                                            <td className='text-gray-400 px-8 py-4 font-bold'>{travel.route.destination}</td>
                                            <td className='text-gray-400 px-8 py-4 font-bold'>{textTransform(travel.vehicle.type)}</td>

                                        </> :
                                            <>
                                                <td title={travel.description} className='text-gray-900 px-8 py-4 font-bold'>{travel.description}</td>

                                            </>}
                                        {/* <td className='text-[#C4C4CC] px-8 py-4'>{new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createAt)
                                )}</td> */}
                                        <td key={travel.id} className='text-gray-400 px-2 py-4'>
                                            <div className="flex gap-4 justify-center">
                                                <Dialog.Root open={open} onOpenChange={setOpen}>
                                                    <Dialog.Trigger title="Editar" >
                                                        <div className='flex items-center  gap-2'>
                                                            <FiEdit className=" text-xl text-blue-400 hover:text-blue-600" onClick={() => handleOpenModal(travel)} />
                                                        </div>
                                                    </Dialog.Trigger>
                                                    {/* <TravelModal travel={travelModel} open={open} setOpen={setOpen} /> */}
                                                </Dialog.Root>
                                                {/* <button title="Deletar" onClick={() => handleDelete(travel)}><BsTrash className="text-xl text-red-400 hover:text-red-600" /></button> */}
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

export default TravelTable