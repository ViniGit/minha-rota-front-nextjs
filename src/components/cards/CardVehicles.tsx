import Link from "next/link";
import React, { useContext, useState } from "react";
import { GiCityCar } from 'react-icons/gi'
import { VehicleContext } from "../../contexts/Table/vehicle";

export default function CardVehicles() {

    let { count } = useContext(VehicleContext)

    return (
        <>
            <Link href="/painel/vehicle">
                <div className="flex justify-center p-6 md:w-full  bg-gray-900 rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-800 hover:scale-110  hover:cursor-pointer">
                    <div className="flex justify-center">
                        <GiCityCar
                            className=" h-10 w-10 m-3 text-white"
                            aria-hidden="true"
                        />
                        <h5 className=" m-3 self-center text-2xl font-semibold tracking-tight text-white dark:text-white">Veículos</h5>
                        <p className="m-3 self-center text-2xl text-red-500">{String(count)}</p>
                    </div>
                </div>
            </Link>

        </>
    )
}
