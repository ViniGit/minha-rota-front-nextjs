
import type { NextPage } from 'next'
import Head from 'next/head'
import { MdAddCircleOutline } from 'react-icons/md'

import { ToastContainer } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'

import Admin from "."
import { useState } from 'react'

export default function Routes() {

    const [open, setOpen] = useState(false)

    function handleOpenModalCreate() {
        console.log('create')
        setOpen(!open)
    }



    return (
        < >
            <Head>
                <title>Trajetos | Minha Rota</title>
            </Head>
            <div className="p-8 w-full">
                <div className='p-8 w-full content-center'>
                    <div className=" relative m-2 flex w-11/12 justify-end mx-auto mb-5">
                        <button onClick={handleOpenModalCreate} type="submit" className="px-3 py-2 text-white text-base font-semibold bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">
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
                                <h6 className="text-blueGray-700 text-2xl font-light text-dark ml-2">Trajetos</h6>


                                {/* <button
                                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Configurações
                            </button> */}
                            </div>
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
                                            onSubmit={async () => {
                                                console.log('submit')
                                            }}
                                        >
                                            <div className="w-full gap-2 m-2">
                                                <div className='flex gap-3'>
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block text-lg font-thin mb-2 text-gray-400"
                                                            htmlFor="grid-password"
                                                        >
                                                            Destinatário <span className='text-red-500'>*</span>
                                                        </label>
                                                        <input
                                                            id="destination"
                                                            type="text"
                                                            placeholder="Fazenda Berrante"
                                                            className="w-full px-2 py-2 placeholder-gray-100 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                                        // // value={formik.values.name}
                                                        // onChange={formik.handleChange}
                                                        // onBlur={formik.handleBlur}
                                                        />
                                                        {/* {formik.touched.name && formik.errors.name ? <p className='text-red-500 text-xs mt-2'>{formik.errors.name}</p> : null} */}

                                                    </div>

                                                    <div className="relative w-full mb-3">

                                                        <label
                                                            className="block text-lg font-thin mb-2 text-gray-400"
                                                            htmlFor="grid-password"
                                                        >
                                                            Distância (km) <span className='text-red-500'>*</span>
                                                        </label>
                                                        <input
                                                            id="distance"
                                                            type="number"
                                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                                        // // value={formik.values.name}
                                                        // onChange={formik.handleChange}
                                                        // onBlur={formik.handleBlur}
                                                        />
                                                        {/* {formik.touched.name && formik.errors.name ? <p className='text-red-500 text-xs mt-2'>{formik.errors.name}</p> : null} */}

                                                    </div>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <div className="relative w-[50%] mb-3">

                                                        <label
                                                            className="block text-lg font-thin mb-2 text-gray-400"
                                                            htmlFor="grid-password"
                                                        >
                                                            Preço (km) <span className='text-red-500'>*</span>
                                                        </label>
                                                        <input
                                                            id="price"
                                                            type="number"
                                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                                        // // value={formik.values.name}
                                                        // onChange={formik.handleChange}
                                                        // onBlur={formik.handleBlur}
                                                        />
                                                        {/* {formik.touched.name && formik.errors.name ? <p className='text-red-500 text-xs mt-2'>{formik.errors.name}</p> : null} */}

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
            </div>
        </>
    )
}

Routes.layout = Admin

