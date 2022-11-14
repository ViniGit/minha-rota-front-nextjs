import * as Dialog from '@radix-ui/react-dialog'
import { useFormik } from 'formik'
import { data } from 'jquery'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import { api } from '../../services/apiClient'
import { ToastifyError } from '../../toastify/toastify-error'
import { ToastifySuccess } from '../../toastify/toastify-succes'
import { ToastifyWarn } from '../../toastify/toastify-warn'


type Props = {
    openModal: boolean
}

interface sendRequest {
    email: string
}


interface propsModal {
    open: Boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ForgotPassword({ open, setOpen }: propsModal) {

    // const [open, setOpen] = useState(true)

    // useEffect(() => {
    //     const setModal = async () => {
    //         setOpen(openModal)
    //     }
    //     setModal()
    // }, [open])


    function handleSubmit(data: sendRequest) {
        try {
            api.post('/password/forgot', data).then(response => {
                ToastifySuccess('E-mail enviado, confira sua caixa de entrada.')
                setTimeout(() => {
                    setOpen(false)
                }, 4000)
            }).catch((err) => {
                console.log(err)

                return ToastifySuccess(err.response.data)
            })
        } catch (error) {
            console.warn(error)
        }
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enrereço de e-mail inválido!').required('Campo Obrigatório')
        }),
        onSubmit: (values) => {
            let data = {
                email: values.email
            }
            handleSubmit(data)
        },
    })


    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/60 inset-0 fixed '>
                    <Dialog.Content className='bg-white fixed text-dark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[700px] px-10 py-8 shadow-black/25'>
                        <Dialog.Title className='text-xl'>
                            Recuperação de senha
                        </Dialog.Title>
                        <form
                            className='p-2'
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="w-full gap-2 m-2">
                                <div className='flex gap-3'>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Email <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="text"
                                            // placeholder="Fazenda Berrante"
                                            className="w-full px-2 py-2 placeholder-gray-100 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.email && formik.errors.email ? <p className='text-red-500 text-xs mt-2'>{formik.errors.email}</p> : null}

                                    </div>
                                </div>
                            </div>
                            {/** some inputs */}
                            <div className='flex gap-2 justify-end'>
                                <Dialog.Close className="px-3 py-2 text-white text-base font-semibold bg-red-400 rounded-md focus:bg-red-500 focus:outline-none">
                                    <p className='font-semibold' >Cancelar</p>
                                </Dialog.Close>
                                <button type="submit" className="px-3 py-2 text-white text-base font-semibold bg-green-500 rounded-md focus:bg-green-600 focus:outline-none">
                                    <p className='font-semibold' >Enviar</p>
                                </button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </>
    )
}

