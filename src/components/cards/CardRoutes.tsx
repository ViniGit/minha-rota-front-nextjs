import Link from "next/link";
import React, { useContext } from "react";
import { GiPathDistance } from 'react-icons/gi'
import { RouteContext } from "../../contexts/Table/route";

export default function CardRoutes() {

    let { count } = useContext(RouteContext)


    return (
        <>
            <Link href="/painel/route">
                <div className="flex justify-center p-6 md:w-full  bg-gray-900 rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-800 hover:scale-110  hover:cursor-pointer">
                    <div className="flex justify-center">
                        <GiPathDistance
                            className=" h-10 w-10 m-3 text-white"
                            aria-hidden="true"
                        />
                        <h5 className=" m-3 self-center text-2xl font-semibold tracking-tight text-white dark:text-white">Trajetos</h5>
                        <p className="m-3 self-center text-2xl text-red-500">{String(count)}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}
