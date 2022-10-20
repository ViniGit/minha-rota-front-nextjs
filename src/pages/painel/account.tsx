
import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useContext, useEffect, useState } from 'react'

import Admin from "."
import CardExpenses from '../../components/cards/CardExpenses'
import CardRoutes from '../../components/cards/CardRoutes'
import CardVehicles from '../../components/cards/CardVehicles'
import { Authcontext, signOut } from '../../contexts/AuthContext'

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


import { registerLocale, setDefaultLocale } from "react-datepicker"
import ptBR from 'date-fns/locale/pt-BR'
registerLocale('ptBR', ptBR)

import MaskedInput from 'react-maskedinput';

export default function Account() {

    const { user, updateReferenceUser } = useContext(Authcontext)

    const [activeUser, setActiveUser] = useState<UserModel>()
    const [toggle, setToggle] = useState<Boolean>(false)

    const [startDate, setStartDate] = useState(new Date())
    function handleToggle() {
        setToggle(!toggle)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/users/${user?.email}`)
            const { name, email, password, cpf, cell, birth_date, id } = await response.data
            let date = new Date(birth_date)
            setStartDate(date)
            setActiveUser({ name, email, password, cpf, cell, birth_date, id })
        }
        fetchData()
            .catch(console.error)
    }, [user?.email])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: activeUser?.name || '',
            email: activeUser?.email || '',
            currentPassword: '',
            cpf: activeUser?.cpf || '',
            cell: activeUser?.cell || '',
            birth_date: activeUser?.birth_date || '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(20, 'Nome deve ter no máximo 20 caracteres.')
                .min(5, 'Nome deve ter no minimo 5 caracteres.')
                .required('Campo Obrigatório'),
            cell: Yup.string()
                .required('Campo Obrigatório'),
            email: Yup.string().email('Enrereço de e-mail inválido!').required('Campo Obrigatório'),
            birth_date: Yup.date(),
            cpf: Yup.string().required('Campo Obrigatório'),
            currentPassword: Yup.string(),
            newPassword: Yup.string(),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'As senhas não se correspondem!')
        }),
        onSubmit: (values) => {

            let data = {
                name: values.name,
                email: values.email,
                cell: values.cell,
                cpf: removeMask(values.cpf),
                birth_date: startDate.toISOString(),
                changePassword: toggle,
                newPassword: values.newPassword,
                currentPassword: values.currentPassword,

            }

            try {
                api.put(`/users/${activeUser?.id}`, data).then(response => {
                    console.log('update')
                    console.log(response.data)
                    if (response.status === 201) {
                        ToastifySuccess('Usuário atualizado!')
                        setTimeout(() => {
                            updateReferenceUser({ name: response.data.name, email: response.data.email, isAdmin: response.data.isAdmin })
                            console.log('logout')
                            console.log(response.data.logout)
                            if (response.data.logout)
                                signOut()
                            else
                                Router.push('/painel')
                        }, 3000)
                    }
                }).catch((err) => {
                    if (err.response && err.response.data && err.response.data.message && err.response.data.statusCode == 400)
                        return ToastifyError(err.response.data.message)
                    else
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
                                <div className="">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                                htmlFor="grid-password"
                                            >
                                                Senha Atual:
                                            </label>
                                            <input
                                                //@ts-ignore
                                                required={toggle}
                                                id="currentPassword"
                                                type="password"
                                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                                value={formik.values.currentPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                                htmlFor="grid-password"
                                            >
                                                Nova senha:
                                            </label>
                                            <input
                                                //@ts-ignore
                                                required={toggle}
                                                id="newPassword"
                                                type="password"
                                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                                value={formik.values.newPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block  text-blueGray-600 text-sm font-bold mb-2 text-white"
                                                htmlFor="grid-password"
                                            >
                                                Confirmação de nova senha:
                                            </label>
                                            <input
                                                //@ts-ignore
                                                required={toggle}
                                                id="confirmNewPassword"
                                                type="password"
                                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                                value={formik.values.confirmNewPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? <p className='text-red-500 text-xs mt-2'>{formik.errors.confirmNewPassword}</p> : null}

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

Account.layout = Admin

