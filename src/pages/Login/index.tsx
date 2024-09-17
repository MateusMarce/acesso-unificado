import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import CpfField from '../../components/Fields/CpfField'
import EmailField from '../../components/Fields/EmailField'
import api from '../../services/api'
import validateRequest from '../../helpers/validateRequest'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LoginType } from '../../assets/types/type'
import ChangePassword from '../../components/Buttons/ChangePassword'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import CookieConsent from 'react-cookie-consent'
import { useEffect, useState } from 'react'
import {encode as base64_encode} from 'base-64';
import { BASE_URL } from '../../services/url'


const Schema = Yup.object().shape({
    user: Yup.string().required('Este campo é obrigatório.'),
    password: Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
})

export default function Login() {
    const [cookies, setCookies, removeCookies] = useCookies(['login', 'user', 'consent', 'theme', 'image', 'exames'])
    const [cookie, setCookie] = useState<boolean>()
    const navigate = useNavigate()
    const {cpf} = useParams()    
    let consent = document.getElementById('consent-btn')

    useEffect(()=>{
        if(cookies.consent == 'false') {
            removeCookies('consent', {path: '/'})
            // setCookies('consent', '', {path:'/'})
        }
        removeCookies('exames')
    },[])


    const handleSubmit = async (values:FormikValues, action:FormikHelpers<LoginType>) => {
        action.setSubmitting(true)

        //verifica se é e-mail ou cpf
        let user_new;
        if(values.user.match(/[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/)){
            user_new = values.user
        } else {
            user_new = values.user.replaceAll('.','').replace('-','')
        }
        const value = {user: user_new, password:values.password}

        //requisiçao
        try {
            if(cookie || cookies.consent === 'true'){
                let res = await api.post('/auth/login', value)
                setCookies('login', res.data.content)
                navigate('/painel')
                validateRequest(res)
            } else {
                toast.error('Não é possivel acessar nosso portal sem aceitar os cookies.', {autoClose:2000, theme: cookies.theme ==='light'?'light':'dark'})
            }
            
        } catch (error:any) {
            validateRequest(error)
            if(error.response.status == 406){
                navigate(`/cadastro/${user_new}`)
            } else if (error.response.status == 401) {
                console.log(error);
                
                navigate(`/troca-senha/${base64_encode(error.response.data.email)}`)
            } else if (error.response.status == 402) {
                localStorage.setItem('user', value.user)
                localStorage.setItem('password', base64_encode(value.password))
                navigate('/qrcode')
            }
            
        }
        
        action.setSubmitting(false)
    }
    const handleLogout = async () => {
        await api.post('/auth/logout')
        removeCookies('user')
        removeCookies('login')
        removeCookies('image')
        removeCookies('exames')
    }
    const handleNavigate = () => {
        if(cookies.consent && cookies.consent !== 'false') {
            navigate('/painel')
        } else {
            handleLogout()
            removeCookies('consent')
        }
    }

    
    
    
    return (
        <div className="d-flex flex-column flex-root h-100" id="kt_app_root">
            <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                <Login_LeftBanner />
                
                {cookies.consent == 'true' || cookie == true ?
                    <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10">
                        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                            <div className="w-lg-500px p-10">
                                <Formik
                                    initialValues={{
                                        user:cpf||'',
                                        password:''
                                    }}
                                    validationSchema={Schema}
                                    onSubmit={handleSubmit}
                                    enableReinitialize
                                >
                                    
                                    {(props:FormikProps<LoginType>) => (
                                        <Form className='form w-100'>
                                                {cookies.login && cookies.user ? 
                                                    <>
                                                        <div className="text-center mb-11">
                                                            <h1 className="text-dark fw-bolder mb-3">
                                                                Você já está conectado
                                                            </h1>
                                                        </div>
                                                        <div className="separator separator-content border-dark my-14">
                                                            <span className="w-175px text-gray-700 fw-semibold fs-7">{cookies.user.email}</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="text-center mb-11">
                                                            <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                                            <div className="text-gray-700 fw-semibold fs-5">
                                                                Primeiro acesso? <Link to='cadastro' className="hover-scale link-success fw-bold fw-bold">Faça o seu cadastro.</Link>
                                                            </div>
                                                        </div>
                                                        <div className="separator separator-content border-dark my-14">
                                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Faça seu <b>Login</b></span>
                                                        </div>
                                                    </>

                                                }

                                            {/* LOGIN FORM */}
                                            {cookie !== false &&
                                                <>
                                                    {!cookies.login && !cookies.user  &&
                                                        <>
                                                            <div className="fv-row mb-8">
                                                                {props.values.user && props.values.user.match(/([0-9][0-9][0-9]+(\.[0-9][0-9][0-9])+)/) ?
                                                                    <CpfField maxLength={14} autoFocus={true} type="text" value={props.values.user} placeholder="E-mail ou CPF" name="user" className={`form-control form-control-lg bg-transparent ${props.errors.user && props.touched.user ? 'is-invalid' : ''}`}/> 
                                                                    :
                                                                    <EmailField name='user' autoFocus placeholder='E-mail ou CPF' onChange={(newValue:string)=>props.setFieldValue('user', newValue)}  values={props.values} errors={props.errors.user} touched={props.touched.user} setFieldValue={props.setFieldValue} />
                                                                    // <Field type="text" placeholder="Email ou CPF" name="user" autoComplete='off' className={`form-control bg-transparent ${props.errors.user && props.touched.user ? 'is-invalid' : ''}`}/> 
                                                                }
                                                                <ErrorMessage name='user' component={'small'} className='invalid-feedback' />
                                                            </div>
                                                            <div className="fv-row mb-3 position-relative login-password">
                                                                {/* <Field type={passwordType} placeholder="Senha" name="password" autoComplete='off' className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`} /> */}
                                                                <ChangePassword
                                                                    tabIndex={0}
                                                                    name='password'
                                                                    placeholder='Senha'
                                                                    errors={props.errors.password}
                                                                    touched={props.touched.password}
                                                                />
                                                                <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
                                                            </div>
                                                            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                                                                {/* <div></div><Link to='/esqueceu-senha' className="link-success">Esqueceu a senha?</Link> */}
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            }
                                            <div className="d-grid mb-10">
                                                {/* BUTTON */}
                                                {cookie !== false ?
                                                    <>
                                                        {cookies.login && cookies.user ?
                                                            <>
                                                                <button onClick={handleNavigate} className="btn btn-success mb-4">
                                                                    Entrar como {cookies.user.first_name} 
                                                                </button>
                                                                <button type='button' onClick={handleLogout} className="btn btn-light">
                                                                    Sair da conta
                                                                </button>
                                                            </>
                                                        :
                                                            <button type="submit" id="kt_sign_in_submit" className="btn btn-success">
                                                                {props.isSubmitting ?
                                                                    <span className="indicator-progress">Por favor, aguarde...<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                                    :
                                                                    <span className="indicator-label">Entrar</span>
                                                                }
                                                            </button>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <h4 className='w-100 text-center mb-5'>Você precisa aceitar os cookies para continuar.</h4>
                                                        <button type='button' onClick={()=>{setCookies('consent','true', {path:'/'}); setCookie(true)}} className="btn btn-success">
                                                            Aceitar
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                            <div className="text-gray-700 text-center fw-semibold fs-6"><a href="https://unisatc.com.br/politica-de-privacidade/" target={'_blank'} className="link-success">Política de Privacidade</a></div>
                                        </Form>
                                    )} 

                                </Formik>
                            </div>
                        </div>      
                        <div className="d-flex flex-center flex-wrap px-5">
                            <div className="text-gray-700 text-center fw-semibold fs-6 d-flex gap-1">{new Date().getFullYear()} &copy; <div className="link-success m-0">TI SATC</div></div>
                        </div>
                    </div>
                :
                <>
                {cookies.consent}
                    <CookieConsent
                        location="bottom"
                        containerClasses={`d-flex flex-column w-100 w-lg-50 h-100 align-items-center justify-content-center gap-10 ${cookies.theme == 'dark' ? 'bg-light' : 'bg-dark'}`}
                        disableStyles
                        hideOnAccept
                        enableDeclineButton
                        buttonWrapperClasses="w-100 d-flex justify-content-center align-self-center gap-5"
                        buttonText="Aceitar cookies"
                        buttonClasses='btn btn-success bg-success text-white rounded'
                        declineButtonText="Negar cookies"
                        declineButtonClasses="btn btn-dark bg-transparent text-white rounded"
                        onDecline={()=>{location.reload(); setCookie(false)}}
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
                    </>
                }
            </div>
        </div>
    )
}