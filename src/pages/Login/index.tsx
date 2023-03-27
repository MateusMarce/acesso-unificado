import { Formik, Form, Field, ErrorMessage, FormikBag } from 'formik'
import * as Yup from 'yup'
import { FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import CpfField from '../../components/Fields/CpfField'
import EmailField from '../../components/Fields/EmailField'
import api from '../../services/api'
import validateRequest from '../../helpers/validateRequest'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LoginType } from '../../assets/types/type'
import ChangePassword from '../../components/Buttons/ChangePassword'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Schema = Yup.object().shape({
    user: Yup.string().required('Este campo é obrigatório.'),
    password: Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
})

export default function Login() {
    const [cookies, setCookies, removeCookies] = useCookies(['login', 'user', 'AcceptCookies', 'theme'])
    const navigate = useNavigate()


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
            if(cookies.AcceptCookies === 'true'){
                let res = await api.post('/auth/login', value)
                setCookies('login', res.data.content)
                navigate('/painel')
                validateRequest(res)
            } else {
                toast.error('O site não irá funcionar sem os cookies.', {autoClose:2000, theme: cookies.theme ==='light'?'light':'dark'})
            }
            
        } catch (error) {
            validateRequest(error)
            
        }
        
        action.setSubmitting(false)
    }
    const handleLogout = () => {
        removeCookies('user')
        removeCookies('login')
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
                                    user:'',
                                    password:''
                                }}
                                validationSchema={Schema}
                                onSubmit={handleSubmit}
                            >
                                
                                {(props:FormikProps<LoginType>) => (
                                    <Form className='form w-100'>
                                        <div className="text-center mb-11">
                                        <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                        <div className="text-gray-700 fw-semibold fs-6">
                                            Primeiro acesso? <Link to='cadastro' className="link-success">Faça o seu cadastro</Link>
                                        </div>
                                        </div>
                                        <div className="separator separator-content my-14">
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Ou {!cookies.login && !cookies.user ? "insira os dados" : "acesse o painel"}</span>
                                        </div>

                                        {/* LOGIN FORM */}
                                        {!cookies.login && !cookies.user &&
                                            <>
                                                <div className="fv-row mb-8">
                                                    {props.values.user && props.values.user.match(/[0-9]+/) ?
                                                        <CpfField autoFocus={true} type="text" value={props.values.user} placeholder="Email ou CPF" name="user" className={`form-control bg-transparent ${props.errors.user && props.touched.user ? 'is-invalid' : ''}`}/> 
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
                                                    <div></div><Link to='/esqueceu-senha' className="link-success">Esqueceu a senha?</Link>
                                                </div>
                                            </>
                                        }
                                        <div className="d-grid mb-10">
                                            {/* BUTTON */}
                                            {cookies.login && cookies.user ?
                                                <>
                                                    <Link to='/painel' className="btn btn-success mb-4">
                                                        Entrar
                                                    </Link>
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
        </div>
    )
}