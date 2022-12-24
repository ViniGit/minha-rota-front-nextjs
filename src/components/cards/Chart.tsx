import React, { useContext } from "react";
import { TravelContext } from "../../contexts/Table/travel";
// import Chart from 'react-apexcharts'

import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function CardChart() {

    // let { count } = useContext(TravelContext)

    return (
        <>
            {/* <Link href="/painel/travel"> */}
            <div className="flex md:w-full">
                <div className="flex text-white justify-center p-10 bg-gray-900 rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-800">
                    <ApexCharts options={{
                        colors: ['#FF6961', '#1fea78'],
                        labels: ['Despesas', 'Lucro'],
                        title: { text: 'Gráfico de Lucro', style: { color: 'white', fontSize: '18' }, offsetY: -5 },
                        dataLabels: {
                            style: {
                                colors: ['white']
                            }
                        },
                        legend: {
                            fontSize: '14',
                            labels: {
                                colors: ['white']
                            }
                        },
                        fill: {
                            // type: 'gradient',
                           
                        }
                    }} series={[1240, 5000]} type="donut" width="450"/>

                    {/* <GiTreasureMap
                            className=" h-10 w-10 m-3 text-white"
                            aria-hidden="true"
                        /> */}
                    {/* <h5 className=" m-3 self-center text-2xl font-semibold tracking-tight text-white dark:text-white">Viagens</h5> */}
                    {/* <p className="m-3 self-center text-2xl text-red-500">{String(count)}</p> */}
                </div>
            </div>
            {/* </Link> */}

        </>
    );
}
