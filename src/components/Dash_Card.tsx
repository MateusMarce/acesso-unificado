import { useState } from "react"
import { AcessosCardType } from "../assets/types/type"
import api from "../services/api"
import validateRequest from "../helpers/validateRequest"
import Cadeado from "../assets/images/ico_bloqueado.png"
import * as Device from 'react-device-detect';

type Function = {
    item: AcessosCardType
    k:number
    getCards:()=>any
}



export default function Dash_Card({item, k, getCards}:Function) {
    const [loading, setLoading] = useState<boolean>(false)

    const handleOpenLink = async (link:string, acesso:string, id_empresa?:string) => {
        
        setLoading(true)
        getCards()
        
        try {
            if(link){
                await api.post('/user/acesso', {
                    logs_acesso:acesso,
                    id_empresa: id_empresa
                })
                if(Device.isFirefox){
                    setTimeout(async()=>{
                        window.open(link, '_self')
                        setLoading(false)
                    }, 1000)
                } else {
                    window.open(link, '_self')
                    setTimeout(async()=>{
                        setLoading(false)
                    }, 1000)
                }
            }
        } catch (error:any) {
            if(error.response.status != 401) validateRequest(error)
        }
    }
    
    if(item.dropdown == 'false' || item.dropdown == false ) {return (

        <div className={`${item.classe} col-J cardAuto-1`}>
            <div className="card card-shadow h-100">
                <div className="card-body p-0 ">
                    <button type="button" onClick={()=>item.access_token != '' && handleOpenLink(item.access_token, item.logs_acesso, item.id_empresa)} style={item.titulo1 != '' ? (item.access_token == "" ? {filter:'saturate(0)', pointerEvents:"none"} : {}) : {pointerEvents:"none"}} className={`btn btn-active-color-primary p-9 text-start w-100 ${item.background_color}`}>
                        {loading && item.titulo1 != '' && 
                            <div className="d-flex justify-content-center" style={{zIndex:1}}>
                                <div className="boxLoading"><span className="loader-18"></span></div>
                            </div>
                        }
                        <div className="loading-card">
                            <span className="fig-card">
                                <img src={item.icone} alt="" />
                            </span>
                            {item.access_token == "" &&
                                <span className="fig-card float-end">
                                    <img src={Cadeado} className="w-40px" alt="" />
                                </span>
                            }
                            <div className="tit-card">
                                <h3>{item.titulo1}</h3>
                                <h4>{item.titulo2}</h4>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

    )} else return (
        <div className={`${item.classe} col-J cardAuto-1`}>
            <div className="card card-shadow btn-group dropup">
                <button type='button' className="cursor-pointer symbol symbol-35px symbol-md-40px p-0 border-0 outline-0" data-bs-toggle='dropdown' id="dropdownMenuButton1" aria-expanded="true">
                    <div className={`btn btn-active-color-primary p-9 text-start w-100 ${item.background_color}`}>
                        <span className="fig-card">
                            <img src={item.icone}  alt="" />
                        </span>
                        <div className="tit-card">
                            <h3>{item.titulo1}</h3>
                            <h4>{item.titulo2}</h4>
                        </div>
                    </div>
                </button>              
                <ul className={`dropdown-menu dropdown-menu-top w-100 h-100 top-100 ${item.background_color}`} aria-labelledby="dropdownMenuButton1">
                    <span>
                    {item.logins?.map((i,k)=>(
                        <li key={k}><a className="dropdown-item cursor-pointer" onClick={()=>handleOpenLink(i.access_token, i.logs_acesso)}>{i.nome_abrev}</a></li>
                    ))}
                    </span>
                </ul>
            </div>
        </div>

    )
}