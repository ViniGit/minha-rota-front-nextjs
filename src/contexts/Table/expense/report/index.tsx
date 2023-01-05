import { createContext, useEffect, useState } from "react"
import { api } from "../../../../services/apiClient"
import { ToastifyError } from "../../../../toastify/toastify-error"
import { ToastifySuccess } from "../../../../toastify/toastify-succes"
import { format, getFirstDayOfMonth, getLastDayOfMonth } from "../../../../utils/formatData"


import XLSX from 'sheetjs-style'
import { typeExpenseTransform } from "../../../../utils/Expense"

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
    exportXls(): Promise<void>
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



    function formatDataToExport() {
        var arrayToExport = [['Descrição', 'Tipo', 'Data', 'Valor']]
        for (const expense of expenseReport) {
            // build rows
            var expenseValue = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(expense.value)

            var expenseType = typeExpenseTransform(expense.type) as string

            arrayToExport.push([expense.description, expenseType, format(expense.created_at), expenseValue])
        }
        var total = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(totalValue)

        // total value
        arrayToExport.push(['', '', 'Total:', total])

        return arrayToExport

    }


    async function exportXls() {
        console.log(expenseReport)
        debugger
        if (expenseReport && expenseReport.length > 0) {

            var workbook = XLSX.utils.book_new()

            var arrayExport = formatDataToExport()

            var ws = XLSX.utils.json_to_sheet(arrayExport, { skipHeader: true })

            var styleHeader = {
                font: {
                    name: 'arial',
                    bold: true,
                    color: "#F2F2F2"
                },
            }
            ws['A1'].s = styleHeader
            ws['B1'].s = styleHeader
            ws['C1'].s = styleHeader
            ws['D1'].s = styleHeader

            const fileName = "Relatório-Despesas"

            XLSX.utils.book_append_sheet(workbook, ws, fileName)
            XLSX.writeFile(workbook, fileName + '.xlsx')

        }
    }

    async function page(page: number) {
        setPageR(page)
    }

    return (
        <ReportExpenseContext.Provider value={{ search, handleRequest, page, exportXls, expenseReport, totalValue, count, pageR }}>
            {children}
        </ReportExpenseContext.Provider>
    )
}