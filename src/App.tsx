import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import api from "./services/api";


export default function App() {

    return (
        <>
            <Outlet />
        </>
    )
}