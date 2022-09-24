import React from "react";
import { GiTakeMyMoney } from 'react-icons/gi'


// components

export default function CardDashboard() {
    return (
        <>
            <div className="flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg m-2">
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
            </div>
        </>
    );
}
