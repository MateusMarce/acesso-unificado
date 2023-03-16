
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FormikProps } from 'formik/dist/types'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'


const Schema = Yup.object().shape({
    email: Yup.string().required('Este campo é obrigatório.').email('Digite um e-mail válido.'),
    password: Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
})

export default function Login() {
    
    return (
        <div className="d-flex flex-column flex-root h-100" id="kt_app_root">
            <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                <Login_LeftBanner />
                <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10">
                    <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                        <div className="w-lg-500px p-10">
                            <Formik
                                initialValues={{
                                    email:'',
                                    password:''
                                }}
                                validationSchema={Schema}
                                onSubmit={()=>{}}
                            >
                                
                                {(props:FormikProps<{email:string, password:string}>) => (
                                    <Form className='form w-100'>
                                        <div className="text-center mb-11">
                                        <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                        <div className="text-gray-700 fw-semibold fs-6">
                                            Primeiro acesso? <a href="#" className="link-success">Faça o seu cadastro</a>
                                        </div>
                                        </div>
                                        <div className="separator separator-content my-14">
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Ou insira os dados</span>
                                        </div>
                                        <div className="fv-row mb-8">
                                            <Field type="text" placeholder="Email" name="email" autoComplete="off" className={`form-control bg-transparent ${props.errors.email && props.touched.email && 'is-invalid'}`}/> 
                                            <ErrorMessage name='email' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row mb-3">    
                                            <Field type="password" placeholder="Password" name="password" autoComplete="off" className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`}/>
                                            <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                                            <div></div><a href="home.php" className="link-success">Esqueceu a senha?</a>
                                        </div>   
                                        <div className="d-grid mb-10">
                                            <button type="submit" id="kt_sign_in_submit" className="btn btn-success">
                                                <span className="indicator-label">Entrar</span>
                                                <span className="indicator-progress">Por favor, aguarde...<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                            </button>
                                        </div>
                                        <div className="text-gray-700 text-center fw-semibold fs-6"><a href="home.php" className="link-success">Política de Privacidade</a></div>
                                    </Form>
                                )}

                            </Formik>
                        </div>
                    </div>      
                    <div className="d-flex flex-center flex-wrap px-5">
                        <div className="text-gray-700 text-center fw-semibold fs-6">2023 &copy; <a href="#" className="link-success">TI SATC</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}