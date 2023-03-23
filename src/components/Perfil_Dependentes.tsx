import { useEffect, useState } from "react"
import { DependentesType } from "../assets/types/type"
import api from "../services/api"


export const Perfil_Dependentes = ({ item }:any) => {
    const [dep, setDep] = useState([] as DependentesType[])

    useEffect(()=>{
        (async () => {
            let res = await api.get('/user/dependentes')
            setDep(res.data)
        })()
    },[])

    return (                
        <tr className="odd">
            <td className="d-flex align-items-center">
                {/* <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                    <a href="#">
                        <div className="symbol-label">
                            <img src="assets/media/avatars/avat_joao-vitor.jpg" alt="João Vitor" className="w-100" />
                        </div>
                    </a>
                </div> */}
                <div className="d-flex flex-column">
                    <a href="#" className="text-gray-800 text-hover-primary mb-1">- {item?.nome}</a>
                    {/* <span>jotavitor50@gmail.com</span> */}
                </div>
            </td>
        </tr>
                            
    )
}