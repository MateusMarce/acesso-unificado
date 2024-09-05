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

import LogoSatc from '../../assets/images/baloes.png' 
import Logoavatar from '../../assets/images/avat_jota.jpg'
import ico_aniver from '../../assets/images/ico_aniver2.png'
import validateRequest from "../../helpers/validateRequest"
import Dash_Exames from "../../components/Dash_Exames"
// import ico_aniver from '../../assets/images/ico_aniver.webm' 

export default function Dashboard() {
    const [cookies, setCookies, removeCookie] = useCookies(['user', 'image', 'login', 'theme', 'exames'])
    const [acessos, setAcessos] = useState([] as AcessosCardType[])
    const [dep, setDep] = useState([] as DependentesType[])
    const {mode, setMode} = useTheme()
    const [exames, setExames] = useState<boolean>(cookies.exames || false)

    const getCards = async () => {
        try {
            let res = await api.get('/user/acessos')
            setAcessos(res.data)
        } catch (error:any) {
            removeCookie('login')
            removeCookie('user')
            toast.error('Sua sessão expirou.', {autoClose:2000,theme:cookies.theme==='light'?'light':'dark'})
            window.location.href = '/acesso-unificado/#/'
        }
    }

    const handleExame = async (i_usuario:string = cookies.user.id, i_empresa:number = 1, anotacoes:string = '') => {
        try {
            if(anotacoes == '' || exames){
                let res = await api.get(`/user/exames/${i_usuario}/${i_empresa}`)
                if(!res.data.exame){
                    setExames(true)
                    setCookies('exames', true)
                }
                validateRequest(res)
                return res.data
            } else {
                console.log(anotacoes);
                let res = await api.post(`/user/createagendamento`, {anotacoes})
                validateRequest(res)
                setExames(false)
                removeCookie('exames')
            }
        } catch (error) {
            validateRequest(error)
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
                    await handleExame(res.data.id)
                    
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
                {exames ?
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
                                            {/* DEPENDENTES CAPA */}
                                            <div className="col-xxl-6 mb-5 mb-xl-10 depCapa depMin">
                                                {dep.length > 0 && 
                                                <div className="card mb-5">
                                                    <div className="card-header border-0">
                                                        <div className="card-title m-0">
                                                            <h3 className="fw-bold m-0">Dependentes</h3>
                                                        </div>
                                                    </div>
                                                    <div className="card-body border-top">
                                                        <div className="row">
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
                                                </div>
                                                }
                                                <Dash_Slide />
                                            </div>
                                        </div>

                                        {/*comunicados*/}
                                        {/* <div className="row g-3 g-xxl-12 ori-j">
                                            <div className="col-xxl-4 mb-5 mb-xl-10">
                                                <div className="titulo page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center">Comunicados</div>
                                                <div className="box">
                                                    <div className="lista">
                                                        <ul>
                                                            <li>
                                                                <a href="" className="naolido">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="" className="naolido">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="" className="naolido">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-4 mb-5 mb-xl-10">
                                                <div className="titulo page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center">Eventos</div>
                                                <div className="box">
                                                    <div className="lista">
                                                        <ul>
                                                            <li>
                                                                <a href="" className="naolido2">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="" className="naolido2">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    <span>
                                                                        <h1>Reunião de pais</h1>
                                                                        <h2 className="text-gray-800">Hoje, a partir das 18h30 terrenos...</h2>
                                                                    </span>
                                                                    <span>
                                                                        <h3>sex 23/02</h3>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-4 mb-5 mb-xl-10">
                                                <div className="titulo page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center">Aniversariantes</div>
                                                <div className="box">
                                                    <span className="baloes"><img alt="Logo" src={LogoSatc} /></span>
                                                    <div className="lista aniver">
                                                        <ul>
                                                            <li>
                                                                <span className="hoje">Hoje</span>
                                                                <img src={ico_aniver} className="ico" />
                                                                <span className="data-hoje">01 Mar 2024</span>
                                                            </li>

                                                            <li className="parabens">
                                                                <span className="bolo">•</span>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>
                                                            <li className="parabens">
                                                                <span className="bolo">•</span>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>
                                                            <li className="parabens">
                                                                <span className="bolo">•</span>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>

                                                            <li className="separa-dia">
                                                                <span className="dia color-1">Amanhã</span>
                                                                <span className="data text-gray-600">02 Mar 2024</span>
                                                            </li>

                                                            <li>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>
                                                            <li>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>

                                                            <li className="separa-dia">
                                                                <span className="dia color-2">Domingo</span>
                                                                <span className="data text-gray-600">03 Mar 2024</span>
                                                            </li>

                                                            <li>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>
                                                            <li>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>
                                                            <li>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>
                                                            <li>
                                                                <span className="foto avatarComuniki round-container w-30px h-30px"><img src={Logoavatar} /></span>
                                                                <span className="nome text-gray-800">João Carlos Braga Rodrigues</span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* fim ori */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Dash_Exames onSubmit={(t:string)=>handleExame(cookies.user.id, 1, t)} />
                }
            </div>
            <Dash_Footer />
		</div>
    )
}