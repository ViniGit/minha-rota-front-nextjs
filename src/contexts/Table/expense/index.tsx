import { createContext, useEffect, useState, useCallback } from "react"
import { api } from "../../../services/apiClient"
import { ToastifySuccess } from "../../../toastify/toastify-succes"


interface ExpenseProps {
    id: string
    description: string
    route_id: string
    type: string
    value: number
}

interface ExpenseContextData {
    search(type?: searchPros): Promise<void>
    handleDelete(page: ExpenseProps): Promise<void>
    setExpenseEdit(ExpenseContext: ExpenseProps): Promise<void>
    page(page: number): Promise<void>
    expenses: ExpenseProps[]
    type: string,
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

export const ExpenseContext = createContext({} as ExpenseContextData)

export function ExpenseProvider({ children }: ExpenseProviderProps) {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([])
    const [type, setType] = useState<string>('')
    const [expense, setExpense] = useState<ExpenseProps>()
    const [count, setCount] = useState<number>(0)
    const [pageR, setPageR] = useState<number>(1)

    useEffect(() => {
        api.get("/expense",
            {
                params: {
                    take: 5,
                    skip: 0
                }
            }
        )
            .then(response => {
                console.log(response.data.count)
                console.log(response.data.expense)
                setExpenses(response.data.expense)
                setCount(response.data.count)
            })


    }, [])


    async function handleDelete(expense: ExpenseProps) {
        let value = false

        if (confirm("Confirmar Exclusão?") == true) {
            value = true
        } else {
            value = false
        }

        if (value) {
            await api.delete("/expense", { params: { id: expense.id } })
                .then(response => {
                    console.log(response)
                    if (response.status == 200)
                        ToastifySuccess('Despesa excluído!')
                }).catch(err => {
                    console.log(err)
                })

            search({ pageR: 0, take: 5 })

        }
    }

    async function setExpenseEdit(expense: ExpenseProps) {
        console.log(expense)
        setExpense(expense)

    }

    async function search({ take = 5, pageR = 0 }: searchPros) {
        const response = await api.get("/expense", {
            params: {
                take,
                skip: take * pageR
            }
        })
        setExpenses(response.data.expense)
        setCount(response.data.count)

    }

    async function page(page: number) {
        setPageR(page)
    }

    return (
        <ExpenseContext.Provider value={{ search, handleDelete, setExpenseEdit, page, expenses, type, count, pageR }}>
            {children}
        </ExpenseContext.Provider>
    )
}