import { useContext } from "react"
import AuthContext from "../contextApi/authContext"


export const UseAuth = () => {
    return useContext(AuthContext)
}