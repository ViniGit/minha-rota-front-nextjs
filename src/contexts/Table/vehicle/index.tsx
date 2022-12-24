import { createContext, useEffect, useState, useCallback } from "react"
import { api } from "../../../services/apiClient"
import { ToastifySuccess } from "../../../toastify/toastify-succes"


interface VehicleProps {
    id: string
    plate: string
    type: string
    km_per_lt: number
}

interface VehicleContextData {
    search(type?: searchPros): Promise<void>
    handleDelete(page: VehicleProps): Promise<void>
    setVehicleEdit(VehicleContext: VehicleProps): Promise<void>
    page(page: number): Promise<void>
    vehicles: VehicleProps[]
    type: string,
    count: number,
    pageR: number,
}

interface VehicleProviderProps {
    children: React.ReactNode
}

interface searchPros {
    take?: number,
    pageR?: number
}

export const VehicleContext = createContext({} as VehicleContextData)

export function VehicleProvider({ children }: VehicleProviderProps) {
    const [vehicles, setVehicles] = useState<VehicleProps[]>([])
    const [type, setType] = useState<string>('')
    const [vehicle, setVehicle] = useState<VehicleProps>()
    const [count, setCount] = useState<number>(0)
    const [pageR, setPageR] = useState<number>(1)

    useEffect(() => {
        api.get("/vehicle",
            {
                params: {
                    take: 5,
                    skip: 0
                }
            }
        )
            .then(response => {
                setVehicles(response.data.vehicle)
                setCount(response.data.count)
            })


    }, [])


    async function handleDelete(vehicle: VehicleProps) {
        let value = false

        if (confirm("Confirmar Exclusão?") == true) {
            value = true
        } else {
            value = false
        }

        if (value) {
            await api.delete("/vehicle", { params: { id: vehicle.id } })
                .then(response => {
                    if (response.status == 200)
                        ToastifySuccess('Veículo excluído!')
                }).catch(err => {
                    console.log(err)
                })

            search({ pageR: 0, take: 5 })

        }
    }

    async function setVehicleEdit(vehicle: VehicleProps) {
        setVehicle(vehicle)

    }

    async function search({ take = 5, pageR = 0 }: searchPros) {
        const response = await api.get("/vehicle", {
            params: {
                take,
                skip: take * pageR
            }
        })
        setVehicles(response.data.vehicle)
        setCount(response.data.count)

    }

    async function page(page: number) {
        setPageR(page)
    }

    return (
        <VehicleContext.Provider value={{ search, handleDelete, setVehicleEdit, page, vehicles, type, count, pageR }}>
            {children}
        </VehicleContext.Provider>
    )
}