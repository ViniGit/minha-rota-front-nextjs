import { createContext, useEffect, useState } from "react"
import TravelModel from "../../../models/TravelModel"
import { api } from "../../../services/apiClient"
import { ToastifySuccess } from "../../../toastify/toastify-succes"


// interface TravelModel {
//     id: string
//     destination: string
//     description: string
//     distance: number
//     price: number
// }

interface TravelContextData {
    search(type?: searchPros): Promise<void>
    handleDelete(page: TravelModel): Promise<void>
    setTravelEdit(travel: TravelModel): Promise<void>
    page(page: number): Promise<void>
    travels: TravelModel[]
    type: string,
    count: number,
    pageR: number,
}

interface TravelProvaiderProps {
    children: React.ReactNode
}

interface searchPros {
    take?: number,
    pageR?: number
}



export const TravelContext = createContext({} as TravelContextData)

export function TravelProvider({ children }: TravelProvaiderProps) {
    const [travels, setTravels] = useState<TravelModel[]>([])
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
        api.get("/travel",
            {
                params: {
                    take: 5,
                    skip: 0
                }
            }
        )
            .then(response => {
                console.log(response)
                setTravels(response.data.travel)
                setCount(response.data.count)
            })


    }, [])

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
                    console.log(response)
                    if (response.status == 200)
                        ToastifySuccess('Trajeto excluído!')
                }).catch(err => {
                    console.log(err)
                })

            search({ pageR: 0, take: 5 })

        }
    }

    async function setTravelEdit(travel: TravelModel) {
        console.log(travel)
        setTravel(travel)

    }

    async function search({ take = 5, pageR = 0 }: searchPros) {
        const response = await api.get("/travel", {
            params: {
                take,
                skip: take * pageR
            }
        })
        setTravels(response.data.travels)
        setCount(response.data.count)

    }

    async function page(page: number) {
        setPageR(page)
    }

    return (
        <TravelContext.Provider value={{ search, handleDelete, setTravelEdit, page, travels, type, count, pageR }}>
            {children}
        </TravelContext.Provider>
    )
}