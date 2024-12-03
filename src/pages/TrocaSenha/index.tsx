import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import * as Yup from 'yup'
import { Tooltip } from 'react-tooltip'

import { TrocaSenhaCpfType, TrocaSenhaType } from '../../assets/types/type'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import validateRequest from '../../helpers/validateRequest'
import api from '../../services/api'
import { useState } from 'react'
import Cadastro_FormColaborador from '../../components/Cadastro_FormColaborador'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import CookieConsent from 'react-cookie-consent'
import {decode as base64_decode} from 'base-64';
import CpfField from '../../components/Fields/CpfField'
import DataField from '../../components/Fields/DataField'
import ChangePassword from '../../components/Buttons/ChangePassword'


export default function TrocaSenha() {
    const [cookies, setCookies] = useCookies(['consent', 'login', 'theme'])
    const [cookie, setCookie] = useState<boolean>(cookies.consent && cookies.consent === 'true' ? true : false)
    const [dados, setDados] = useState<TrocaSenhaCpfType>({} as TrocaSenhaCpfType)
    const [cpf, setCpf] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [externo, setExterno] = useState<boolean>(false)
    const [senha, setSenha] = useState<boolean>(false)
    const Schema = Yup.object().shape({
        tipo: Yup.string(),
        cidade_natal: Yup.string().when('tipo',
            (val, schema)=> {
                if(val[0] === 'C'){
                    return schema.required('Este campo é obrigatório.')
                } else {
                    return schema.notRequired()
                }
            }
        ),
        nome_mae: Yup.string().when('tipo',
            (val, schema)=> {
                if(val[0] === 'C'){
                    return schema.required('Este campo é obrigatório.')
                } else {
                    return schema.notRequired()
                }
            }
        ),
        codigo: Yup.string().when('tipo',
            (val, schema)=> {
                if(val[0] === 'C'){
                    return schema.required('Este campo é obrigatório.')
                } else {
                    return schema.notRequired()
                }
            }
        ),
        dt_nascimento: Yup.string().when('tipo',
            (val, schema)=> {
                if(val[0] === 'C'){
                    return schema.required('Este campo é obrigatório.')
                } else {
                    return schema.notRequired()
                }
            }
        ),
        password: Yup.string().min(5, 'A senha deve conter 5 caractéres.').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            "Digite uma senha mais forte. Deve conter letras maiúsculas, números e caracteres especiais."
          ).required('Este campo é obrigatório.'),
        password_confirmation: Yup.string().min(5, 'A senha deve conter 5 caractéres.').oneOf([Yup.ref('password')], 'As senhas não são iguais.').required('Este campo é obrigatório.'),
    })
    const {token, id} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (values:FormikValues, action:FormikHelpers<TrocaSenhaType>) => {
        action.setSubmitting(true)
        
        //requisiçao
        try {
            let res = await api.post('cadastro/restorepass', values)
            validateRequest(res)
            navigate('/')
            
        } catch (error) {
            validateRequest(error)
            
        }
        action.setSubmitting(false)
    }
    const handleCpf = async (cpf:string, setFieldValue:any) => {
        if(cpf.length >= 14){
            setLoading(true)
            try {
                let new_cpf = cpf.replaceAll('.','').replace('-','')
                let res = await api.get(`cadastro/checkpass?cpf=${new_cpf}`)
                validateRequest(res)
                setCpf(new_cpf)
                setDados(res.data)
                setFieldValue('id_user', res.data.id_user)
                setFieldValue('token', res.data.token)
            } catch (error) {
                validateRequest(error)
            }
            setLoading(false)
        }
    }
    
    return (
        <div className="d-flex flex-column flex-root h-100" id="kt_app_root">
            <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                <Login_LeftBanner />
                {cookies.consent || cookie ?
                <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10">
                    <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                        <div className="w-lg-500px p-10">
                            <Formik
                                initialValues={{
                                    tipo: dados.colaborador ? 'C' : 'E',
                                    cpf: cpf,
                                    nome_mae: '',
                                    codigo: '',
                                    dt_nascimento: '',
                                    cidade_natal: '',
                                    id_user: id || dados.id_user,
                                    token: token || dados.token,
                                    password: '',
                                    password_confirmation: ''
                                }}
                                validationSchema={Schema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                
                                {(props:FormikProps<TrocaSenhaType>) => {
                                    // console.log(props.errors);
                                    
                                    return(
                                    <Form className='form w-100'>
                                        <div className="text-center mb-11">
                                            <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                            <div className="text-gray-700 fw-semibold fs-6">
                                                Já tem cadastro? <Link to="/" className="link-success">Entre na sua conta</Link>
                                            </div>
                                        </div>
                                        <div className="separator separator-content border-dark my-14">
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Troque sua <b>Senha</b></span>
                                        </div>
                                        {!id && !token &&
                                        <div className="fv-row mb-8 position-relative">
                                            <CpfField onChange={(t:any)=>handleCpf(t.target.value, props.setFieldValue)} autoFocus={true} type="text" value={cpf} placeholder="CPF" name="cpf" className={`form-control form-control-lg bg-transparent ${props.errors.cpf && props.touched.cpf && 'is-invalid'}`}/> 
                                            {loading &&
                                                <div className='position-absolute end-0 top-25 me-4'>
                                                    <span className="w-15px h-15px spinner-border spinner-border-sm align-middle ms-2"></span>
                                                </div>
                                            }
                                        </div>
                                        }
                                        {dados && dados.colaborador &&
                                            <>
                                                <h4 className='text-center mb-4 text-gray-700 fw-normal'>Confirme sua identidade:</h4>
                                                <div className="fv-row mb-3">
                                                    <Field as="select" className={`form-select bg-transparent mb-3 ${props.errors.cidade_natal && props.touched.cidade_natal && 'is-invalid'}`} style={{border:" 1px solid #92929254"}} name="cidade_natal" id="cidade_natal">
                                                        <option value='' disabled>Selecione a sua cidade natal</option>
                                                        {dados.sugestoesCidades.length > 0 && dados.sugestoesCidades.map((i:string, k:number)=>(
                                                            <option key={k} value={i}>{i}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name='cidade_natal' component={'small'} className='invalid-feedback' />
                                                </div>
                                                <div className="fv-row mb-3">
                                                    <Field type="text" placeholder="Primeiro nome da sua mãe" name="nome_mae" className={`form-control form-control-lg bg-transparent ${props.errors.nome_mae && props.touched.nome_mae && 'is-invalid'}`}/> 
                                                    <ErrorMessage name='nome_mae' component={'small'} className='invalid-feedback' />
                                                </div>
                                                <div className="fv-row mb-3 position-relative">
                                                    <Field type="text" placeholder="Código do crachá" name="codigo" className={`form-control form-control-lg bg-transparent ${props.errors.codigo && props.touched.codigo && 'is-invalid'}`}/> 
                                                    <div className='position-absolute top-25 end-0 me-4'>
                                                        <a className='px-2 rounded-circle text-gray-600' data-tooltip-id="my-tooltip" style={{border: '1px solid' ,borderColor:'#7E8299'}}>
                                                            i
                                                        </a>
                                                        <Tooltip id="my-tooltip">O código fica no lado branco do crachá embaixo da código de barra. Ex.: O código é '000X1234', então usar '1234'</Tooltip>
                                                    </div>
                                                    <ErrorMessage name='codigo' component={'small'} className='invalid-feedback' />
                                                </div>
                                                <div className="fv-row mb-8">
                                                    <DataField type="text" placeholder="Data de nascimento" name="dt_nascimento" className={`form-control form-control-lg bg-transparent ${props.errors.dt_nascimento && props.touched.dt_nascimento && 'is-invalid'}`}/> 
                                                    <ErrorMessage name='dt_nascimento' component={'small'} className='invalid-feedback' />
                                                </div>
                                                <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-3 login-password position-relative">
                                                    <ChangePassword
                                                        tabIndex={0}
                                                        name='password'
                                                        placeholder='Nova senha'
                                                        errors={props.errors.password}
                                                        touched={props.touched.password}
                                                    />
                                                    <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
                                                </div>
                                                <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-8 login-password position-relative">
                                                    <ChangePassword
                                                        tabIndex={8}
                                                        name='password_confirmation'
                                                        placeholder='Confirmar senha'
                                                        errors={props.errors.password_confirmation}
                                                        touched={props.touched.password_confirmation}
                                                    />
                                                    <ErrorMessage name='password_confirmation' component={'small'} className='invalid-feedback' />
                                                </div>
                                            </>
                                        }
                                        {id && token &&
                                            <>
                                                <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-8 login-password position-relative">
                                                    <ChangePassword
                                                        tabIndex={1}
                                                        name='password'
                                                        placeholder='Nova senha'
                                                        errors={props.errors.password}
                                                        touched={props.touched.password}
                                                    />
                                                    <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
                                                </div>
                                                <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-8 login-password position-relative">
                                                    <ChangePassword
                                                        tabIndex={2}
                                                        name='password_confirmation'
                                                        placeholder='Confirmar senha'
                                                        errors={props.errors.password_confirmation}
                                                        touched={props.touched.password_confirmation}
                                                    />
                                                    <ErrorMessage name='password_confirmation' component={'small'} className='invalid-feedback' />
                                                </div>
                                            </>
                                        }
                                        
                                        {(dados.colaborador || (id && token)) && 
                                        <div className="d-grid mt-8">
                                            <button type={'submit'} id="kt_sign_in_submit" className="btn btn-success">
                                                {props.isSubmitting ?
                                                    <span className="indicator-progress">Por favor, aguarde...<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                    :
                                                    <span className="indicator-label">Trocar Senha</span>
                                                }
                                            </button>
                                        </div>
                                        }
                                    </Form>
                                )}}

                            </Formik>
                        </div>
                    </div>      
                    <div className="d-flex flex-column flex-center flex-wrap px-5">
                        <div className="text-gray-700 text-center fw-semibold fs-6"><a href="https://unisatc.com.br/politica-de-privacidade/" target={'_blank'} className="link-success">Política de Privacidade</a></div>
                        <div className="text-gray-700 text-center fw-semibold fs-6 d-flex gap-1">{new Date().getFullYear()} &copy; <div className="link-success m-0">TI SATC</div></div>
                    </div>
                </div>
                :
                <CookieConsent
                    location="bottom"
                    containerClasses="d-flex flex-column w-100 w-lg-50 h-100 align-items-center justify-content-center gap-10 bg-dark"
                    disableStyles
                    hideOnAccept
                    hideOnDecline
                    enableDeclineButton
                    buttonWrapperClasses="w-100 d-flex justify-content-center align-self-center gap-5"
                    buttonText="Aceitar cookies"
                    buttonClasses='btn btn-success bg-success text-white rounded'
                    declineButtonText="Negar cookies"
                    declineButtonClasses="btn btn-dark bg-transparent text-white rounded"
                    declineCookieValue='false'
                    onDecline={()=>setCookie(false)}
                    onAccept={()=>setCookie(true)}
                    cookieName="consent"
                    expires={150}
                >
                    <div id="consent-btn" className="w-100 d-flex flex-column align-items-center">
                        <i className="bi bi-shield-check text-success mb-5 mt-5" style={{fontSize:80}}></i>
                        <div className='d-flex flex-column text-center gap-5 mt-6'>
                            <h3 className="text-light">
                                Usamos cookies para validar sua autenticação.
                            </h3>
                            <small className='text-light'>Não usamos seus dados para fins comerciais.</small>
                            <small><a href="https://unisatc.com.br/politica-de-privacidade/" target={"_blank"}>[ Leia nossa Política de Privacidade ]</a></small>
                        </div>
                    </div>
                </CookieConsent>
                }
            </div>
        </div>
    )
}