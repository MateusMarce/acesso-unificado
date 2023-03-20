import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FormikProps, FormikValues } from 'formik/dist/types'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import CpfField from '../../components/Fields/CpfField'
import EmailField from '../../components/Fields/EmailField'
import api from '../../services/api'
import validateRequest from '../../helpers/validateRequest'
import { Link } from 'react-router-dom'

const Schema = Yup.object().shape({
    user: Yup.string().required('Este campo é obrigatório.'),
    password: Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
})

export default function Cadastro() {
    

    const handleSubmit = async (values:FormikValues) => {
        let user_new;
        if(values.user.match(/[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/)){
            user_new = values.user
        } else {
            user_new = values.user.replaceAll('.','').replace('-','')
        }
        const value = {user: user_new, password:values.password}
        try {
            let res = await api.post('/auth/login', value)
            validateRequest(res)
            
        } catch (error) {
            validateRequest(error)
            
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
                                    user:'',
                                    password:''
                                }}
                                validationSchema={Schema}
                                onSubmit={handleSubmit}
                            >
                                
                                {(props:FormikProps<{user:string, password:string}>) => (
                                    <Form className='form w-100'>
                                        <div className="text-center mb-11">
                                        <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                        <div className="text-gray-700 fw-semibold fs-6">
                                            Já tem cadastro? <Link to="/" className="link-success">Faça o seu login</Link>
                                        </div>
                                        </div>
                                        <div className="separator separator-content my-14">
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Ou insira os dados</span>
                                        </div>
                                        <div className="fv-row mb-8">
                                            {props.values.user && props.values.user.match(/[0-9]+/) ?
                                                <CpfField type="text" value={props.values.user} placeholder="Email ou CPF" name="user" autoComplete='off' className={`form-control bg-transparent ${props.errors.user && props.touched.user ? 'is-invalid' : ''}`}/> 
                                                :
                                                // <Field type="text" placeholder="Email ou CPF" name="user" autoComplete='off' className={`form-control bg-transparent ${props.errors.user && props.touched.user ? 'is-invalid' : ''}`}/> 
                                                <EmailField name='user' onChange={(newValue:string)=>props.setFieldValue('user', newValue)}  values={props.values} errors={props.errors} touched={props.touched} setFieldValue={props.setFieldValue} />
                                            }
                                            <ErrorMessage name='user' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row mb-3">
                                            <Field type="password" placeholder="Password" name="password" autoComplete='off' className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`}/>
                                            <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row mb-3">
                                            <Field type="password" placeholder="Password" name="password" autoComplete='off' className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`}/>
                                            <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                                            <Field type="password" placeholder="Password" name="password" autoComplete='off' className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`}/>
                                            <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
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