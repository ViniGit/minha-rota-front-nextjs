
import type { NextPage } from 'next'
import Head from 'next/head'


import Admin from "."
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react';


export default function Vehicle() {

    const [color, setColor] = useState('blue');
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