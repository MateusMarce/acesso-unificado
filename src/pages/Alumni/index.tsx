import Dash_Header from "../../components/Header"
import Dash_HeaderSecondary from "../../components/HeaderSecondary"

import Dash_Footer from "../../components/Dash_Footer"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { AlumniDadosType, AlumniSalariosType } from "../../assets/types/type"
import { Link } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from "formik"
import SelectCurso from "../../components/Fields/SelectCurso"
import CepField from "../../components/Fields/CepField"
import axios from "axios"
import * as Yup from 'yup'
import { toast } from "react-toastify"


const ValidationSchema = Yup.object().shape({
    id_nivel:Yup.string().required('Preencha o campo.'),
    curso:Yup.string().required('Preencha o campo.'),
    fora_do_pais:Yup.string().required('Preencha o campo.'),
    cep: Yup.string().when('fora_do_pais', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    rua:Yup.string().when('fora_do_pais', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    numero:Yup.string().when('fora_do_pais', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    cidade:Yup.string().when('fora_do_pais', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    uf:Yup.string().when('fora_do_pais', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    outro_endereco:Yup.string().when('fora_do_pais', 
    (val, schema)=> {
        if(val[0] === 'S'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    area:Yup.string().required('Preencha o campo.'),
    outra_area:Yup.string().when('area', 
    (val, schema)=> {
        if(val[0] === '12'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    forma_trabalho:Yup.string().required('Preencha o campo.'),
    nome_empresa:Yup.string().when('forma_trabalho', 
    (val, schema)=> {
        if(val[0] !== 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    fora_do_pais_empresa:Yup.string().when('forma_trabalho', 
    (val, schema)=> {
        
        if(val[0] === 'N'){
            return schema.notRequired()
        } else {
            return schema.required('Preencha o campo.')
        }
    }),
    cep_empresa:Yup.string().when('fora_do_pais_empresa', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    rua_empresa:Yup.string().when('fora_do_pais_empresa', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    numero_empresa:Yup.string().when('fora_do_pais_empresa', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    cidade_empresa:Yup.string().when('fora_do_pais_empresa', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    uf_empresa:Yup.string().when('fora_do_pais_empresa', 
    (val, schema)=> {
        if(val[0] === 'N'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    outro_endereco_empresa:Yup.string().when('fora_do_pais_empresa', 
    (val, schema)=> {
        if(val[0] === 'S'){
            return schema.required('Preencha o campo.')
        } else {
            return schema.notRequired()
        }
    }),
    faixa_salarial:Yup.string().required('Preencha o campo.'),
    atividades:Yup.string().required('Preencha o campo.'),
    consentimento:Yup.string().required('Preencha o campo.'),
  })

export default function Perfil() {
    const [cookies, , removeCookie] = useCookies(['user', 'login', 'theme'])
    const [dados, setDados] = useState({} as AlumniDadosType)
    const [salarios, setSalarios] = useState([] as AlumniSalariosType[])

    useEffect(()=>{
        // GET USUARIO LOGADO
        // if(!cookies.user){
        //     (async()=>{
        //         try {
        //             let res = await api.get('/user/me')
        //             setCookies('user', res.data, {path:'/'})
        //         } catch (error) {
                    
        //         }
        //     })()
        // }
        
        // GET CARDS E DEPENDENTES
        (async()=>{
            try {
                let resDados = await api.get('alumni/getDados')
                setDados(resDados.data[0])
                let resSalarios = await api.get('alumni/getSalarios')
                setSalarios(resSalarios.data)
                
            } catch (error) {
                removeCookie('login')
                removeCookie('user')
                toast.error('Sua sessão expirou.', {autoClose:2000,theme:cookies.theme==='light'?'light':'dark'})
                window.location.href = '/acesso-unificado/#/'
            }
        })()


    },[])

    const HandleSearchCep = async (value: string, setFieldValue: any, name:string) => {
        let cep = value.replaceAll('-', '').replaceAll('_', '')
        if(cep.length === 8){
          try {
            let res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            
            if(name === 'cep'){
                setFieldValue('cep', cep)
                setFieldValue('cidade', res.data.localidade)
                setFieldValue('uf', res.data.uf)
                setFieldValue('bairro', res.data.bairro)
                setFieldValue('rua', res.data.logradouro)
            } else if (name === 'cep_empresa') {
                setFieldValue('cep_empresa', cep)
                setFieldValue('cidade_empresa', res.data.localidade)
                setFieldValue('uf_empresa', res.data.uf)
                setFieldValue('bairro_empresa', res.data.bairro)
                setFieldValue('rua_empresa', res.data.logradouro)
                
            }
            
          } catch (error) {
            
          }
        }
        
    }

    const handleSubmit = async (values: FormikValues, action: any) => {
        
        try {
            let res = await api.post('alumni/saveQuestionario', {
                ...values, 
                matriculas: dados.matriculas,
                id_egresso: dados.id_egresso
            })
            if(res.data.retorno === 1) {
                location.reload()
            } else {
                toast.error('Você não possui nenhuma matrícula nesse nível.', {autoClose:2000,theme:cookies.theme==='light'?'light':'dark'})
            }
        } catch (error) {
            
        }
        action.resetForm()
    }

    

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

                            <div id="kt_app_toolbar" className="app-toolbar  py-3 py-lg-6 ">
                                <div className="d-flex flex-grow-1 flex-stack flex-wrap gap-2" id="kt_toolbar">
                                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3 ">
                                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">Formulário Alumni</h1>
                                    </div>
                                    <div className="d-flex align-items-center pt-4 pb-7 pt-lg-1 pb-lg-2">
                                        <div>
                                            <Link to='/painel' className="btn btn-sm btn-light" id="kt_drawer_chat_toggle">Voltar</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FORM */}
                            {dados.retorno == 1 &&
                                <div className="login-content flex-lg-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden py-20 px-10 p-lg-7 mx-auto mw-750px w-100" ng-show="dados.retorno==1">
                                    <div className="d-flex flex-column-fluid flex-center pb-10 jc-formBut">

                                        <Formik
                                            initialValues={{
                                                id_nivel:dados.id_nivel,
                                                curso:dados.curso.i_curso,
                                                fora_do_pais:'',
                                                cep:'',
                                                rua:'',
                                                numero:'',
                                                cidade:'',
                                                uf:'',
                                                outro_endereco:'',
                                                area:'',
                                                outra_area:'',
                                                forma_trabalho:'',
                                                nome_empresa:'',
                                                fora_do_pais_empresa:'',
                                                cep_empresa:'',
                                                rua_empresa:'',
                                                numero_empresa:'',
                                                cidade_empresa:'',
                                                uf_empresa:'',
                                                outro_endereco_empresa:'',
                                                faixa_salarial:'',
                                                atividades:'',
                                                consentimento:'',
                                            }}
                                            onSubmit={handleSubmit}
                                            validationSchema={ValidationSchema}
                                            enableReinitialize
                                        >
                                            {(props)=>{
                                                console.log(props.errors);
                                                
                                                return(
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <p className="titPerguntas">Qual o Nível/Curso que você realizou junto a SATC?</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12 mb-3">
                                                            <Field as='select' value={dados.id_nivel} className={`form-select form-select-lg ${(props.touched.id_nivel && props.errors.id_nivel) && 'is-invalid'}`} id="id_nivel" name="id_nivel">
                                                                <option value={undefined}>Nível</option>
                                                                {dados.niveis && dados.niveis.map((l,k)=>(
                                                                    <option key={k} value={l.id}>{l.nome}</option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage name="id_nivel" component='small' className='invalid-feedback' />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-sm-12 mb-3">
                                                            <SelectCurso defaultValue={dados.curso} touched={props.setTouched} setError={props.setErrors} list={dados.matriculas} id_nivel={props.values.id_nivel} setValue={props.setFieldValue} />
                                                            <ErrorMessage name="curso" component='small' className='invalid-feedback' />
                                                        </div>
                                                    </div>

                                                    <div className="row mt-8">
                                                        <div className="col-sm-12">
                                                            <p className="titPerguntas">Reside fora do Brasil?</p>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className={`col-sm-12 d-flex gap-3 ${(props.touched.fora_do_pais && props.errors.fora_do_pais) && 'is-invalid'}`}>
                                                            <div className="d-flex gap-1">
                                                                <Field type="radio" style={{width:16}} value="S" name="fora_do_pais" id="fora_do_pais_S" /><label htmlFor="fora_do_pais_S">Sim</label>
                                                            </div>
                                                            <div className="d-flex gap-1">
                                                                <Field type="radio" style={{width:16}} value="N" name="fora_do_pais" id="fora_do_pais_N" /><label htmlFor="fora_do_pais_N">Não</label>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="fora_do_pais" component='small' className='invalid-feedback' />
                                                    </div>

                                                    {props.values.fora_do_pais === 'N' &&
                                                        <>
                                                            <div className="row mt-8">
                                                                <div className="col-sm-12">
                                                                    <p className="titPerguntas">Informe o seu endereço residencial:</p>
                                                                </div>
                                                            </div>
                                                    
                                                            <div className="row">
                                                                <div className="col-sm-3 mb-3">
                                                                    <CepField onChange={(t:any)=>HandleSearchCep(t.target.value, props.setFieldValue, 'cep')} type="text" id="cep" className={`cep form-control form-control-lg ${(props.touched.cep && props.errors.cep) && 'is-invalid'}`} name="cep" autoComplete="off"placeholder="CEP" />
                                                                    <ErrorMessage name="cep" component='small' className='invalid-feedback' />
                                                                </div>
                                                                <div className="col-sm-7 mb-3">
                                                                    <Field type="text" maxLength="200" className={`form-control form-control-lg ${(props.touched.rua && props.errors.rua) && 'is-invalid'}`} placeholder="Rua" id="rua" name="rua" autoComplete="off" />
                                                                    <ErrorMessage name="rua" component='small' className='invalid-feedback' />
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <Field type="text" maxLength="6" className={`form-control form-control-lg ${(props.touched.numero && props.errors.numero) && 'is-invalid'}`} placeholder="N°" id="numero" name="numero" autoComplete="off" />
                                                                    <ErrorMessage name="numero" component='small' className='invalid-feedback' />
                                                                </div>
                                                            </div>
                                                            <div className="row" ng-show="form.fora_do_pais=='N'">
                                                                <div className="col-sm-10 mb-3">
                                                                    <Field type="text" maxLength="100" className={`form-control form-control-lg ${(props.touched.cidade && props.errors.cidade) && 'is-invalid'}`} placeholder="Cidade" id="cidade" name="cidade" autoComplete="off" />
                                                                    <ErrorMessage name="cidade" component='small' className='invalid-feedback' />
                                                                    
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <Field type="text" maxLength="2" className={`form-control form-control-lg ${(props.touched.uf && props.errors.uf) && 'is-invalid'}`} placeholder="UF" id="uf" name="uf" autoComplete="off" />
                                                                    <ErrorMessage name="uf" component='small' className='invalid-feedback' />
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    
                                                    {props.values.fora_do_pais === 'S' &&
                                                        <>
                                                            <div className="row mt-8">
                                                                <div className="col-sm-12">
                                                                    <p className="titPerguntas">Descrição do seu endereço residencial:</p>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-12 mb-3">
                                                                    <Field as='textarea' maxLength="1000" name="outro_endereco" id="outro_endereco" rows={5} className={`form-control form-control-lg ${(props.touched.outro_endereco && props.errors.outro_endereco) && 'is-invalid'}`}></Field>
                                                                    <ErrorMessage name="outro_endereco" component='small' className='invalid-feedback' />
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    <div className="row mt-8">
                                                        <div className="col-sm-12">
                                                            <p className="titPerguntas">Qual sua área de atuação profissional?</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12 mb-3">
                                                            <Field as='select' name="area" id="area" className={`form-select form-select-lg ${(props.touched.area && props.errors.area) && 'is-invalid'}`} autoComplete="off">
                                                                <option value="">Selecione</option>
                                                                {dados.areas && dados.areas.map((l, k)=>(
                                                                    <option key={k} value={l.id}>{l.nome.split(' [')[0]}</option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage name="area" component='small' className='invalid-feedback' />
                                                        </div>
                                                    </div>
                                                    {props.values.area === '12' &&
                                                        <>
                                                            <div className="row mt-8">
                                                                <div className="col-sm-12">
                                                                    <p className="titPerguntas">Descrição da sua área de atuação profissional:</p>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-12 mb-3">
                                                                    <Field as='textarea' maxLength="1000" name="outra_area" id="outra_area" rows={5} className={`form-control form-control-lg ${(props.touched.outra_area && props.errors.outra_area) && 'is-invalid'}`}></Field>
                                                                    <ErrorMessage name="outra_area" component='small' className='invalid-feedback' />
                                                                </div>
                                                            </div>
                                                        </>
                                                    }

                                                    <div className="row mt-8">
                                                        <div className="col-sm-12">
                                                            <p className="titPerguntas">Você trabalha em alguma empresa ou é proprietário de alguma empresa?</p>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className={`col-sm-12 d-flex flex-column gap-1 ${(props.touched.forma_trabalho && props.errors.forma_trabalho) && 'is-invalid'}`}>
                                                            <div className="d-flex gap-1">
                                                                <Field type="radio" style={{width:16}} name="forma_trabalho" id="forma_trabalho_E" value="E" />
                                                                <label htmlFor="forma_trabalho_E"> Trabalho na empresa</label>
                                                            </div>
                                                            <div className="d-flex gap-1">
                                                                <Field type="radio" style={{width:16}} name="forma_trabalho" id="forma_trabalho_P" value="P" />
                                                                <label htmlFor="forma_trabalho_P"> Sou proprietário</label>
                                                            </div>
                                                            <div className="d-flex gap-1">
                                                                <Field type="radio" style={{width:16}} name="forma_trabalho" id="forma_trabalho_N" value="N" />
                                                                <label htmlFor="forma_trabalho_N"> Não tenho vínculo empregatício</label>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="forma_trabalho" component='small' className='invalid-feedback' />
                                                    </div>

                                                    {(props.values.forma_trabalho === 'P' || props.values.forma_trabalho === 'E') &&
                                                        <div>
                                                            <div className="row mt-8">
                                                                <div className="col-sm-12">
                                                                    <p className="titPerguntas">Nome da empresa:</p>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-12 mb-3">
                                                                    <Field type="text" maxLength="200" className={`form-control form-control-lg ${(props.touched.nome_empresa && props.errors.nome_empresa) && 'is-invalid'}`} name="nome_empresa" id="nome_empresa" autoComplete="off" />
                                                                    <ErrorMessage name="nome_empresa" component='small' className='invalid-feedback' />
                                                                </div>
                                                            </div>

                                                            <div className="row mt-8">
                                                                <div className="col-sm-12">
                                                                    <p className="titPerguntas">A empresa está localizada fora do Brasil?</p>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className={`col-sm-12 mb-3 d-flex gap-3 ${(props.touched.fora_do_pais_empresa && props.errors.fora_do_pais_empresa) && 'is-invalid'}`}>
                                                                    <div className="d-flex gap-1">
                                                                        <Field type="radio" value="S" name="fora_do_pais_empresa" id="fora_do_pais_empresa_S" /><label htmlFor="fora_do_pais_empresa_S" >Sim</label>
                                                                    </div>
                                                                    <div className="d-flex gap-1">
                                                                        <Field type="radio" value="N" name="fora_do_pais_empresa" id="fora_do_pais_empresa_N" /><label htmlFor="fora_do_pais_empresa_N" >Não</label>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="fora_do_pais_empresa" component='small' className='invalid-feedback' />
                                                            </div>

                                                            {props.values.fora_do_pais_empresa === 'N' &&
                                                                <>
                                                                    <div className="row">
                                                                        <div className="col-sm-12 mb-3">
                                                                            <p className="titPerguntas">Onde está localizada esta empresa?</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-sm-3 mb-3">
                                                                            <CepField onChange={(t:any)=>HandleSearchCep(t.target.value, props.setFieldValue, 'cep_empresa')} type="text" id="cep_empresa" className={`form-control form-control-lg ${(props.touched.cep_empresa && props.errors.cep_empresa) && 'is-invalid'}`} name="cep_empresa" autoComplete="off" placeholder="CEP" />
                                                                            <ErrorMessage name="cep_empresa" component='small' className='invalid-feedback' />
                                                                        </div>
                                                                        <div className="col-sm-7 mb-3">
                                                                            <Field type="text" className={`form-control form-control-lg ${(props.touched.rua_empresa && props.errors.rua_empresa) && 'is-invalid'}`} placeholder="Rua" name="rua_empresa" id="rua_empresa" maxLength={200} autoComplete="off" />
                                                                            <ErrorMessage name="rua_empresa" component='small' className='invalid-feedback' />
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <Field type="text" className={`form-control form-control-lg ${(props.touched.numero_empresa && props.errors.numero_empresa) && 'is-invalid'}`} placeholder="N°" name="numero_empresa" id="numero_empresa" maxLength={10}  autoComplete="off" />
                                                                            <ErrorMessage name="numero_empresa" component='small' className='invalid-feedback' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-sm-10 mb-3">
                                                                            <Field type="text" className={`form-control form-control-lg ${(props.touched.cidade_empresa && props.errors.cidade_empresa) && 'is-invalid'}`} placeholder="Cidade" name="cidade_empresa" id="cidade_empresa" maxLength={100} autoComplete="off" />
                                                                            <ErrorMessage name="cidade_empresa" component='small' className='invalid-feedback' />
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <Field type="text" className={`form-control form-control-lg ${(props.touched.uf_empresa && props.errors.uf_empresa) && 'is-invalid'}`} placeholder="UF" name="uf_empresa" id="uf_empresa" autoComplete="off" maxLength="2" />
                                                                            <ErrorMessage name="uf_empresa" component='small' className='invalid-feedback' />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }

                                                            {props.values.fora_do_pais_empresa === 'S' &&
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-sm-12 mb-3">
                                                                            <p className="titPerguntas">Descrição do endereço da empresa:</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-sm-12 mb-3">
                                                                            <Field as='textarea' maxLength="1000" name="outro_endereco_empresa" id="outro_endereco_empresa" rows={5} className={`form-control form-control-lg ${(props.touched.outro_endereco_empresa && props.errors.outro_endereco_empresa) && 'is-invalid'}`}></Field>
                                                                            <ErrorMessage name="outro_endereco_empresa" component='small' className='invalid-feedback' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    }

                                                    <div className="row mt-8">
                                                        <div className="col-sm-12">
                                                            <p className="titPerguntas">Qual sua faixa salarial?</p>
                                                        </div>
                                                    </div>
                                                    <div className="row" >
                                                        <div className="col-sm-12 mb-3">
                                                                <div className={`d-flex flex-column gap-1 ${(props.touched.faixa_salarial && props.errors.faixa_salarial) && 'is-invalid'}`}>
                                                                    {salarios.map((lista, key)=>{
                                                                        return lista.map((item, i)=>(
                                                                            <div key={i} className="d-flex gap-1">
                                                                                <Field type="radio" style={{width:16}} value={item} name="faixa_salarial" id={`faixa_salarial_${i}_${key}`} />
                                                                                <label htmlFor={`faixa_salarial_${i}_${key}`}>{item}</label>
                                                                            </div>

                                                                        ))
                                                                    })}
                                                                </div>
                                                                <ErrorMessage name="faixa_salarial" component='small' className='invalid-feedback' />                                    
                                                        </div>
                                                    </div>

                                                    <div className="row mt-8">
                                                        <div className="col-sm-12">
                                                            <p className="titPerguntas">Faça uma breve descrição de suas atividades:</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12 mb-3">
                                                            <Field as='textarea'  name="atividades" id="atividades" rows={5} className={`form-control form-control-lg ${(props.touched.atividades && props.errors.atividades) && 'is-invalid'}`}></Field>
                                                            <ErrorMessage name="atividades" component='small' className='invalid-feedback' />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-8">
                                                        <div className="col-sm-12 mb-3 d-flex gap-2">
                                                            <Field type="checkbox" style={{width:16, height:16}} name="consentimento" id="consentimento" className={`${(props.touched.consentimento && props.errors.consentimento) && 'is-invalid'}`} /><label htmlFor="consentimento" className="bold"> A proteção à privacidade e aos dados pessoais estão entre as prioridades da SATC. Esta Declaração de Privacidade tem como objetivo, registrar o compromisso da instituição com a segurança e a transparência no tratamento dos dados pessoais, conforme previsto na legislação vigente. </label>
                                                            <ErrorMessage name="consentimento" component='small' className='invalid-feedback' />
                                                        </div>
                                                    </div>

                                                    <br />
                                                    <div className="row flex-end">
                                                        <div className="col-md-6 col-xs-6 col-md-offset-3 col-sm-offset-2 right">
                                                            <button type="submit" className="w-100 btn btn-success">Enviar Respostas</button>
                                                        
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}}
                                        </Formik>

                                    </div>

                                </div>
                            }

                            {/* AVISO APOS ENVIAR FORM */}
                            {dados.retorno != 1 &&
                                <div className="flex-lg-row-fluid d-flex flex-column justify-content-center overflow-hidden mx-auto w-100">
                                    <div className="d-flex flex-column-fluid flex-center py-10 mw-750px m-auto">
                                        <div className={`avisoCenter text-center alert ${dados.dados_retorno?.alert}`}>
                                            <i className={`fa-solid text-dark fs-1 mb-3 ${dados.dados_retorno?.icon}`} />
                                            <div className="text-dark fs-2" dangerouslySetInnerHTML={{__html: dados.dados_retorno?.txt}}></div>
                                            {dados.retorno==2 &&
                                                <h2 ng-show="dados.retorno==2">{dados.justificativa}</h2>
                                            }
                                        </div>
                                    </div>
                                    

                                    {dados.eventos_alumni &&
                                        <div className="mt-6 mb-5 ">
                                            {dados.eventos_alumni.length > 0 && 
                                            <div className="mb-8">
                                                <h2>Você ainda faz parte da nossa comunidade acadêmica.</h2>
                                                <p>Convidamos você a participar dos nossos eventos! Veja a lista de eventos agendados:</p>
                                            </div> }
                                            {dados.eventos_alumni.map((i, k)=>(
                                                <a href={i.guid} key={k} target="_blank" className={`card mb-5 mb-xl-9`}>     
                                                    <div className="btn btn-light card-body py-3 px-4 px-xl-6 py-xl-6">
                                                        <div className="d-flex flex-column flex-xl-row">
                                                            <div className="flex-lg-row-fluid">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div className="d-flex flex-column">
                                                                        <small className="text-start mb-2">De {i.dt_inicio} até {i.dt_fim}</small>
                                                                        <h2 className="text-start">{i.post_title}</h2>
                                                                        {i.post_content && 
                                                                            <div className="text-gray text-start" dangerouslySetInnerHTML={{__html: i.post_content}} />
                                                                        }
                                                                    </div>
                                                                    <small>Abrir evento</small>
                                                                </div>
                                                            </div>  
                                                        </div>       
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    }
                                </div>
                            }


                        </div>
                    </div>
                </div>

            </div>
            <Dash_Footer />
		</div>
    )
}