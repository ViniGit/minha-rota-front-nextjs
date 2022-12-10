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
import VehicleModel from '../../../models/VehicleModel'
import { VehicleContext } from '../../../contexts/Table/vehicle'
import DatePicker, { registerLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
import MaskedInput from 'react-maskedinput'
registerLocale('ptBR', ptBR)


interface propsModal {
    travel?: {
        id?: string
        description?: string
        travels?: number
        user_id?: string
        route?: string
        vehicle?: string
        date?: Date
    },
    open: Boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function textTransform(type: string) {
    switch (type) {
        case 'microbus':
            return 'Micro ônibus'
        case 'bus':
            return 'Ônibus'
        case 'van':
            return 'Van'
        case 'minivan':
            return 'Mini van'

        default:
            break;
    }
}

export default function TravelModal({ travel, open, setOpen }: propsModal) {
    const { search, routes } = useContext(RouteContext)
    const { vehicles } = useContext(VehicleContext)
    const [startDate, setStartDate] = useState(new Date())

    async function handleCreate(data: RouteModel) {
        try {
            await api.post(`/travel`, data).then(response => {
                if (response.status === 201) {
                    ToastifySuccess('Viagem registrada!')
                    search({ pageR: 0, take: 5 })
                    setOpen(false)
                    formik.resetForm()
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
            await api.put(`/travel/${data.id}`, data).then(response => {
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


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            description: travel?.description,
            travels: travel?.travels,
            route: travel?.route,
            vehicle: travel?.vehicle,
            date: '',
        },
        validationSchema: Yup.object({
            // destination: Yup.string()
            //     .max(50, 'Nome deve ter no máximo 20 caracteres.')
            //     .min(5, 'Nome deve ter no minimo 5 caracteres.')
            //     .required('Campo Obrigatório'),
            vehicle: Yup.string().required('Veículo é obrigatório'),
            route: Yup.string().required('Trajeto é obrigatório'),
            travels: Yup.number().required('Qtd. de viagens é obrigatório'),
            // date: Yup.string().required('Data obrigatória'),
        }),
        onSubmit: (values) => {
            // values.price = values.price.toString().replace(",", ".")
            if(!startDate) return 

            let data = {
                description: values.description,
                travels: Number(values.travels),
                route: values.route,
                vehicle: values.vehicle,
                date: startDate.toISOString()
            }

            console.log(data)

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
                            Registro de Viagens
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
                                            Trajeto<span className='text-red-500'>*</span>
                                        </label>

                                        <select
                                            id="route"
                                            value={formik.values.route}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full px-4 py-5 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                        >
                                            <option value='' label='Selecione um Trajeto'></option>
                                            {routes && routes.map((route, index) => {
                                                return <option key={route.id} value={route.id}>{route.destination}</option>
                                            })}

                                        </select>
                                        {formik.touched.route && formik.errors.route ? <p className='text-red-500 text-xs mt-2'>{formik.errors.route}</p> : null}

                                    </div>

                                    <div className="relative w-full mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Veiculo<span className='text-red-500'>*</span>
                                        </label>

                                        <select
                                            id="vehicle"
                                            value={formik.values.vehicle}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full px-4 py-5 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                        >
                                            <option value='' label='Selecione um Trajeto'></option>
                                            {vehicles && vehicles.map((vehicle, index) => {
                                                return <option key={vehicle.id} value={vehicle.id}>{textTransform(vehicle.type)} - {vehicle.plate} </option>
                                            })}

                                        </select>
                                        {formik.touched.vehicle && formik.errors.vehicle ? <p className='text-red-500 text-xs mt-2'>{formik.errors.vehicle}</p> : null}

                                    </div>

                                </div>
                                <div className='flex gap-3'>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Quantidade de viagens realizadas<span className='text-red-500'>*</span>
                                        </label>

                                        <div className='flex gap-8 m-2'>
                                            <label className='flex gap-3 items-center'>
                                                <input id="travels" type="radio" name='travels' value={1} checked={formik.values.travels == 1} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                1
                                            </label>
                                            <label className='flex gap-3 items-center'>
                                                <input id="travels" type="radio" name='travels' value={2} checked={formik.values.travels == 2} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                2
                                            </label>
                                            <label className='flex gap-3 items-center'>
                                                <input id="travels" type="radio" name='travels' value={4} checked={formik.values.travels == 4} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                4
                                            </label>
                                            <label className='flex gap-3 items-center'>
                                                <input id="travels" type="radio" name='travels' value={6} checked={formik.values.travels == 6} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                6
                                            </label>
                                        </div>
                                        {formik.touched.travels && formik.errors.travels ? <p className='text-red-500 text-xs mt-2'>{formik.errors.travels}</p> : null}



                                    </div>
                                    <div className="relative w-full mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Data <span className='text-red-500'>*</span>
                                        </label>

                                        <DatePicker
                                            id="date"
                                            className='input-mask w-full px-3 py-2 placeholder-gray-700 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300 dark:bg-white dark:text-gray-700 dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                                            locale={ptBR}
                                            selected={startDate}
                                            onChange={(date: Date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={
                                                <MaskedInput mask="11/11/1111" placeholder="dd/mm/yyyy" />
                                            }
                                        />
                                        { !startDate ? <p className='text-red-500 text-xs mt-2'>Data é obrigatória!</p> : null}

                                    </div>
                                </div>

                                <div className='flex gap-3'>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Descrição
                                        </label>
                                        <textarea
                                            id="description"
                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
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