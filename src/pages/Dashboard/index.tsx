import Dash_Header from "../../components/Header"
import Dash_HeaderSecondary from "../../components/HeaderSecondary"

import Dash_Footer from "../../components/Dash_Footer"
import Dash_Card from "../../components/Dash_Card"
import Dash_Slide from "../../components/Dash_Slide"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { AcessosCardType, DependentesType } from "../../assets/types/type"
import { toast } from "react-toastify"
import { useTheme } from "../../helpers/ThemeContext"
import { Perfil_Dependentes } from "../../components/Perfil_Dependentes"

export default function Dashboard() {
    const [cookies, setCookies, removeCookie] = useCookies(['user', 'image', 'login', 'theme'])
    const [acessos, setAcessos] = useState([] as AcessosCardType[])
    const [dep, setDep] = useState([] as DependentesType[])
    const {mode, setMode} = useTheme()

    const getCards = async () => {
        try {
            let res = await api.get('/user/acessos')
            setAcessos(res.data)
        } catch (error:any) {
            // removeCookie('login')
            // removeCookie('user')
            // toast.error('Sua sessão expirou.', {autoClose:2000,theme:cookies.theme==='light'?'light':'dark'})
            // window.location.href = '/acesso-unificado/#/'
        }
    }

    useEffect(()=>{
        // GET USUARIO LOGADO
        if(!cookies.user){
            (async()=>{
                try {
                    let res = await api.get('/user/me')
                    setCookies('user', res.data)
                    setCookies('image', res.data.ocultar_foto === "S" ? 'false' : 'true')
                    setCookies('theme', res.data.tema)
                    document.body.setAttribute('data-theme', res.data.tema)
                    if(setMode) setMode(res.data.tema)
                } catch (error) {
                    
                }
            })()
        }

        (async()=>{
            try {
                let resDep = await api.get('/user/dependentes')
                setDep(resDep.data)
            } catch (error) {
                // removeCookies('login')
                // removeCookies('user')
                // toast.error('Sua sessão expirou.', {autoClose:2000,theme:cookies.theme==='light'?'light':'dark'})
                // window.location.href = '/acesso-unificado/#/'
            }
        })()
        
        // GET CARDS
        getCards()
    },[])
    


    return cookies.user && (
        <div className="d-flex flex-column flex-root app-root h-100" id="kt_app_root" >

            {/* HEADER */}
			<div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <div id="kt_app_header" className="app-header">
                    <Dash_Header />  
                    <Dash_HeaderSecondary />
                </div>
            {/*</div>*/}

                {/* BODY */}
                <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                    <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
                        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                            <div className="d-flex flex-column flex-column-fluid">
                                <div id="kt_app_content" className="app-content flex-column-fluid separaMoldeCards">
                                    <div className="row g-3 g-xxl-12">
                                        <div className="col-xxl-6 mb-xxl-10">
                                            <div className="card card-reset mb-5 mb-xl-10">
                                                <div className="card-body p-0">
                                                    <div className="row g-3 g-lg-3">
                                                        {/* CARD */}
                                                        {acessos.map((i:AcessosCardType, k:number)=>(
                                                            <Dash_Card item={i} k={k} key={k} getCards={()=>getCards()} />
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* SLIDER */}
                                        <div className="col-xxl-6 mb-5 mb-xl-10">
                                            {/* <div className="card mb-5">
                                                <div className="card-header border-0">
                                                    <div className="card-title m-0">
                                                        <h3 className="fw-bold m-0">Dependentes</h3>
                                                    </div>
                                                </div>
                                                <div className="card-body border-top">
                                                    <div className="row mb-6">
                                                        <div className="table-responsive">
                                                            <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                                                                <tbody className="fw-semibold text-gray-600">  
                                                                    {dep.map((i:DependentesType, k)=>(
                                                                        <Perfil_Dependentes key={k} item={i} />
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>    
                                            </div>  */}
                                            <Dash_Slide />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    			</div>
            </div>
            <Dash_Footer />
		</div>
    )
}