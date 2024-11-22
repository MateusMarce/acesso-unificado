import Dash_Header from "../../components/Header"
import Dash_HeaderSecondary from "../../components/HeaderSecondary"

import Dash_Footer from "../../components/Dash_Footer"
import Dash_Card from "../../components/Dash_Card"
import Dash_Slide from "../../components/Dash_Slide"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { AcessosCardType, AcessosEmpresaCardType, DependentesType } from "../../assets/types/type"
import { toast } from "react-toastify"
import * as Device from 'react-device-detect';
import { useTheme } from "../../helpers/ThemeContext"
import { Perfil_Dependentes } from "../../components/Perfil_Dependentes"
import Carousel from 'react-multi-carousel';

import validateRequest from "../../helpers/validateRequest"
import Dash_Exames from "../../components/Dash_Exames"
import { BASE_URL } from "../../services/url"
// import ico_aniver from '../../assets/images/ico_aniver.webm' 

export default function Dashboard() {
    const [cookies, setCookies, removeCookie] = useCookies(['user', 'image', 'login', 'theme', 'exames'])
    const [acessos, setAcessos] = useState([] as AcessosCardType[])
    const [acessosEmpresa, setAcessosEmpresa] = useState([] as AcessosEmpresaCardType[])
    const [empresa, setEmpresa] = useState({} as AcessosEmpresaCardType)
    // const [dep, setDep] = useState([] as DependentesType[])
    const {mode, setMode} = useTheme()
    const [exames, setExames] = useState<boolean>(cookies.exames || false)
    const [exameModelo, setExameModelo] = useState<boolean>(cookies.exames || false)
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const getCards = async () => {
        try {
            let res = await api.get('/user/acessos')
            setAcessos(res.data)
        } catch (error:any) {
            removeCookie('login')
            removeCookie('user')
            toast.error('Sua sessão expirou.', {autoClose:2000,theme:cookies.theme==='light'?'light':'dark'})
            window.location.href = BASE_URL
        }
    }
    const getEmpresa = async () => {
        try {
            let res = await api.get('/user/acessos-b2b')
            setAcessosEmpresa(res.data)

            setEmpresa(res.data[0])
        } catch (error:any) {
            removeCookie('login')
            removeCookie('user')
            toast.error('Sua sessão expirou.', {autoClose:2000,theme:cookies.theme==='light'?'light':'dark'})
            window.location.href = BASE_URL
        }
    }
    const handleExame = async (i_usuario:string = cookies.user.id, i_empresa:number = 1, anotacoes:string = '') => {
        try {            
            if(anotacoes == '' || !exames){
                let res = await api.get(`/user/exames`)
                if(res.data.exame == true){
                    setExames(true)
                    setExameModelo(res.data.modelo)
                    setCookies('exames', true)
                }
                validateRequest(res)
                return res.data
            } else {
                let res = await api.post(`/user/createagendamento`, {anotacoes})
                validateRequest(res)
                setExames(false)
                removeCookie('exames')
            }
        } catch (error) {
            validateRequest(error)
        }
    }
    const handleChangeEmpresa = (item: string | number) => {
        if(item){   
            setEmpresa(acessosEmpresa.filter(i => i.id_empresa == item)[0])
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

        // (async()=>{
        //     try {
        //         let resDep = await api.get('/user/dependentes')
        //         setDep(resDep.data)
        //     } catch (error) {
        //     }
        // })()
        
        if(cookies.user.b2b == true){
            //GET EMPRESA
            getEmpresa()
        }

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
                {!exames ?
                    <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                        <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
                            <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                                <div className="d-flex flex-column flex-column-fluid">
                                    <div id="kt_app_content" className="app-content flex-column-fluid separaMoldeCards">
                                        <div className="row g-3 g-xxl-12 123">
                                            <div className="col-xxl-6 mb-xxl-10">
                                                <div className="card card-reset mb-5 mb-xl-10">
                                                    <div className="card-body p-0">
                                                        <div className="row g-3 g-lg-3">
                                                            {/* {Device.isFirefox ?
                                                                <div className="card" style={{height:366}}>
                                                                    <div className="card-header text-white d-flex align-items-center gap-4 justify-content-center">
                                                                        <i className="bi bi-exclamation-circle-fill text-gray-800" style={{fontSize:42}}></i>
                                                                        <p className="m-0 fs-1 text-gray-800">
                                                                            Identificamos um problema!
                                                                        </p>
                                                                    </div>
                                                                    <div className="card-body align-items-center d-flex justify-content-center">
                                                                        <div className="fs-4">
                                                                            <p className="text-gray-800 text-center m-0">
                                                                                O acesso aos portais estão indisponíveis no navegador Mozilla Firefox. <br />
                                                                                Estamos trabalhando para encontrar soluções.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <p className="m-0 text-gray-800 text-center fs-4">Pedimos desculpa pelo transtorno.</p>
                                                                    </div>
                                                                </div>
                                                        
                                                            : */}
                                                                <>
                                                                    {/* CARD */}
                                                                    {acessos.map((i:AcessosCardType, k:number)=>(
                                                                        <Dash_Card item={i} k={k} key={k} getCards={()=>getCards()} />
                                                                    ))}
                                                                </>
                                                            {/* } */}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* DEPENDENTES CAPA */}
                                            <div className="col-xxl-6 mb-5 mb-xl-10 depCapa depMin">
                                                {/* {dep.length > 0 && 
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
                                                } */}
                                                <Dash_Slide />
                                            </div>
                                        </div>

                                        {cookies.user?.b2b == true && empresa.id_empresa != 0 &&
                                            <div className="row g-3 g-xxl-12 123">

                                                <div className="col-xxl-12 mb-xxl-12">
                                                    <div className="text-center mb-12">
                                                        <h3 className="fs-2hx text-gray-900 mb-5">Área do Cliente</h3>   
                                                    </div>

                                                    <div className="card">
                                                        <div className="card-body p-lg-10">
                                                            <div className="d-flex flex-stack">
                                                                <div className="d-flex align-items-center me-2">
                                                                    <div className="symbol symbol-50px me-3">
                                                                        <div className="symbol-label bg-light">
                                                                            <i className="bi bi-buildings-fill text-gray-600" style={{fontSize:25}}></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-1">
                                                                        <a href="#" className="fs-1 text-gray-800 text-hover-primary fw-light">{empresa.nome_empresa}</a>
                                                                    </div>
                                                                </div>
                                                                {acessosEmpresa.length > 1 &&
                                                                    <div className="me-4">
                                                                        <select onChange={(v)=>handleChangeEmpresa(v.target.value)} className="form-select" aria-label="Select example">
                                                                            <option value=''>Trocar de Empresa</option>
                                                                            {acessosEmpresa.map((i,k)=>(
                                                                                <option key={k} value={i.id_empresa} disabled={i.id_empresa == empresa.id_empresa}>{i.nome_empresa}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-6 mb-xxl-10">
                                                    <div className="card card-reset mb-5 mb-xl-10">
                                                        <div className="card-body p-0">
                                                            <div className="row g-3 g-lg-3">
                                                                {empresa.acessos?.map((i:any, k:number)=>(
                                                                    <Dash_Card item={i} k={k} key={k} getCards={()=>getCards()} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-6 mb-5 mb-xl-10 depCapa depMin">
                                                    <div className="card mb-5">
                                                        <div className="card-header border-0">
                                                            <div className="card-title m-0">
                                                                <h3 className="fw-bold m-0">Propostas <small className="fw-normal">- Mostrando as últimas 10 propostas</small></h3>
                                                            </div>
                                                        </div>
                                                        <div className="card-body border-top">
                                                            <div className="overflow-auto cardAuto">
                                                                {empresa.propostas?.map((i:any,k:number)=>{
                                                                    let classe = ''
                                                                    switch (i.status) {
                                                                        case 'Fechada':
                                                                            classe = 'danger'
                                                                            break;
                                                                        case 'Ganha':
                                                                            classe = 'success'
                                                                            break;
                                                                        case 'Aberta':
                                                                            classe = 'primary'
                                                                            break;
                                                                        case 'Cancelada':
                                                                            classe = 'danger'
                                                                            break;
                                                                        case 'Suspensa':
                                                                            classe = 'warning'
                                                                            break;
                                                                        case 'Perdida':
                                                                            classe = 'danger'
                                                                            break;
                                                                    
                                                                        default:
                                                                            break;
                                                                    }
                                                                    return(
                                                                    <div className="d-flex align-items-center mb-4">
                                                                        <span className={`bullet bullet-vertical h-40px bg-${classe}`}></span>
                                                                        <span className="fw-light fs-5 mx-5">{k+1}</span>
                                                                        <div className="flex-grow-1">
                                                                            <a href={i.link_proposta} target="_blank" className="text-gray-800 text-hover-primary fw-bold fs-7">{i.produtos}</a>
                                                                            <span className="text-muted fw-semibold d-block fs-7">Tipo: {i.tipo_proposta}</span>
                                                                            <span className="text-muted fw-semibold d-block fs-7">{i.dt_proposta}</span>
                                                                        </div>
                                                                        <span className={`badge badge-light-${classe} fs-8 fw-bold`}>{i.status}</span>
                                                                    </div>
                                                                    )
                                                                })}
                                                                {/* <div className="d-flex align-items-center mb-4">
                                                                    <span className="bullet bullet-vertical h-40px bg-warning"></span>
                                                                    <span className="fw-light fs-5 mx-5">002</span>
                                                                    <div className="flex-grow-1">
                                                                        <a href="#" className="text-gray-800 text-hover-primary fw-bold fs-7">NR-109 In Company</a>
                                                                        <span className="text-muted fw-semibold d-block fs-7">07/10/2024</span>
                                                                    </div>
                                                                    <span className="badge badge-light-warning fs-8 fw-bold">Pendente</span>
                                                                </div>
                                                                <div className="d-flex align-items-center mb-4">
                                                                    <span className="bullet bullet-vertical h-40px bg-danger"></span>
                                                                    <span className="fw-light fs-5 mx-5">003</span>
                                                                    <div className="flex-grow-1">
                                                                        <a href="#" className="text-gray-800 text-hover-primary fw-bold fs-7">NR-109 In Company</a>
                                                                        <span className="text-muted fw-semibold d-block fs-7">07/10/2024</span>
                                                                    </div>
                                                                    <span className="badge badge-light-danger fs-8 fw-bold">Recusada</span>
                                                                </div> */}
                                                            </div>
                                                        </div>    
                                                    </div>   
                                                </div>

                                                {/* <div className="col-xxl-12">
                                                    <div className="text-center mb-12">
                                                        <h3 className="fs-2hx text-gray-900 mb-5">Cursos para sua empresa</h3>        
                                                        <div className="fs-5 text-muted fw-semibold">
                                                            Lorem ipsum dolor sit amet. Vel quia eligendi eum provident quod ea repellat consequuntur.
                                                        </div>   
                                                    </div>
                                                    
                                                    <Carousel responsive={responsive} itemClass="px-3" >
                                                        <div className="card-body p-0 "><button type="button" className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-07 cardButHover"><div className="loading-card"><span className="fig-card">
                                                            <img src="https://storage.satc.edu.br/arquivos/acesso-unificado/icons/ico_colaborador.svg" alt="" />
                                                            </span><div className="tit-card"><h3>portal do</h3><h4>colaborador</h4></div></div></button>
                                                        </div>
                                                        <div className="card-body p-0 "><button type="button" className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-07 cardButHover"><div className="loading-card"><span className="fig-card">
                                                            <img src="https://storage.satc.edu.br/arquivos/acesso-unificado/icons/ico_colaborador.svg" alt="" />
                                                            </span><div className="tit-card"><h3>portal do</h3><h4>colaborador</h4></div></div></button>
                                                        </div>
                                                        <div className="card-body p-0 "><button type="button" className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-07 cardButHover"><div className="loading-card"><span className="fig-card">
                                                            <img src="https://storage.satc.edu.br/arquivos/acesso-unificado/icons/ico_colaborador.svg" alt="" />
                                                            </span><div className="tit-card"><h3>portal do</h3><h4>colaborador</h4></div></div></button>
                                                        </div>
                                                        <div className="card-body p-0 "><button type="button" className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-07 cardButHover"><div className="loading-card"><span className="fig-card">
                                                            <img src="https://storage.satc.edu.br/arquivos/acesso-unificado/icons/ico_colaborador.svg" alt="" />
                                                            </span><div className="tit-card"><h3>portal do</h3><h4>colaborador</h4></div></div></button>
                                                        </div>
                                                    </Carousel>
                                
                                                </div> */}

                                            </div>
                                        }



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
                    <Dash_Exames modelo={exameModelo} onSubmit={(t:string)=>handleExame(cookies.user.id, 1, t)} />
                }
            </div>
            <Dash_Footer />
		</div>
    )
}