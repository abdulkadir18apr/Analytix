import { toast } from "react-toastify"

export const notify=(msg,type)=>{
    toast[type](msg);
}