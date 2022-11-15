import { ToastContainer } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api } from '../../../services/apiClient'
import { ToastifySuccess } from '../../../toastify/toastify-succes'
import { ToastifyError } from '../../../toastify/toastify-error'
import { VehicleContext } from '../../../contexts/Table/vehicle'
import VehicleModel from '../../../models/VehicleModel'

interface propsModal {
    vehicle?: MyFormValues,
    open: Boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface MyFormValues {
    id?: string
    plate?: string
    type?: string
    km_per_lt?: number
}


export default function VehicleModal({ vehicle, open, setOpen }: propsModal) {
    const { search } = useContext(VehicleContext)


    async function handleCreate(data: VehicleModel) {
        try {
            await api.post(`/vehicle`, data).then(response => {
                if (response.status === 201) {
                    ToastifySuccess('Veículo cadastrado!')
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

    async function handleUpdate(data: VehicleModel) {
        console.log(data)
        try {
            await api.put(`/vehicle/${data.id}`, data).then(response => {
                if (response.status === 201) {
                    ToastifySuccess('Veículo Atualizado!')
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


    async function handleSubmit(data: VehicleModel) {
        if (data?.id) {
            // is update
            handleUpdate(data)
        } else {
            //is create
            handleCreate(data)
        }
    }

    // const initialValues: MyFormValues = { plate: '', type: '', km_per_lt: 0.0 }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            plate: vehicle?.plate || '',
            type: vehicle?.type || '',
            km_per_lt: vehicle?.km_per_lt || '',
        },
        validationSchema: Yup.object({
            plate: Yup.string()
                .min(5, 'Nome deve ter no minimo 5 caracteres.')
                .required('Campo Obrigatório'),
            type: Yup.string().required('Campo obrigatório'),
            km_per_lt: Yup.number().required('Campo obrigatório')
        }),
        onSubmit: (values) => {

            let data = {
                plate: values.plate,
                type: values.type,
                km_per_lt: Number(values.km_per_lt),
                id: vehicle?.id
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
                                            Placa <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            id="plate"
                                            type="text"
                                            // placeholder="Fazenda Berrante"
                                            className="w-full px-2 py-2 placeholder-gray-100 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.plate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.plate && formik.errors.plate ? <p className='text-red-500 text-xs mt-2'>{formik.errors.plate}</p> : null}

                                    </div>

                                    <div className="relative w-full mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Tipo<span className='text-red-500'>*</span>
                                        </label>
                                        {/* <input
                                            id="type"
                                            type="text"
                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.type}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        /> */}


                                        <select
                                            id="type"
                                            name="type"
                                            value={formik.values.type}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full px-4 py-5 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                        >
                                            <option value="" label="Selecione o tipo">
                                            </option>

                                            <option value="microbus" label="Micro ônibus">
                                            </option>

                                            <option value="bus" label="Ônibus">
                                            </option>

                                            <option value="van" label="Van">
                                            </option>

                                            <option value="minivan" label="Mini van">
                                            </option>

                                        </select>
                                        {formik.touched.type && formik.errors.type ? <p className='text-red-500 text-xs mt-2'>{formik.errors.type}</p> : null}

                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <div className="relative w-[50%] mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Quilômetro por Litro<span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            id="km_per_lt"
                                            type="number"
                                            className="w-full px-2 py-2 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.km_per_lt}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                        {formik.touched.km_per_lt && formik.errors.km_per_lt ? <p className='text-red-500 text-xs mt-2'>{formik.errors.km_per_lt}</p> : null}


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