import { createContext, useEffect, useState } from "react"
import { api } from "../../../../services/apiClient"
import { ToastifyError } from "../../../../toastify/toastify-error"
import { ToastifySuccess } from "../../../../toastify/toastify-succes"
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../../../utils/formatData"



interface ReportProps {
    id: string
    description: string
    route_id: string
    type: string
    value: number
    created_at: string
}

interface ExpenseContextData {
    search(type?: searchPros): Promise<void>
    handleRequest(page: IRequest): Promise<void>
    page(page: number): Promise<void>
    expenseReport: ReportProps[]
    totalValue: number
    count: number,
    pageR: number,
}

interface ExpenseProviderProps {
    children: React.ReactNode
}

interface searchPros {
    take?: number,
    pageR?: number
}


interface IRequest {
    type: string,
    startDate: Date,
    finaltDate: Date
}

export const ReportExpenseContext = createContext({} as ExpenseContextData)

export function ExpenseProvider({ children }: ExpenseProviderProps) {
    // const [expenses, setExpenses] = useState<ReportProps[]>([])
    const [expenseReport, setExpenseReport] = useState<ReportProps[]>([])
    const [count, setCount] = useState<number>(0)
    const [totalValue, setTotalValue] = useState<number>(0)
    const [pageR, setPageR] = useState<number>(1)

    async function handleRequest(data: IRequest) {
        try {
            api.get(`/expense/report/${data.startDate}/${data.finaltDate}/${data.type}`).then(response => {
                if (response.status === 201) {
                    console.log(response.data)
                    setExpenseReport(response.data.report)
                    setTotalValue(response.data.totalValue.totalValue)
                }
            }).catch((err) => {
                console.log(err)
                if (err.response && err.response.data && err.response.data.message && err.response.data.statusCode == 400)
                    return ToastifyError(err.response.data.message)
                else
                    return ToastifyError('Erro interno do servidor')
            })
        } catch (error) {
            ToastifyError('Erro interno do servidor')
            console.warn(error)
        }
    }

    useEffect(() => {

        let data = {
            type: '',
            startDate: getFirstDayOfMonth(),
            finaltDate: getLastDayOfMonth()
        }

        handleRequest(data)

    }, [])


    // async function handleDelete(expense: ReportProps) {
    //     let value = false

    //     if (confirm("Confirmar Exclusão?") == true) {
    //         value = true
    //     } else {
    //         value = false
    //     }

    //     if (value) {
    //         await api.delete("/expense", { params: { id: expense.id } })
    //             .then(response => {
    //                 if (response.status == 200)
    //                     ToastifySuccess('Despesa excluído!')
    //             }).catch(err => {
    //                 console.log(err)
    //             })

    //         search({ pageR: 0, take: 5 })

    //     }
    // }

    async function search({ take = 5, pageR = 0 }: searchPros) {
        const response = await api.get("/expense", {
            params: {
                take,
                skip: take * pageR
            }
        })
        // setExpenses(response.data.expense)
        // setCount(response.data.count)

    }

    async function page(page: number) {
        setPageR(page)
    }

    return (
        <ReportExpenseContext.Provider value={{ search, handleRequest, page, expenseReport, totalValue, count, pageR }}>
            {children}
        </ReportExpenseContext.Provider>
    )
}