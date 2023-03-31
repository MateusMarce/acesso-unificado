import Dash_Header from "../../components/Header"
import Dash_HeaderSecondary from "../../components/HeaderSecondary"

import Dash_Footer from "../../components/Dash_Footer"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { AcessosCardType, ComunicadosType, DependentesType, RamaisType } from "../../assets/types/type"
import Comunicados_Modal from "../../components/Comunicados_Modal"

export default function Comunicados() {
    const [comunicados, setComunicados] = useState([] as ComunicadosType[])
    const [item, setItem] = useState({} as ComunicadosType)
    const [cookie, setCookie, removeCookie] = useCookies(['comunicados'])
    
    const getCom = async()=>{
        try {
            let res = await api.get('/user/comunicados')
            let res2 = await api.get('/user/leitura-comunicado')
            setComunicados(res.data)
            setCookie('comunicados', res2.data)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        // GET LISTA COMUNICADOS
        (async () => {
            getCom()
        })()

    },[])
    
    const handleOpen = async (item:ComunicadosType) => {
        setItem(item)
        try {
            if(item.leitura === 'N'){
                await api.post('/user/leitura-comunicado', {
                    id_comunicado:item.id
                })
            }
        } catch (error) {
            
        }
        getCom()
    }

    return (
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
                            
                                <div id="kt_app_toolbar" className="app-toolbar  py-3 py-lg-6 ">
                                    <div className="d-flex flex-grow-1 flex-stack flex-wrap gap-2 mb-n10" id="kt_toolbar">
                                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3 ">
                                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">Lista de Comunicados</h1>
                                            {/* <ol className="breadcrumb breadcrumb-separatorless text-muted fs-6 fw-semibold pt-lg-3">
                                                <li className="breadcrumb-item text-muted">Total de Ramais:</li>
                                                <li className="breadcrumb-item"><span className="text-primary">213</span></li>
                                            </ol> */}
                                        </div>
                                        <h5 className="m-0 text-gray-500 fw-light">Quantidade: {comunicados.length}</h5>
                                    </div>
                                </div>

                                <div id="kt_app_content" className="app-content flex-column-fluid ">

                                    {comunicados && comunicados.map((i, k) => {
                                        let [y, m, d]:string[] = i.dt_publicacao?.split(' ')[0].split('-')
                                        let date = `${d}/${m}/${y}`

                                        return (
                                            <div 
                                                key={k} 
                                                className={`card mb-6 mb-xl-9  ${i.leitura === 'S' ? '' : 'border-bottom border-bottom-2 border-danger'}`} 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#modalComunicados"
                                                onClick={()=>handleOpen(i)}
                                            >     
                                                <div className="btn btn-light card-body py-6">
                                                    <div className="d-flex flex-column flex-xl-row">
                                                        <div className="flex-lg-row-fluid mb-10 mb-xl-0">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex flex-column">
                                                                    <small className="text-start">{date} | {i.usuario}</small>
                                                                    <h2 className="text-start">{i.titulo}</h2>
                                                                </div>
                                                                    {i.leitura === 'S' ?
                                                                        <small>Abrir comunicado</small>
                                                                        :
                                                                        <div>
                                                                            <i className="bi bi-exclamation-circle fs-2 text-danger me-1"></i>
                                                                            <small className="text-danger">Novo comunicado</small>
                                                                        </div>
                                                                    }
                                                            </div>
                                                        </div>  
                                                    </div>       
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dash_Footer />
            <Comunicados_Modal item={item} />
        </div>
    )
}