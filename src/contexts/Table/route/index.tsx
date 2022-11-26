import { createContext, useEffect, useState } from "react"
import { api } from "../../../services/apiClient"
import { ToastifySuccess } from "../../../toastify/toastify-succes"


interface RoutesProps {
    id: string
    destination: string
    description: string
    distance: number
    price: number
}

interface RouteContextData {
    search(type?: searchPros): Promise<void>
    handleDelete(page: RoutesProps): Promise<void>
    setRouteEdit(route: RoutesProps): Promise<void>
    page(page: number): Promise<void>
    routes: RoutesProps[]
    type: string,
    count: number,
    pageR: number,
}

interface RouteProvaiderProps {
    children: React.ReactNode
}

interface searchPros {
    take?: number,
    pageR?: number
}

export const RouteContext = createContext({} as RouteContextData)

export function RouteProvider({ children }: RouteProvaiderProps) {
    const [routes, setRoutes] = useState<RoutesProps[]>([])
    const [type, setType] = useState<string>('')
    const [route, setRoute] = useState<RoutesProps>()
    const [count, setCount] = useState<number>(0)
    const [pageR, setPageR] = useState<number>(1)

    useEffect(() => {
        api.get("/route",
            {
                params: {
                    take: 5,
                    skip: 0
                }
            }
        )
            .then(response => {
                setRoutes(response.data.routes)
                setCount(response.data.count)
            })


    }, [])

    async function handleDelete(route: RoutesProps) {
        let value = false

        if (confirm("Confirmar Exclusão?") == true) {
            value = true
        } else {
            value = false
        }

        if (value) {
            await api.delete("/route", { params: { id: route.id } })
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

    async function setRouteEdit(route: RoutesProps) {
        console.log(route)
        setRoute(route)

    }

    async function search({ take = 5, pageR = 0 }: searchPros) {
        const response = await api.get("/route", {
            params: {
                take,
                skip: take * pageR
            }
        })
        setRoutes(response.data.routes)
        setCount(response.data.count)

    }

    async function page(page: number) {
        setPageR(page)
    }

    return (
        <RouteContext.Provider value={{ search, handleDelete, setRouteEdit, page, routes, type, count, pageR }}>
            {children}
        </RouteContext.Provider>
    )
}