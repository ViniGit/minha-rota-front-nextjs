import styles from '../styles/sign-up.module.scss'

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
import { formatData } from '../utils/DataToYYYYMMDD'


const SignUp: NextPage = () => {

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
            date: Yup.string().required('Campo Obrigatorio'),
            cpf: Yup.string().required('Campo Obrigatorio'),
            password: Yup.string().required('Senha é obrigatória!'),
            confirmPassword: Yup.string().required('Confirmação de senha é obrigatório!')
                .oneOf([Yup.ref('password'), null], 'As senhas não se correspondem!')
        }),
        onSubmit: async (values) => {
            // console.log(values.date)

            const data = {
                name: values.name,
                email: values.email,
                password: values.password,
                cpf: removeMask(values.cpf),
                cell: values.cell,
                birth_date: formatData(values.date)
            }

            console.log(data)

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
            <div className="bg-gray-900 m-20 rounded-lg">
                <div className="flex p-20">
                    <section className="flex-auto w-3/6	m-auto">
                        {/* <h1 className="text-white text-xl"> Cadastro </h1> */}
                        <p className="text-white text-xl"> Faça seu cadastro, entre na plataforma e comece a administrar suas rotas!</p>
                        <a className="back-link" href="/">
                            <FiArrowLeft size={16} color="#e02041" />
                            <p className="text-base text-white">Já possui cadastro?</p>
                        </a>
                    </section>
                    <form className="flex-auto w-3/6" onSubmit={formik.handleSubmit}>

                        <div className="m-4">
                            <input id="name" placeholder="Nome" type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.name && formik.errors.name ? <p className={styles['error-label']}>{formik.errors.name}</p> : null}
                        </div>

                        <div className="m-4">
                            <input id="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.email && formik.errors.email ? <p className={styles['error-label']}>{formik.errors.email}</p> : null}
                        </div>


                        <div className="m-4">
                            <input id="cpf" type="text" maxLength={18} placeholder="CPF/CNPJ" value={mask(formik.values.cpf)} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.cpf && formik.errors.cpf ? <p className={styles['error-label']}>{formik.errors.cpf}</p> : null}
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
                            {formik.touched.cell && formik.errors.cell ? <p className={styles['error-label']}>{formik.errors.cell}</p> : null}
                        </div>

                        <div className="m-4">

                            <InputMask
                                id='date'
                                type="text"
                                mask="99/99/9999"
                                placeholder="Data de Nascimento"
                                onChange={formik.handleChange}
                                value={formik.values.date}
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                            />
                            {formik.touched.date && formik.errors.date ? <p className={styles['error-label']}>{formik.errors.date}</p> : null}
                        </div>


                        <div className="m-4">
                            <input type="password" id="password" placeholder="Senha" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.password && formik.errors.password ? <p className={styles['error-label']}>{formik.errors.password}</p> : null}
                        </div>

                        <div className="m-4">
                            <input type="password" id="confirmPassword" placeholder="Confirmar senha" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className={styles['error-label']}>{formik.errors.confirmPassword}</p> : null}
                        </div>

                        <div className="m-4 ">
                            <button type="submit" className="w-full px-3 py-4 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Cadastrar</button>
                        </div>
                        {/* <button className="button" type="submit"> Cadastrar </button> */}
                    </form>
                    <ToastContainer />

                </div>
            </div>

            {/* <div className="min-h-screen p-6 bg-gray-800 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <h1 className="font-medium text-lg"> Cadastro </h1>
                                    <p> Faça seu cadastro, entre na plataforma e comece a administrar suas rotas!</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label className='text-base'>E-mail</label>
                                            <input type="email" name="email" id="email" placeholder="Ex. joaodasilva@gmail.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {formik.touched.email && formik.errors.email ? <p className="text-red-500 py-2">{formik.errors.email}</p> : null}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Address / Street</label>
                                            <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">City</label>
                                            <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Country / region</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                                                <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">State / province</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                                                <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <div className="inline-flex items-center">
                                                <input type="checkbox" name="billing_same" id="billing_same" className="htmlForm-checkbox" />
                                                <label htmlFor="billing_same" className="ml-2">My billing address is different than above.</label>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="soda">How many soda pops?</label>
                                            <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <button className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                    </svg>
                                                </button>
                                                <input name="soda" id="soda" placeholder="0" className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" value="0" />
                                                <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>


                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default SignUp
