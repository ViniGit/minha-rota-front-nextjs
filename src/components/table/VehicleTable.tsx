import { useContext, useState } from "react"

import * as Dialog from '@radix-ui/react-dialog'

import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import VehicleModal from "../modals/vehicle/VehicleModal"
import VehicleModel from "../../models/VehicleModel"
import { VehicleContext } from "../../contexts/Table/vehicle"
import Pagination from "./pagination"

function VehicleTable() {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [vehicleModel, setVehicleModel] = useState<VehicleModel>()
    let { vehicles, count, pageR, handleDelete } = useContext(VehicleContext)

    function handleOpenModal(vehicle: VehicleModel) {
        setVehicleModel(vehicle)
    }


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

    return (
        <>
            {vehicles && vehicles.length > 0 ?
                <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4 p-10">
                    <table className='bg-white w-full rounded-2xl'>
                        <thead >
                            <tr className="">
                                <th className="p-4 bg-gray-900 rounded-tl-xl text-white text-lg font-bold">Placa</th>
                                <th className="p-4 bg-gray-900 text-white text-lg font-bold">Tipo</th>
                                <th className="p-4 bg-gray-900 text-white text-lg font-bold">Quilômetros por litro</th>
                                <th className="p-4 bg-gray-900 rounded-tr-xl text-white text-lg font-bold">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {vehicles && vehicles.map((vehicle, index) => {
                                return (
                                    <tr key={vehicle.id} className={index % 2 == 0 ? "border-t-2 border-b-2" : "border-t-2 border-b-2 bg-gray-200"}>

                                        {index % 2 == 0 ? <>
                                            <td title="Placa" className='text-gray-400 px-8 py-4 font-bold'>{vehicle.plate}</td>
                                            <td title="Tipo" className='text-gray-400 px-6 py-4 font-bold'>{textTransform(vehicle.type)}</td>
                                            <td title="Quilômetros por litro" className='text-gray-400 px-6 py-4 font-bold'>{vehicle.km_per_lt}</td>

                                        </> :
                                            <>
                                                <td title="Placa" className='text-gray-400 px-8 py-4 font-bold'>{vehicle.plate}</td>
                                                <td title="Tipo" className='text-gray-400 px-6 py-4 font-bold'>{textTransform(vehicle.type)}</td>
                                                <td title="Quilômetros por litro" className='text-gray-400 px-6 py-4 font-bold'>{vehicle.km_per_lt}</td>
                                            </>}

                                        <td key={vehicle.id} className='text-gray-400 px-2 py-4'>
                                            <div className="flex gap-4 justify-center">
                                                <Dialog.Root open={open && vehicle.id == vehicleModel?.id} onOpenChange={setOpen}>
                                                    <Dialog.Trigger title="Editar" >
                                                        <div className='flex items-center  gap-2'>
                                                            <FiEdit className=" text-xl text-blue-400 hover:text-blue-600" onClick={() => handleOpenModal(vehicle)} />
                                                        </div>
                                                    </Dialog.Trigger>
                                                    <VehicleModal vehicle={vehicleModel} setOpen={setOpen} />
                                                </Dialog.Root>
                                                <button title="Deletar" onClick={() => handleDelete(vehicle)}><BsTrash className="text-xl text-red-400 hover:text-red-600" /></button>
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
                        modelContext={VehicleContext}
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

export default VehicleTable