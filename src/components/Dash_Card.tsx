
import { AcessosCardType } from "../assets/types/type"
import api from "../services/api"

type Function = {
    item: AcessosCardType
    k:number
}



export default function Dash_Card({item, k}:Function) {

    const handleOpenLink = async (link:string, acesso:string) => {
        console.log(link);
        
        try {
            if(link){
                await api.post('/user/acesso', {
                    logs_acesso:acesso
                })
                window.open(link, '_self')
            }
        } catch (error) {
            
        }
    }
    console.log(window.location);
    

    if(item.dropdown === 'false') {return (
        <div className={`${item.classe} col-J cardAuto-1`}>
            <div className="card card-shadow">
                <div className="card-body p-0">
                    <a onClick={()=>handleOpenLink(item.access_token, item.logs_acesso)} className={`btn btn-active-color-primary p-9 text-start w-100 ${item.background_color}`}>
                        <span className="fig-card">
                            <img src={`${window.location.origin}${window.location.pathname}assets/${item.icone}`} alt="" />
                        </span>
                        <div className="tit-card">
                            <h3>{item.titulo1}</h3>
                            <h4>{item.titulo2}</h4>
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
                    <div className={`btn btn-active-color-primary p-9 text-start w-100 ${item.background_color}`}>
                        <span className="fig-card">
                            <img src={`${window.location.origin}/src/assets/images/${item.icone}`} alt="" />
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