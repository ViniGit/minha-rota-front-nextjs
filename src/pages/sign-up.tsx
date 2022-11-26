
import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import { api } from '../services/apiClient'

import { ToastifyWarn } from '../toastify/toastify-warn'
import { ToastifySuccess } from '../toastify/toastify-succes'
import { ToastifyError } from '../toastify/toastify-error'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'

import InputMask from "react-input-mask"
import { mask, removeMask } from "../utils/CpfCnpjMask"


import * as Yup from 'yup'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import MaskedInput from 'react-maskedinput'
import { useState } from 'react'

import ptBR from 'date-fns/locale/pt-BR'
registerLocale('ptBR', ptBR)

const SignUp: NextPage = () => {
    const [startDate, setStartDate] = useState(new Date())

    const formik = useFormik({
        initialValues: {
            email: '',
            cell: '',
            name: '',
            password: '',
            confirmPassword: '',
            cpf: '',
            date: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(20, 'Nome deve ter no máximo 20 caracteres.')
                .min(5, 'Nome deve ter no minimo 5 caracteres.')
                .required('Campo Obrigatorio'),
            cell: Yup.string()
                .required('Campo Obrigatorio'),
            email: Yup.string().email('Enrereço de e-mail inválido!').required('Campo Obrigatorio'),
            // date: Yup.date().required('Campo Obrigatorio').nullable(),
            cpf: Yup.string().required('Campo Obrigatorio'),
            password: Yup.string().required('Senha é obrigatória!'),
            confirmPassword: Yup.string().required('Confirmação de senha é obrigatório!')
                .oneOf([Yup.ref('password'), null], 'As senhas não se correspondem!')
        }),
        onSubmit: async (values) => {

            const data = {
                name: values.name,
                email: values.email,
                password: values.password,
                cpf: removeMask(values.cpf),
                cell: values.cell,
                birth_date: startDate.toISOString()
            }

            try {
                api.post('/users', data).then(response => {
                    if (response.status === 201) {
                        ToastifySuccess('Cadastro realizado!')
                        setTimeout(() => {
                            Router.push('/')
                        }, 4000)
                    }
                }).catch((err) => {
                    if (err.response.data.message == 'User already exists') {
                        return ToastifyWarn('Usuario já cadastrado!')
                    }

                    return ToastifyError('Erro interno do servidor')
                })
            } catch (error) {
                console.warn(error)
            }
        },
    })

    return (
        <>
            <Head>
                <title>Cadastro | Minha Rota</title>
            </Head>
            <div className="bg-gray-900 m-20 rounded-lg w-10/12 mx-auto">
                <div className="flex p-20 flex-wrap content-center">
                    <section className="flex-auto w-2/6	m-auto p-5">
                        {/* <h1 className="text-white text-xl"> Cadastro </h1> */}
                        <p className="text-white text-xl"> Faça seu cadastro, entre na plataforma e comece a administrar suas rotas!</p>
                        <a className="back-link" href="/">
                            <FiArrowLeft size={16} color="#e02041" />
                            <p className="text-base text-white">Já possui cadastro?</p>
                        </a>
                    </section>
                    <form className="flex-auto w-3/6 p-5 form-dark" onSubmit={formik.handleSubmit}>

                        <div className="m-4">
                            <input id="name" placeholder="Nome" type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.name && formik.errors.name ? <p className='text-red-500 text-xs mt-2'>{formik.errors.name}</p> : null}
                        </div>

                        <div className="m-4">
                            <input id="email" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email ? <p className='text-red-500 text-xs mt-2'>{formik.errors.email}</p> : null}
                        </div>


                        <div className="m-4">
                            <input id="cpf" type="text" maxLength={18} placeholder="CPF/CNPJ" value={mask(formik.values.cpf)} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.cpf && formik.errors.cpf ? <p className='text-red-500 text-xs mt-2'>{formik.errors.cpf}</p> : null}
                        </div>

                        <div className="m-4">
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

                        <div className="m-4">

                            <ReactDatePicker
                                className='input-mask w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                                locale={ptBR}
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                customInput={
                                    <MaskedInput mask="11/11/1111" placeholder="dd/mm/yyyy" />
                                }
                            />

                            {/* {!startDate? <p className='text-red-500 text-xs mt-2'>Campo Obrigatório</p> : null} */}
                        </div>


                        <div className="m-4">
                            <input type="password" id="password" placeholder="Senha" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.password && formik.errors.password ? <p className='text-red-500 text-xs mt-2'>{formik.errors.password}</p> : null}
                        </div>

                        <div className="m-4">
                            <input type="password" id="confirmPassword" placeholder="Confirmar senha" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='text-red-500 text-xs mt-2'>{formik.errors.confirmPassword}</p> : null}
                        </div>

                        <div className="m-4 ">
                            <button type="submit" className="w-full px-3 py-4 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Cadastrar</button>
                        </div>
                        {/* <button className="button" type="submit"> Cadastrar </button> */}
                    </form>
                    <ToastContainer />

                </div>
            </div>
        </>
    )
}

export default SignUp
