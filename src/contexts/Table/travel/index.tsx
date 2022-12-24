import { createContext, useEffect, useState } from "react"
import TravelModel from "../../../models/TravelModel"
import { api } from "../../../services/apiClient"
import { ToastifySuccess } from "../../../toastify/toastify-succes"


export interface TravelContextData {
    search(type?: searchPros): Promise<void>
    handleDelete(page: TravelModel): Promise<void>
    page(page: number): Promise<void>
    lastTravel: lastTravel
    travels: TravelModel[]
    type: string
    count: number
    pageR: number
}

interface TravelProvaiderProps {
    children: React.ReactNode
}

interface searchPros {
    take?: number,
    pageR?: number
}

interface lastTravel {
    created_at: string
    date: string
    description: string
    id: number
    route_id: string
    travels: number
    user_id: string
    vehicle_id: string
}



export const TravelContext = createContext({} as TravelContextData)

export function TravelProvider({ children }: TravelProvaiderProps) {
    const [travels, setTravels] = useState<TravelModel[]>([])
    const [lastTravel, setLastTravel] = useState<lastTravel>()
    const [type, setType] = useState<string>('')
    const [travel, setTravel] = useState<TravelModel>()
    const [count, setCount] = useState<number>(0)
    const [pageR, setPageR] = useState<number>(1)

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/travel',
                {
                    params: {
                        take: 5,
                        skip: 0
                    }
                })

            const { travel, count, lastElement } = response.data

            setTravels(travel)
            setCount(count)
            setLastTravel(lastElement)
        }

        fetchData()

    }, [])


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await api.get(`/users/${user?.email}`)
    //         const { name, email, password, cpf, cell, birth_date, id } = await response.data
    //         let date = new Date(birth_date)
    //         setStartDate(date)
    //         setActiveUser({ name, email, password, cpf, cell, birth_date, id })
    //     }
    //     fetchData()
    // }, [user?.email])

    async function handleDelete(travel: TravelModel) {
        let value = false

        if (confirm("Confirmar Exclusão?") == true) {
            value = true
        } else {
            value = false
        }

        if (value) {
            await api.delete("/travel", { params: { id: travel.id } })
                .then(response => {
                    if (response.status == 200)
                        ToastifySuccess('Viagem excluída!')
                }).catch(err => {
                    console.log(err)
                })

            search({ pageR: 0, take: 5 })

        }
    }

    async function search({ take = 5, pageR = 0 }: searchPros) {
        const response = await api.get("/travel", {
            params: {
                take,
                skip: take * pageR
            }
        })
        setTravels(response.data.travel)
        setCount(response.data.count)
        setLastTravel(response.data.lastElement)

    }

    async function page(page: number) {
        setPageR(page)
    }

    return (
        // @ts-ignore
        <TravelContext.Provider value={{ search, handleDelete, page, travels, type, count, pageR, lastTravel }}>
            {children}
        </TravelContext.Provider>
    )
}