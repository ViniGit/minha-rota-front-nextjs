
import type { NextPage } from 'next'
import Head from 'next/head'

import Admin from "."

export default function Routes() {

    return (
        < >
            <Head>
                <title>Trajetos | Minha Rota</title>
            </Head>
            <div className="p-8  xl:flex w-full ">
                <h1>Trajetos !!!!!</h1>
            </div>
        </>
    )
}

Routes.layout = Admin

