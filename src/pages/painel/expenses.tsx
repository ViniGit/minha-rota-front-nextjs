
import type { NextPage } from 'next'
import Head from 'next/head'

import Admin from "."

export default function AdminExpenses() {

    return (
        < >
            <Head>
                <title>Despesas | Minha Rota</title>
            </Head>
            <h1>Admin expenses.</h1>
        </>
    )
}

AdminExpenses.layout = Admin

