
import type { NextPage } from 'next'
import Head from 'next/head'
import { MdAddCircleOutline } from 'react-icons/md'

import { ToastContainer } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'

import Admin from "."
import { useEffect, useState, useContext } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api } from '../../services/apiClient'
import { ToastifySuccess } from '../../toastify/toastify-succes'
import Router from 'next/router'
import { ToastifyError } from '../../toastify/toastify-error'

import RouteModel from '../../models/RouteModel'

import RouteTable from '../../components/table/RouteTable'


import { RouteContext, RouteProvider } from '../../contexts/Table/route'
import { withSSRAuth } from '../../utils/withSSRAuth'
export default function Routes() {

    const { search } = useContext(RouteContext)

    const [open, setOpen] = useState(false)

    const [operation, setOperation] = useState(String)
    const [initial, setInitial] = useState<MyFormValues>()
    const [page, setPage] = useState(1)
    const [routes, setRoutes] = useState<RouteModel[]>([])
    const [count, setCount] = useState<number>(0)

    // useEffect(() => {
    //     const fetchRoutes = async () => {
    //         api.get(`/route`).then((response) => {
    //             setRoutes(response.data.routes)
    //             setCount(response.data.count)
    //         })
    //     }

    //     fetchRoutes()

    // }, [])

    function handleOpenModalCreate() {
        setOpen(!open)
    }
    interface MyFormValues {
        destination: string
        distance: number
        price: number
    }

    async function handleCreate(data: Object) {
        try {
            await api.post(`/route`, data).then(response => {
                if (response.status === 201) {
                    ToastifySuccess('Trajeto cadastrado!')
                    search({ pageR: 0, take: 5 })
                    // setRoutes(oldArray => [...oldArray, response.data])
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

    const initialValues: MyFormValues = { destination: '', distance: 0, price: 0.0 }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            destination: initial?.destination || '',
            distance: initial?.distance || '',
            price: initial?.price || '',
        },
        validationSchema: Yup.object({
            destination: Yup.string()
                .max(50, 'Nome deve ter no máximo 20 caracteres.')
                .min(5, 'Nome deve ter no minimo 5 caracteres.')
                .required('Campo Obrigatório'),
            distance: Yup.number().required('Distância é obrigatória'),
            price: Yup.number().required('Preço é obrigatório')
        }),
        onSubmit: (values) => {

            let data = {
                destination: values.destination,
                distance: values.distance,
                price: values.price,
            }

            handleCreate(data)

        },
    })

    return (
        <RouteProvider>
            <Head>
                <title>Trajetos | Minha Rota</title>
            </Head>
            <div className="p-8 w-full">
                <div className='p-8 w-full content-center'>
                    <div className=" relative m-2 flex w-11/12 justify-end mx-auto mb-5">
                        <button onClick={handleOpenModalCreate} type="submit" className="px-3 py-4 text-white text-base font-semibold bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">
                            <div className='flex items-center  gap-2'>
                                <MdAddCircleOutline
                                    className=" h-5 w-5 text-white"
                                    aria-hidden="true"
                                />
                                <p className='font-semibold' >Cadastrar Trajeto</p>
                            </div></button>
                    </div>
                    <div className="relative flex w-11/12 flex-col min-w-0 break-words mb-6 shadow-lg rounded-xl border-0 bg-dark bg-white mx-auto mt-2">

                        <div className="rounded-t bg-white mb-0 px-6 py-6 mt-3">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-2xl font-semibold text-dark ml-2">Trajetos</h6>

                            </div>
                        </div>

                        {/* <TableRoutes data={routes} ></TableRoutes> */}

                        <RouteTable />

                    </div>
                    {/**Modal Trajetos */}
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger />
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
                                                        Preço por quilômetro (R$) <span className='text-red-500'>*</span>
                                                    </label>
                                                    <input
                                                        id="price"
                                                        type="number"
                                                        className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                                        value={formik.values.price}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.price && formik.errors.price ? <p className='text-red-500 text-xs mt-2'>{formik.errors.price}</p> : null}

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
                    </Dialog.Root>
                    <ToastContainer />
                </div>
            </div>
        </RouteProvider>
    )
}

Routes.layout = Admin

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//     // @ts-ignore
//     const apiClient = setupApiClient(ctx)
//     const response = await apiClient.get('/me')

//     return {
//         props: {}
//     }
// })