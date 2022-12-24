import { useContext, useState } from "react"

import { RouteContext, RouteProvider } from "../../contexts/Table/route"
import * as Dialog from '@radix-ui/react-dialog'

import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import Pagination from "./pagination"
import { TravelContext } from "../../contexts/Table/travel"
import TravelModal from "../modals/travel/TravelModal"
import TravelModel from "../../models/TravelModel"
import { format } from "../../utils/formatData"
import { VehicleProvider } from "../../contexts/Table/vehicle"

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

    function handleOpenModal(travel: TravelModel) {
        // @ts-ignore
        travel.date = new Date(travel?.date)
        setTravelModel(travel)
        setOpen(false)
    }

    return (
        <>
            {travels && travels.length > 0 ?
                <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4 p-10">
                    <table className='bg-white w-full rounded-2xl'>
                        <thead >
                            <tr className="">
                                <th className="p-4 bg-gray-900 rounded-tl-xl text-white text-lg font-bold">Qtd. de Viagens</th>
                                <th className="p-4 bg-gray-900 text-white text-lg font-bold">Veículo</th>
                                <th className="p-4 bg-gray-900 text-white text-lg font-bold">Trajeto</th>
                                <th className="p-4 bg-gray-900 text-white text-lg font-bold">Data</th>
                                <th className="p-4 bg-gray-900 rounded-tr-xl text-white text-lg font-bold">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {travels && travels.map((travel, index) => {
                                return (
                                    <tr key={travel.id} className={index % 2 == 0 ? "border-t-2 border-b-2" : "border-t-2 border-b-2 bg-gray-200"}>

                                        {index % 2 == 0 ? <>
                                            {/* <td title={travel.description} className='text-gray-400 px-8 py-4 font-bold'>{travel.description}</td> */}
                                            <td className='text-gray-400 px-8 py-4 font-bold'>{String(travel.travels)}</td>
                                            <td className='text-gray-400 px-8 py-4 font-bold'>{textTransform(travel.vehicle.type)}</td>
                                            <td className='text-gray-400 px-8 py-4 font-bold'>{travel.route.destination}</td>
                                            <td className='text-gray-400 px-8 py-4 font-bold'>{format(travel.date)}</td>

                                        </> :
                                            <>
                                                <td className='text-gray-400 px-8 py-4 font-bold'>{String(travel.travels)}</td>
                                                <td className='text-gray-400 px-8 py-4 font-bold'>{textTransform(travel.vehicle.type)}</td>
                                                <td className='text-gray-400 px-8 py-4 font-bold'>{travel.route.destination}</td>
                                                <td className='text-gray-400 px-8 py-4 font-bold'>{format(travel.date)}</td>
                                                {/* <td title={travel.description} className='text-gray-900 px-8 py-4 font-bold'>{travel.description}</td> */}

                                            </>}
                                        {/* <td className='text-[#C4C4CC] px-8 py-4'>{new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createAt)
                                )}</td> */}
                                        <td key={travel.id} className='text-gray-400 px-2 py-4'>
                                            <div className="flex gap-4 justify-center">
                                                <Dialog.Root open={open && travel.id == travelModel?.id} onOpenChange={setOpen}>
                                                    <Dialog.Trigger title="Editar" >
                                                        <div className='flex items-center  gap-2'>
                                                            <FiEdit className=" text-xl text-blue-400 hover:text-blue-600" onClick={() => handleOpenModal(travel)} />
                                                        </div>
                                                    </Dialog.Trigger>
                                                    <RouteProvider>
                                                        <VehicleProvider>
                                                            <TravelModal travel={travelModel} setOpen={setOpen} />
                                                        </VehicleProvider>
                                                    </RouteProvider>
                                                </Dialog.Root>
                                                <button title="Deletar" onClick={() => handleDelete(travel)}><BsTrash className="text-xl text-red-400 hover:text-red-600" /></button>
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
                        modelContext={TravelContext}
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