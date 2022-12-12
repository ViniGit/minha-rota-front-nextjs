import { ToastContainer } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api } from '../../../services/apiClient'
import { ToastifySuccess } from '../../../toastify/toastify-succes'
import { ToastifyError } from '../../../toastify/toastify-error'
import ExpenseModel from '../../../models/ExpenseModel'
import CurrencyInput from 'react-currency-input-field'
import { ExpenseContext } from '../../../contexts/Table/expense'
import { RouteContext } from '../../../contexts/Table/route'

interface propsModal {
    expense?: MyFormValues,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface MyFormValues {
    id?: string
    description?: string
    route_id?: string
    type?: string
    value?: number
}

export default function ExpenseModal({ expense, setOpen }: propsModal) {

    const { search } = useContext(ExpenseContext)
    const { routes } = useContext(RouteContext)
    console.log(expense)

    async function handleCreate(data: ExpenseModel) {
        try {
            await api.post(`/expense`, data).then(response => {
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

    async function handleUpdate(data: ExpenseModel) {
        console.log(data)
        try {
            await api.put(`/expense/${data.id}`, data).then(response => {
                if (response.status === 201) {
                    ToastifySuccess('Despesa Atualizado!')
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


    async function handleSubmit(data: ExpenseModel) {
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
            description: expense?.description || '',
            route: expense?.route_id || '',
            type: expense?.type || '',
            value: expense?.value || '',
        },
        validationSchema: Yup.object({
            description: Yup.string()
                .min(5, 'Descrição deve ter no minimo 5 caracteres.')
                .required('Campo Obrigatório'),
            type: Yup.string().required('Campo obrigatório'),
            route: Yup.string().required('Campo obrigatório'),
            value: Yup.string().required('Campo obrigatório')
        }),
        onSubmit: (values) => {

            values.value = values.value.toString().replace(",", ".")

            let data = {
                description: values.description,
                route: values.route,
                type: values.type,
                value: Number(values.value),
                id: expense?.id
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
                            Cadastro de Despesa
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
                                            Descrição <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            id="description"
                                            type="text"
                                            // placeholder="Fazenda Berrante"
                                            className="w-full px-2 py-2 placeholder-gray-100 border border-gray-300 rounded-xl focus:outline-none dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-500 white:border-gray-600"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.description && formik.errors.description ? <p className='text-red-500 text-xs mt-2'>{formik.errors.description}</p> : null}


                                    </div>

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
                                </div>
                                <div className='flex gap-3'>
                                    <div className="relative w-full mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Valor<span className='text-red-500'>*</span>
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
                                            value={formik.values.value}
                                            onBlur={formik.handleBlur}
                                            onValueChange={(value, name) => {
                                                if (!value)
                                                    formik.setFieldValue('value', '')
                                                else
                                                    formik.setFieldValue('value', String(value))
                                            }}
                                        />
                                        {formik.touched.value && formik.errors.value ? <p className='text-red-500 text-xs mt-2'>{formik.errors.value}</p> : null}


                                    </div>
                                    <div className="relative w-full mb-3">

                                        <label
                                            className="block text-lg font-thin mb-2 text-gray-400"
                                            htmlFor="grid-password"
                                        >
                                            Tipo<span className='text-red-500'>*</span>
                                        </label>

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

                                            <option value="mechanics" label="Mecânica">
                                            </option>

                                            <option value="driver" label="Motorista">
                                            </option>

                                            <option value="fuel" label="Combustível">
                                            </option>

                                            <option value="other" label="Outro">
                                            </option>

                                        </select>
                                        {formik.touched.type && formik.errors.type ? <p className='text-red-500 text-xs mt-2'>{formik.errors.type}</p> : null}

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