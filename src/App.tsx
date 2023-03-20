import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";


export default function App() {
    const [cookies, setCookies, removeCookies] = useCookies(['login'])
    const navigate = useNavigate()

    useEffect(()=>{
        if(!cookies.login) {
            removeCookies('login')
            navigate('/')
        }
    },[cookies])

    return (
        <>
            <Outlet />
        </>
    )
}