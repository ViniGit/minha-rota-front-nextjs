
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'

import Admin from "."
import CardExpenses from '../../components/cards/CardExpenses'
import CardRoutes from '../../components/cards/CardRoutes'
import CardVehicles from '../../components/cards/CardVehicles'
import { Authcontext } from '../../contexts/AuthContext'

import axios from 'axios'
import { api } from '../../services/apiClient'
import UserModel from '../../models/UserModel'


export default function Settings() {

    const { user } = useContext(Authcontext)

    const [activeUser, setActiveUser] = useState<UserModel>()
    const [toggle, setToggle] = useState<Boolean>()

    function handleToggle() {
        setToggle(!toggle)
    }

    useEffect(() => {
        console.log(user?.email)
        api.get(`/users/email?email=${user?.email}`).then(response => {
            console.log(response)
            const { name, email, password, cpf, cell, birth_date } = response.data
            setActiveUser({ name, email, password, cpf, cell, birth_date })
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        < >
            <Head>
                <title>Settings | Minha Rota</title>
            </Head>
            <div className='p-8 xl:flex w-full '>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-white dark:bg-gray-900">
                    <div className="rounded-t bg-white dark:bg-gray-900 mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold text-white">Minha conta</h6>
                            {/* <button
                                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Configurações
                            </button> */}
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h6 className="text-blueGray-400 text-base mt-3 mb-6 font-bold  text-white">
                                Informações do usuário:
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                            htmlFor="grid-password"
                                        >
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            defaultValue={activeUser?.name}
                                        />
                                    </div>
                                </div>
                                {/* <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            defaultValue={activeUser?.email}
                                        />
                                    </div>
                                </div> */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                            htmlFor="grid-password"
                                        >
                                            CPF/CNPJ
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            defaultValue={activeUser?.cpf}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                            htmlFor="grid-password"
                                        >
                                            Celular
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            defaultValue={activeUser?.cell}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-sm font-bold mb-2 text-white "
                                            htmlFor="grid-password"
                                        >
                                            Data de Nascimento
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            defaultValue={activeUser?.birth_date}
                                        />
                                    </div>
                                </div>

                                {/* <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            CPF/CNPJ
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            defaultValue="Lucky"
                                        />
                                    </div>
                                </div> */}
                            </div>
                            <div className='m-4'>
                                <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                                    <input onChange={handleToggle} type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Trocar senha</span>
                                </label>
                            </div>

                            {toggle ? (
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                                htmlFor="grid-password"
                                            >
                                                Senha:
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                                defaultValue={activeUser?.cell}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                                htmlFor="grid-password"
                                            >
                                                Confirmação de senha:
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                                defaultValue={activeUser?.cell}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                                : null}

                            <div className="m-4">
                                <button type="submit" className="w-full px-3 py-4 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Entrar</button>
                            </div>
                            {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}

                            {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold ">
                                Contact Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            City
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            defaultValue="New York"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            defaultValue="United States"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block  text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            defaultValue="Postal Code"
                                        />
                                    </div>
                                </div>
                            </div> */}

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

Settings.layout = Admin

