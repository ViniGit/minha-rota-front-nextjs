
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

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastifySuccess } from '../../toastify/toastify-succes'
import Router from 'next/router'
import { ToastifyWarn } from '../../toastify/toastify-warn'
import { ToastifyError } from '../../toastify/toastify-error'
import { Value } from 'sass'
import { formatData } from '../../utils/DataToYYYYMMDD'
import { ToastContainer } from 'react-toastify'
import ReactInputMask from 'react-input-mask'

import InputMask from "react-input-mask"

import { mask, removeMask } from "../../utils/CpfCnpjMask"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import { registerLocale, setDefaultLocale } from "react-datepicker"
import ptBR from 'date-fns/locale/pt-BR'
registerLocale('ptBR', ptBR)

import MaskedInput from 'react-maskedinput';

export default function Settings() {

    const { user } = useContext(Authcontext)

    const [activeUser, setActiveUser] = useState<UserModel>()
    const [toggle, setToggle] = useState<Boolean>(false)

    const [startDate, setStartDate] = useState(new Date())
    function handleToggle() {
        setToggle(!toggle)
    }

    // const getUser = async () => {
    //     const response = await api.get(`/users/email?email=${user?.email}`)
    //     console.log(`user: ${response.data}`)
    //     setActiveUser(response.data)
    // };

    // useEffect(() => {
    //     api.get(`/users/email?email=${user?.email}`).then(async (response) => {
    //         console.log(response)
    //         const { name, email, password, cpf, cell, birth_date } = response.data
    //         setActiveUser({ name, email, password, cpf, cell, birth_date })
    //     }).catch((err) => {
    //         console.log(err)
    //     })

    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/users/email?email=${user?.email}`)
            console.log('response')
            console.log(response.data)
            const { name, email, password, cpf, cell, birth_date, id } = await response.data
            setActiveUser({ name, email, password, cpf, cell, birth_date, id })
        }
        fetchData()
            .catch(console.error)
    }, [])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: activeUser?.name || '',
            email: activeUser?.email || '',
            password: '',
            cpf: activeUser?.cpf || '',
            cell: activeUser?.cell || '',
            birth_date: activeUser?.birth_date || '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(20, 'Nome deve ter no máximo 20 caracteres.')
                .min(5, 'Nome deve ter no minimo 5 caracteres.')
                .required('Campo Obrigatorio'),
            cell: Yup.string()
                .required('Campo Obrigatorio'),
            email: Yup.string().email('Enrereço de e-mail inválido!').required('Campo Obrigatorio'),
            birth_date: Yup.string().required('Campo Obrigatorio'),
            cpf: Yup.string().required('Campo Obrigatorio'),
            password: Yup.string(),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'As senhas não se correspondem!')
        }),
        onSubmit: (values) => {
            let data = {
                name: values.name,
                email: values.email,
                cell: values.cell,
                cpf: removeMask(values.cpf),
                birth_date: values.birth_date,
                changePassword: toggle,
                password: values.password
            }

            try {
                api.put(`/users/${activeUser?.id}`, data).then(response => {
                    console.log(response)
                    if (response.status === 201) {
                        ToastifySuccess('Usuário atualizado!')
                        setTimeout(() => {
                            Router.push('/painel')
                        }, 4000)
                    }
                }).catch((err) => {
                    return ToastifyError('Erro interno do servidor')
                })
            } catch (error) {
                console.warn(error)
            }
        },
    })



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
                        <form onSubmit={formik.handleSubmit}>
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
                                            id="name"
                                            type="text"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.name && formik.errors.name ? <p className='text-red-500 text-xs mt-2'>{formik.errors.name}</p> : null}

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
                                        {/* <input
                                            id="cpf"
                                            type="text"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            defaultValue={formik.values.cpf}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        /> */}
                                        <input id="cpf" type="text" maxLength={18} placeholder="CPF/CNPJ" value={mask(formik.values.cpf)} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />

                                        {formik.touched.cpf && formik.errors.cpf ? <p className='text-red-500 text-xs mt-2'>{formik.errors.cpf}</p> : null}

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

                                        <InputMask
                                            id='cell'
                                            mask="(99) 99999-9999"
                                            placeholder="Celular"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleChange}
                                            value={formik.values.cell}
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                        />

                                        {formik.touched.cell && formik.errors.cell ? <p className='text-red-500 text-xs mt-2'>{formik.errors.cell}</p> : null}

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

                                        {/* <ReactInputMask
                                            id='date'
                                            type="text"
                                            mask="99/99/9999"
                                            placeholder="Data de Nascimento"
                                            onChange={formik.handleChange}
                                            value={formik.values.birth_date}
                                            onBlur={formik.handleBlur}
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                        /> */}
                                        {/* <input
                                            id="birth_date"
                                            type="text"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            defaultValue={formik.values.birth_date}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        /> */}

                                        <DatePicker
                                            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                                            locale={ptBR}
                                            selected={startDate}
                                            onChange={(date: Date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={
                                                <MaskedInput mask="11/11/1111" placeholder="dd/mm/yyyy" />
                                            }
                                        />

                                        {formik.touched.birth_date && formik.errors.birth_date ? <p className='text-red-500 text-xs mt-2'>{formik.errors.birth_date}</p> : null}
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
                                                //@ts-ignore
                                                required={toggle}
                                                id="password"
                                                type="password"
                                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.password && formik.errors.password ? <p className='text-red-500 text-xs mt-2'>{formik.errors.password}</p> : null}

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
                                                //@ts-ignore
                                                required={toggle}
                                                id="confirmPassword"
                                                type="password"
                                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='text-red-500 text-xs mt-2'>{formik.errors.confirmPassword}</p> : null}

                                        </div>
                                    </div>
                                </div>
                            )
                                : null}

                            <div className="m-4">
                                <button type="submit" className="w-full px-3 py-4 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Atualizar</button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />

                </div>

            </div>
        </>
    )
}

Settings.layout = Admin

