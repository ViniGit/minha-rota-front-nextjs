
import type { NextPage } from 'next'
import Head from 'next/head'

import Admin from "."

export default function Expense() {

    return (
        < >
            <Head>
                <title>Despesas | Minha Rota</title>
            </Head>
            <div className="p-8  xl:flex w-full ">
                <h1>Despesas!!!!!</h1>
            </div>
        </>
    )
}

Expense.layout = Admin
