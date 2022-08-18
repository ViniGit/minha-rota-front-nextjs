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
            <div className={styles['register-container']}>
                <div className={styles.content}>
                    <section>
                        <h1> Cadastro </h1>
                        <p> Faça seu cadastro, entre na plataforma e comece a administrar suas rotas!</p>
                        <a className="back-link" href="/">
                            <FiArrowLeft size={16} color="#e02041" />
                            Já possui cadastro?
                        </a>
                    </section>
                    <form onSubmit={formik.handleSubmit}>
                        <input id="name" placeholder="Nome" type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.name && formik.errors.name ? <p className={styles['error-label']}>{formik.errors.name}</p> : null}


                        <input id="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? <p className={styles['error-label']}>{formik.errors.email}</p> : null}


                        <input id="cpf" type="text" maxLength={18} placeholder="CPF/CNPJ" value={mask(formik.values.cpf)} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.cpf && formik.errors.cpf ? <p className={styles['error-label']}>{formik.errors.cpf}</p> : null}

                        <InputMask
                            id='cell'
                            mask="(99) 99999-9999"
                            placeholder="Celular"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleChange}
                            value={formik.values.cell}
                        />
                        {formik.touched.cell && formik.errors.cell ? <p className={styles['error-label']}>{formik.errors.cell}</p> : null}


                        <InputMask
                            id='date'
                            type="text"
                            mask="99/99/9999"
                            placeholder="Data de Nascimento"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                        />
                        {formik.touched.date && formik.errors.date ? <p className={styles['error-label']}>{formik.errors.date}</p> : null}


                        {/* <DatePicker  selected={new Date} onChange={formik.handleChange} value={formik.values.date}  />


                        {/* <DatePickerField
                            name="date"
                            value={date}
                            onChange={date}
                        /> */}

                        {/* <input type="date" id="date" placeholder="Data" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.date && formik.errors.date ? <p className={styles['error-label']}>{formik.errors.date}</p> : null} */}

                        <input type="password" id="password" placeholder="Senha" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.password && formik.errors.password ? <p className={styles['error-label']}>{formik.errors.password}</p> : null}

                        <input type="password" id="confirmPassword" placeholder="Confirmar senha" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className={styles['error-label']}>{formik.errors.confirmPassword}</p> : null}


                        <button className="button" type="submit"> Cadastrar </button>
                    </form>
                    <ToastContainer />

                </div>
            </div>
        </>
    )
}

export default SignUp
