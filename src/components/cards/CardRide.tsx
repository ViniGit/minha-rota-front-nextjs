import Link from "next/link";
import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GiPathDistance} from 'react-icons/gi'


// components

export default function CardRide() {
    return (
        <>
            <Link href="/painel/travel">
                <div className="flex justify-center p-6 max-w-xs md:w-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-800 hover:scale-110  hover:cursor-pointer">
                    <div className="flex justify-center">
                        <FaMapMarkedAlt
                            className=" h-10 w-10 m-3 text-white"
                            aria-hidden="true"
                        />
                        <h5 className=" m-3 self-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Viagem</h5>
                        <p className="m-3 self-center text-2xl text-red-500">32</p>
                    </div>
                </div>
            </Link>

        </>
    );
}
