import Head from 'next/head'
import { useContext, useState } from 'react'
import { Authcontext } from '../contexts/AuthContext'
import { withSSRGuest } from '../utils/withSSRGuest'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ForgotPassword from '../components/modals/ForgotPassword'
import * as Dialog from '@radix-ui/react-dialog'

export default function Login() {
  const [open, setOpen] = useState(false)

  function openModal() {
    setOpen(!open)
  }

  const { signIn } = useContext(Authcontext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Enrereço de e-mail inválido!').required('Campo Obrigatorio'),
      password: Yup.string().required('Senha é obrigatória!'),
    }),
    onSubmit: async (values) => {

      const data = {
        email: values.email,
        password: values.password,
      }
      signIn(data)

    },
  })
  return (
    <>
      <Head>
        <title>Login | Minha Rota</title>
      </Head>
      <div className="flex items-center min-h-screen bg-gray-900 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <p className="text-gray-500 dark:text-gray-400">Entre para acessar sua conta</p>
            </div>
            <div className="m-7">
              <form onSubmit={formik.handleSubmit} className="form-dark">
                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">E-mail</label>
                  <input type="email" name="email" id="email" placeholder="Ex. joaodasilva@gmail.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="teste w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                  {formik.touched.email && formik.errors.email ? <p className="text-red-500 py-2">{formik.errors.email}</p> : null}
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Senha</label>

                    {/* <button type="button" onClick={openModal} className="text-sm text-gray-400 focus:outline-none focus:text-red-500 hover:text-red-500 dark:hover:text-red-300">Esqueceu sua senha?</button> */}
                  </div>
                  <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                  {formik.touched.password && formik.errors.password ? <p className="text-red-500 py-2">{formik.errors.password}</p> : null}
                </div>
                <div className="mb-6">
                  <button type="submit" className="w-full px-3 py-4 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Entrar</button>
                </div>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                  <Dialog.Trigger title="Editar" className="flex justify-between mb-3">
                    <div className='flex items-center gap-2'>
                      <p className='text-sm text-gray-400 focus:outline-none focus:text-red-500 hover:text-red-500 dark:hover:text-red-300'>Esqueceu sua senha?</p>
                    </div>
                  </Dialog.Trigger>
                  <ForgotPassword open={open} setOpen={setOpen} />
                </Dialog.Root>
                <p className="text-sm text-center text-gray-400">Não possui acesso? <a href="/sign-up" className="text-red-400 focus:outline-none focus:underline focus:text-red-500 dark:focus:border-red-800">Cadastre-se</a>.</p>
              </form>
            </div>
          </div>
        </div>
        {/* {open && <ForgotPassword></ForgotPassword>} */}

      </div>
      <ToastContainer />

    </>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})