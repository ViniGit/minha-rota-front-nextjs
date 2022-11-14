import { ToastContainer } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'
import RouteModel from '../../../models/RouteModel'


import { useState, useContext } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RouteContext } from '../../../contexts/Table/route'
import { api } from '../../../services/apiClient'
import { ToastifySuccess } from '../../../toastify/toastify-succes'
import { ToastifyError } from '../../../toastify/toastify-error'
import CurrencyInput from 'react-currency-input-field'
interface propsModal {
    route?: {
        id?: string
        destination?: string
        distance?: number
        price?: number
    },
    open: Boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface MyFormValues {
    id?: string
    destination?: string
    distance?: number
    price?: number
}


export default function RouteModal({ route, open, setOpen }: propsModal) {
    const { search } = useContext(RouteContext)
    const [operation, setOperation] = useState(String)
    const [initial, setInitial] = useState<MyFormValues>()
    const [page, setPage] = useState(1)
    // const [routes, setRoutes] = useState<RouteModel[]>([])
    const [count, setCount] = useState<number>(0)

    async function handleCreate(data: RouteModel) {
        try {
            await api.post(`/route`, data).then(response => {
                if (response.status === 201) {
                    ToastifySuccess('Trajeto cadastrado!')
                    search({ pageR: 0, take: 5 })
                    setOpen(false)
                }
            }).catch((err) => {
                console.log(err)
                if (err.response && err.response.data && err.response.data.message && err.response.data.statusCode == 400)
                    return ToastifyError(err.response.data.message)
                else
                    return ToastifyError('Erro interno do servidor')
            })
        } catch (error) {
            // ToastifyError('Erro interno do servidor')
            console.warn(error)
        }
    }

    async function handleUpdate(data: RouteModel) {
        try {
            await api.put(`/route/${data.id}`, data).then(response => {
                if (response.status === 201) {
                    ToastifySuccess('Trajeto Atualizado!')
                    setOpen(false)
                    search({ pageR: 0, take: 5 })
                }
            }).catch((err) => {
                console.log(err)
                if (err.response && err.response.data && err.response.data.message && err.response.data.statusCode == 400)
                    return ToastifyError(err.response.data.message)
                else
                    return ToastifyError('Erro interno do servidor')
            })
        } catch (error) {
            console.warn(error)
        }
    }


    async function handleSubmit(data: RouteModel) {
        if (data?.id) {
            // is update
            handleUpdate(data)
        } else {
            //is create
            handleCreate(data)
        }
    }

    const initialValues: MyFormValues = { destination: '', distance: 0, price: 0.0 }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            destination: route?.destination || '',
            distance: route?.distance || '',
            price: route?.price || '',
        },
        validationSchema: Yup.object({
            destination: Yup.string()
                .max(50, 'Nome deve ter no máximo 20 caracteres.')
                .min(5, 'Nome deve ter no minimo 5 caracteres.')
                .required('Campo Obrigatório'),
            distance: Yup.number().required('Distância é obrigatória'),
            price: Yup.string().required('Preço é obrigatório')
        }),
        onSubmit: (values) => {

            values.price = values.price.toString().replace(",", ".")

            let data = {
                destination: values.destination,
                distance: values.distance,
                price: Number(values.price),
                id: route?.id
            }
            //@ts-ignore
            handleSubmit(data)
        },
    })

    return (
        <>
            {/**Modal Trajetos */}
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/60 inset-0 fixed '>
                    <Dialog.Content className='bg-white fixed text-dark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[700px] px-10 py-8 shadow-black/25'>
                        <Dialog.Title className='text-xl'>
                            Cadastro de Trajetos
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
                                            Destino <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            id="destination"
                                            type="text"
                                            // placeholder="Fazenda Berrante"
                                            className="w-full px-2 py-2 placeholder-gray-100 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.destination}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.destination && formik.errors.destination ? <p className='text-red-500 text-xs mt-2'>{formik.errors.destination}</p> : null}

                                    </div>

                                    <div className="relative w-full mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Distância (KM) <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            id="distance"
                                            type="number"
                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.distance}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.distance && formik.errors.distance ? <p className='text-red-500 text-xs mt-2'>{formik.errors.distance}</p> : null}

                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <div className="relative w-[50%] mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Preço por quilômetro<span className='text-red-500'>*</span>
                                        </label>

                                        <CurrencyInput
                                            id="price"
                                            name="price"
                                            prefix="R$ "
                                            groupSeparator="."
                                            decimalSeparator=","
                                            defaultValue={1000}
                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            decimalsLimit={2}
                                            value={formik.values.price}
                                            onBlur={formik.handleBlur}
                                            onValueChange={(value, name) => {
                                                // console.log()
                                                if (!value)
                                                    formik.setFieldValue('price', '')
                                                else
                                                    formik.setFieldValue('price', String(value))
                                            }}
                                        />
                                        {formik.touched.price && formik.errors.price ? <p className='text-red-500 text-xs mt-2'>{formik.errors.price}</p> : null}
                                        {/* <input
                                            id="price"
                                            type="number"
                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                         */}

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
            <ToastContainer />
        </>
    )
}