
import { Navigate, useLocation } from "react-router-dom"
import {useSelector} from "react-redux"

export const RequiresAuth=({children})=>{
    let location=useLocation();
    const {isAuthenticated}=useSelector((state=>state.auth));
    return isAuthenticated?children:<Navigate to={"/login"} state={{from:location}}/>
}
