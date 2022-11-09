import Head from 'next/head'
import { useContext, useState } from 'react'
import { FiArrowLeft, FiLogIn } from 'react-icons/fi'
import { Authcontext } from '../../contexts/AuthContext'
import styles from '../styles/login.module.scss'
import { withSSRGuest } from '../../utils/withSSRGuest'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastifySuccess } from '../../toastify/toastify-succes'
import { api } from '../../services/apiClient'
import Router, { useRouter } from 'next/router'
import { ToastifyWarn } from '../../toastify/toastify-warn'
import { ToastifyError } from '../../toastify/toastify-error'
// import ForgotPassword from '../components/modals/ForgotPassword'

interface sendRequest {
  password: string
}

export default function Reset() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function openModal() {
    setOpen(!open)
  }

  function handleSubmit(data: sendRequest) {
    try {
      api.post(`/password/reset?token=${router.query.token}`, data).then(response => {
        ToastifySuccess('Senha Alterada!')
        setTimeout(() => {
          Router.push('/')
        }, 4000)
      }).catch((err) => {
        if (err.response.data.message == 'Token expired!') {
          return ToastifyWarn('Sessão Expirada')
        }
        if (err.response.data.message == 'Token invalid!') {
          return ToastifyWarn('Token Expirado!')
        }

        return ToastifyError('Erro interno do servidor')
      })
    } catch (error) {
      console.warn(error)
    }
  }

  const { signIn } = useContext(Authcontext)
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas não se correspondem!')
    }),
    onSubmit: async (values) => {

      const data = {
        password: values.password
      }

      handleSubmit(data)

    },
  })
  return (
    <>
      <Head>
        <title>Login | Esqueci minha senha</title>
      </Head>
      <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <a className="back-link" href="/">
              <FiArrowLeft size={16} color="#e02041" />
              <p className="text-base text-white">Voltar</p>
            </a>
            <div className="text-center mt-10">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Nova senha</h1>
            </div>
            <div className="m-7">
              <form onSubmit={formik.handleSubmit}>
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">E-mail</label>
                  <input type="email" name="email" id="email" placeholder="Ex. joaodasilva@gmail.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                  {formik.touched.email && formik.errors.email ? <p className="text-red-500 py-2">{formik.errors.email}</p> : null}
                </div> */}

                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Senha</label>
                  <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                  {formik.touched.password && formik.errors.password ? <p className="text-red-500 py-2">{formik.errors.password}</p> : null}
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirmação de senha</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-red-500 py-2">{formik.errors.confirmPassword}</p> : null}
                </div>
                <div className="">
                  <button type="submit" className="w-full px-3 py-4 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <ForgotPassword openModal={open}></ForgotPassword> */}
      </div>
      <ToastContainer />

    </>
  )
}
