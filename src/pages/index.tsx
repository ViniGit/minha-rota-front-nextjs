import Head from 'next/head'
import { useContext, useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Authcontext } from '../contexts/AuthContext'


import styles from '../styles/login.module.scss'
import { withSSRGuest } from '../utils/withSSRGuest'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Login() {

  const { signIn } = useContext(Authcontext)


  // async function handleSubmit(event: FormEvent) {
  //   event.preventDefault()

  //   const data = {
  //     email,
  //     password
  //   }

  //   signIn(data)

  // }

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
      <div className={styles['logon-container']}>
        <div className={styles.login}>
          <section className={styles.form}>
            <form onSubmit={formik.handleSubmit}>
              <h2> Seja bem vindo!</h2>
              <input type="email" id='email' placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email ? <p className={styles['error-label']}>{formik.errors.email}</p> : null}

              <input type="password" id='password' placeholder="Senha" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password && formik.errors.password ? <p className={styles['error-label']}>{formik.errors.password}</p> : null}

              <button className="button" type="submit"> Entrar </button>
              <a className="back-link" href="/sign-up">
                <FiLogIn size={16} color="#e02041" />
                Não tenho cadastro
              </a>
            </form>
          </section>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})