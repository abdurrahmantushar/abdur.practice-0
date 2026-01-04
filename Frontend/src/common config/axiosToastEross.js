import { toast } from "react-toastify";

export const AxiosToastError =(error)=>{
    toast.error(
        error.response?.data.message
    )
}