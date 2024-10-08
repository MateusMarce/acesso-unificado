import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import * as Yup from 'yup'

import { TrocaSenhaType } from '../../assets/types/type'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import validateRequest from '../../helpers/validateRequest'
import api from '../../services/api'
import { useState } from 'react'
import Cadastro_FormColaborador from '../../components/Cadastro_FormColaborador'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import CookieConsent from 'react-cookie-consent'
import {decode as base64_decode} from 'base-64';


export default function TrocaSenha() {
    const [cookies, setCookies] = useCookies(['consent', 'login', 'theme'])
    const [cookie, setCookie] = useState<boolean>(cookies.consent && cookies.consent === 'true' ? true : false)
    const [dados, setDados] = useState<any>({})
    const [colaborador, setColaborador] = useState<boolean>(false)
    const [aluno, setAluno] = useState<boolean>(false)
    const [externo, setExterno] = useState<boolean>(false)
    const [senha, setSenha] = useState<boolean>(false)
    const Schema = Yup.object().shape({
        senha_atual: Yup.string().min(5, 'A senha deve conter 5 caractéres.').required('Este campo é obrigatório.'),
        password_old: Yup.string().min(5, 'A senha deve conter 5 caractéres.').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            "Digite uma senha mais forte. Deve conter letras maiúsculas e números."
          ),
        password_confirmation: Yup.string().min(5, 'A senha deve conter 5 caractéres.').oneOf([Yup.ref('password_old')], 'As senhas não são iguais.'),
        email: Yup.string().email('Digite um e-mail válido.').required('Este campo é obrigatório.'),
    })
    const {email} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (values:FormikValues, action:FormikHelpers<TrocaSenhaType>) => {
        action.setSubmitting(true)

        //requisiçao
        try {
            let res = await api.post('cadastro/passexpire',{
                email:values.email,
                senha_atual:values.senha_atual,
                password:values.password_old
            })
            validateRequest(res)
            if(res.status == 200) navigate('/')
            
        } catch (error) {
            validateRequest(error)
            
        }
        action.setSubmitting(false)
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
                                    email:base64_decode(email || ''),
                                    password_old:'',
                                    senha_atual:'',
                                    password_confirmation:''
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

                                            <Cadastro_FormColaborador
                                                values={props.values.password_old} 
                                                errors={props.errors.password_old} 
                                                touched={props.touched.password_old}
                                                errors_conf={props.errors.password_confirmation} 
                                                touched_conf={props.touched.password_confirmation}
                                                errors_old={props.errors.senha_atual} 
                                                touched_old={props.touched.senha_atual} 
                                                dados={dados}
                                            />

                                        
                                            <div className="d-grid mt-8">
                                                <button type={'button'} onClick={()=>props.submitForm()} id="kt_sign_in_submit" className="btn btn-success">
                                                    {props.isSubmitting ?
                                                        <span className="indicator-progress">Por favor, aguarde...<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                        :
                                                        <span className="indicator-label">Cadastrar</span>
                                                    }
                                                </button>
                                            </div>
                                        <div className="text-gray-700 text-center fw-semibold fs-6 mt-10"><a href="https://unisatc.com.br/politica-de-privacidade/" target={'_blank'} className="link-success">Política de Privacidade</a></div>
                                    </Form>
                                )}}

                            </Formik>
                        </div>
                    </div>      
                    <div className="d-flex flex-center flex-wrap px-5">
                        <div className="text-gray-700 text-center fw-semibold fs-6">{new Date().getFullYear()} &copy; <a href="#" className="link-success">TI SATC</a></div>
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