
import type { NextPage } from 'next'
import Head from 'next/head'

import Admin from "."

export default function Vehicle() {

    return (
        < >
            <Head>
                <title>Veículos | Minha Rota</title>
            </Head>
            <div className="p-8  xl:flex w-full ">
                <h1>Veículos !!!!!</h1>
            </div>
        </>
    )
}

Vehicle.layout = Admin

