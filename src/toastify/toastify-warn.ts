import { toast } from 'react-toastify'

export const ToastifyWarn = (msg: string) => {
    return toast.warn(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}