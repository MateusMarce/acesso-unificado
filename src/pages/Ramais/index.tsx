import Dash_Header from "../../components/Header"
import Dash_HeaderSecondary from "../../components/HeaderSecondary"

import Dash_Footer from "../../components/Dash_Footer"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { AcessosCardType, DependentesType, RamaisType } from "../../assets/types/type"

export default function Ramais() {
    const [ramaisLista, setRamaisLista] = useState([] as RamaisType[])
    const [filterList, setFilterList] = useState([] as RamaisType[])

    useEffect(()=>{
        // GET LISTA RAMAIS
        (async()=>{
            try {
                let res = await api.get('/auth/ramais')
                setRamaisLista(res.data)
                setFilterList(res.data)
            } catch (error) {
                
            }
        })()

    },[])

    const handleSearch = (value: string) => {
        let search = value ? value.toLowerCase().trim().replaceAll('.','').replaceAll('-','') : ''
        let list: RamaisType[]
        
        if(!search) {
            list = ramaisLista
        } else {
            list = ramaisLista.filter(c => (c && c.nome_unidade) ? c.nome_unidade.toLowerCase().indexOf(search) > -1 || 
                c.i_unidade.replaceAll('.','').replaceAll('-','').indexOf(search) > -1
            : false)
            
            if(list.length == 0){
                // let lista = ramaisLista.map(itens=>{
                //     return itens.ramais.filter(ramal=>(ramal.ramal) ? ramal.ramal.toString().indexOf(search) > -1 : false)
                // }).filter(i=> {return i.length > 0})

                list = ramaisLista.map(i => {
                    let res = i.ramais.filter((ramal: any)=> ramal.ramal ? ramal.ramal.toString().indexOf(search) > -1 : false)
                    if(res.length > 0 && res != undefined ) {
                        console.log(res);
                        return {...i, ramais: res}
                    }
                    // return res
                }).filter(Boolean)
                
                
            }
        }
        setFilterList(list)        
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
                                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">Lista de Ramais</h1>
                                            {/* <ol className="breadcrumb breadcrumb-separatorless text-muted fs-6 fw-semibold pt-lg-3">
                                                <li className="breadcrumb-item text-muted">Total de Ramais:</li>
                                                <li className="breadcrumb-item"><span className="text-primary">213</span></li>
                                            </ol> */}
                                        </div>
                                        <div className="d-flex align-items-center pt-4 pb-7 pt-lg-1 pb-lg-2">
                                            <input type="text" onChange={t=>handleSearch(t.target.value)} className="form-control" placeholder="Filtrar Ramal ou Unidade"/>
                                        </div>
                                    </div>
                                </div>

                                <div id="kt_app_content" className="app-content flex-column-fluid ">

                                    {filterList && filterList.map((i, k) => {

                                        return (
                                            <div key={k} className="card pt-4 mb-6 mb-xl-9">     
                                                <div className="card-body p-lg-10">
                                                    <div className="d-flex flex-column flex-xl-row">
                                                        <div className="flex-lg-row-fluid mb-10 mb-xl-0">
                                                            <div id="kt_table_customers_payment_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                                <div className="table-responsive">
                                                                    <table className="table align-middle table-row-dashed gy-5 dataTable no-footer" id="kt_table_customers_payment">
                                                                        <thead className="border-bottom border-gray-200 fs-7 fw-bold">
                                                                            <tr className="text-start text-gray-900 text-uppercase gs-0">
                                                                                <th className="min-w-100px sorting">{i.i_unidade}</th>
                                                                                <th className="sorting">{i.nome_unidade}</th>
                                                                                <th className="text-end min-w-100px pe-4 sorting_disabled">Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="fs-6 fw-semibold text-gray-600">
                                                                            {i.ramais && i.ramais.map((item:any, j:number)=>(
                                                                                <tr key={j} className="odd">
                                                                                    <td className="text-primary">{item.ramal}</td>
                                                                                    <td>{item.nome_ramal}
                                                                                        <span className="text-gray-800"> ({item.lista_usuarios})</span>
                                                                                    </td>
                                                                                    {item.ativo === 'S' ?
                                                                                        <td className="pe-0 text-end"><span className="badge badge-light-success text-end">Ativo</span></td>
                                                                                        :
                                                                                        <td className="pe-0 text-end"><span className="badge badge-light-danger text-end">Inativo</span></td>
                                                                                    }
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
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
		</div>
    )
}