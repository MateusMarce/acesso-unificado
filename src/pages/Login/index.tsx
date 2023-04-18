import { Formik, Form, ErrorMessage } from 'formik'
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
import { useState } from 'react'


const Schema = Yup.object().shape({
    user: Yup.string().required('Este campo é obrigatório.'),
    password: Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
})

export default function Login() {
    const [cookies, setCookies, removeCookies] = useCookies(['login', 'user', 'consent', 'theme'])
    const [cookie, setCookie] = useState<boolean>()
    const navigate = useNavigate()
    const {cpf} = useParams()    
    let consent = document.getElementById('consent-btn')


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
            console.log(cookies.consent);
            
            if(cookie || cookies.consent === 'true'){
                let res = await api.post('/auth/login', value)
                setCookies('login', res.data.content, {path:'/acesso-unificado'})
                navigate('/painel')
                validateRequest(res)
            } else {
                toast.error('Não é possivel acessar nosso portal sem aceitar os cookies.', {autoClose:2000, theme: cookies.theme ==='light'?'light':'dark'})
            }
            
        } catch (error:any) {
            validateRequest(error)
            if(error.response.status == 406){
                navigate(`/cadastro/${user_new}`)
            }
            
        }
        
        action.setSubmitting(false)
    }
    const handleLogout = () => {
        removeCookies('user')
        removeCookies('login')
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
                                                        <div className="text-gray-700 fw-semibold fs-6">
                                                            Primeiro acesso? <Link to='cadastro' className="link-success">Faça o seu cadastro</Link>
                                                        </div>
                                                    </div>
                                                    <div className="separator separator-content border-dark my-14">
                                                        <span className="w-175px text-gray-700 fw-semibold fs-7">Ou {!cookies.login && !cookies.user ? "insira os dados" : "acesse o painel"}</span>
                                                    </div>
                                                </>

                                            }

                                        {/* LOGIN FORM */}
                                        {cookie !== false &&
                                            <>
                                                {!cookies.login && !cookies.user  &&
                                                    <>
                                                        <div className="fv-row mb-8">
                                                            {props.values.user && props.values.user.match(/[0-9]+/) ?
                                                                <CpfField autoFocus={true} type="text" value={props.values.user} placeholder="Email ou CPF" name="user" className={`form-control form-control-lg bg-transparent ${props.errors.user && props.touched.user ? 'is-invalid' : ''}`}/> 
                                                                :
                                                                // <Field type="text" placeholder="Email ou CPF" name="user" autoComplete='off' className={`form-control bg-transparent ${props.errors.user && props.touched.user ? 'is-invalid' : ''}`}/> 
                                                                <EmailField name='user' placeholder='E-mail ou CPF' onChange={(newValue:string)=>props.setFieldValue('user', newValue)}  values={props.values} errors={props.errors.user} touched={props.touched.user} setFieldValue={props.setFieldValue} />
                                                            }
                                                            <ErrorMessage name='user' component={'small'} className='invalid-feedback' />
                                                        </div>
                                                        <div className="fv-row mb-3 position-relative login-password">
                                                            {/* <Field type={passwordType} placeholder="Senha" name="password" autoComplete='off' className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`} /> */}
                                                            <ChangePassword 
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
            </div>
            <CookieConsent
                location="bottom"
                buttonWrapperClasses="w-100 d-flex justify-content-center"
                style={{position:'absolute', right:0, left:'auto'}}
                containerClasses="w-500px rounded-4 mb-3 me-3"
                buttonText="Aceitar cookies"
                buttonClasses='btn btn-success bg-success text-white rounded'
                hideOnAccept
                hideOnDecline
                enableDeclineButton
                declineButtonText="Negar cookies"
                declineButtonClasses="btn btn-dark border border-dark bg-transparent text-white rounded"
                declineCookieValue='false'
                onDecline={()=>setCookie(false)}
                onAccept={()=>setCookie(true)}
                cookieName="consent"
                expires={150}
            >
                <div id="consent-btn" className="w-100 d-flex flex-column align-items-center">
                    <i className="bi bi-shield-check text-success mb-5" style={{fontSize:50}}></i>
                    <h3 className="text-light">
                        Usamos cookies para validar sua autenticação.
                    </h3>
                    <small>Não usamos seus dados para fins comerciais.</small>
                    <small><a href="https://unisatc.com.br/politica-de-privacidade/" target={"_blank"}>[ Leia nossa Política de Privacidade ]</a></small>
                </div>
            </CookieConsent>
        </div>
    )
}