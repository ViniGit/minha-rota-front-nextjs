import { toast } from 'react-toastify'

export const ToastifySuccess = (msg: string) => {
    return toast.success(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}