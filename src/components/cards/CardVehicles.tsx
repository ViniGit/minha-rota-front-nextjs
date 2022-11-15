import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GiPathDistance, GiCityCar } from 'react-icons/gi'
import { VehicleContext } from "../../contexts/Table/vehicle";
import { api } from "../../services/apiClient";


// components

export default function CardVehicles() {

    const [countRoute, setCountRoute] = useState<Number>(0)

    let { count } = useContext(VehicleContext)


    // const fetchData = useCallback(async () => {
    //     await api.get('/dashboard/vehicles').then(response => {
    //         const routesQuantity = response.data
    //         setCountRoute(routesQuantity)

    //     }).catch((err) => {
    //         console.error(err)
    //     })
    // }, [])

    // useEffect(() => {
    //     fetchData()
    //         .catch(console.error)

    // }, [fetchData])


    return (
        <>
            <Link href="/painel/vehicle">
                <div className="flex justify-center p-6 max-w-xs md:w-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-800 hover:scale-110  hover:cursor-pointer">
                    <div className="flex justify-center">
                        <GiCityCar
                            className=" h-10 w-10 m-3 text-white"
                            aria-hidden="true"
                        />
                        <h5 className=" m-3 self-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Veículos</h5>
                        <p className="m-3 self-center text-2xl text-red-500">{String(count)}</p>
                    </div>
                </div>
            </Link>

        </>
    );
}
