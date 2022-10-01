import React from "react";
import { GiTakeMyMoney } from 'react-icons/gi'
import Link from "next/link";


// components

export default function CardDashboard() {
    return (
        <>
            {/* <div className="flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg m-2">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap justify-between">
                        <GiTakeMyMoney
                            className=" h-6 w-6"
                            aria-hidden="true"
                        />
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            0
                        </h5>
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            Despesas
                        </h5>
                    </div>
                </div>
            </div> */}
            <Link href="/painel/expenses">
            <div className="flex justify-center p-6 max-w-xs  md:w-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-800 hover:scale-110  hover:cursor-pointer">
                <div className="flex justify-center">
                    <GiTakeMyMoney
                        className=" h-10 w-10 m-3 text-white"
                        aria-hidden="true"
                    />
                    <h5 className=" m-3 self-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Despesas</h5>
                    <p className="m-3 self-center text-2xl text-red-500">30</p>
                </div>
            </div>
            </Link>
        </>
    );
}
