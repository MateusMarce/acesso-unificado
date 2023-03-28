import { useState } from "react"
import { AcessosCardType } from "../assets/types/type"
import api from "../services/api"
import Gif from "../assets/images/load_satc.gif"

type Function = {
    item: AcessosCardType
    k:number
    getCards:()=>any
}



export default function Dash_Card({item, k, getCards}:Function) {
    const [loading, setLoading] = useState<boolean>(false)

    const handleOpenLink = async (link:string, acesso:string) => {
        setLoading(true)
        getCards()
        try {
            if(link){
                await api.post('/user/acesso', {
                    logs_acesso:acesso
                })
                window.open(link, '_self')
                
                setTimeout(async()=>{
                    setLoading(false)
                }, 1000)
            }
        } catch (error) {
            
        }
    }
    

    if(item.dropdown === 'false') {return (
        <div className={`${item.classe} col-J cardAuto-1`}>
            <div className="card card-shadow h-100">
                <div className="card-body p-0 ">
                    <a onClick={()=>handleOpenLink(item.access_token, item.logs_acesso)} className={`btn btn-active-color-primary p-11 text-start w-100 ${item.background_color}`}>
                        {loading &&
                            <div className="w-100 start-0 d-flex justify-content-center position-absolute" style={{zIndex:1}}>
                                <img className="w-auto h-100" src={Gif} alt="" />
                            </div>
                        }
                        <div className="loading-card">
                            <span className="fig-card">
                                <img src={item.icone} alt="" />
                            </span>
                            <div className="tit-card">
                                <h3>{item.titulo1}</h3>
                                <h4>{item.titulo2}</h4>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )} else return (
        <div className={`${item.classe} col-J cardAuto-1`}>
            <div className="card card-shadow btn-group dropup">
                {/* <button type="button" className="border-0 rounded card-body p-0" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                    <div className={`btn btn-active-color-primary p-9 text-start w-100 ${item.background_color} cardButHover`}>
                        <span className="fig-card">
                            <img src={ColaboradorSvg} alt="" />
                        </span>
                        <div className="tit-card">
                            <h3>{item.titulo1}</h3>
                            <h4>{item.titulo2}</h4>
                        </div>
                    </div>
                </button> */}
                <button type='button' className="cursor-pointer symbol symbol-35px symbol-md-40px p-0 border-0 outline-0" data-bs-toggle='dropdown' id="dropdownMenuButton1" aria-expanded="true">
                    <div className={`btn btn-active-color-primary p-11 text-start w-100 ${item.background_color}`}>
                        <span className="fig-card">
                            <img src={item.icone}  alt="" />
                        </span>
                        <div className="tit-card">
                            <h3>{item.titulo1}</h3>
                            <h4>{item.titulo2}</h4>
                            {/* <h4>{item.qtde_acessos}</h4> */}
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