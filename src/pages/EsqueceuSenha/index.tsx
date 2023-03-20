import { Formik, Form, Field, ErrorMessage, FormikBag } from 'formik'
import * as Yup from 'yup'
import { FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import CpfField from '../../components/Fields/CpfField'
import EmailField from '../../components/Fields/EmailField'
import api from '../../services/api'
import validateRequest from '../../helpers/validateRequest'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { EsqueceuSenhaType } from '../../assets/types/type'
import ChangePassword from '../../components/Buttons/ChangePassword'
import { toast } from 'react-toastify'

const Schema = Yup.object().shape({
    email: Yup.string().required('Este campo é obrigatório.').email('Digite um e-amil válido.'),
})

export default function EsqueceuSenha() {
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password')

    const handleSubmit = async (values:FormikValues, action:FormikHelpers<EsqueceuSenhaType>) => {
        action.setSubmitting(true)
        toast.error('Recurso indisponível no momento!')
        // try {
        //     let res = await api.post('/auth/login', values)
        //     validateRequest(res)
            
        // } catch (error) {
        //     validateRequest(error)
            
        // }
        
        action.setSubmitting(false)
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
                                    email:''
                                }}
                                validationSchema={Schema}
                                onSubmit={handleSubmit}
                            >
                                
                                {(props:FormikProps<EsqueceuSenhaType>) => (
                                    <Form className='form w-100'>
                                        <div className="text-center mb-11">
                                        <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                        <div className="text-gray-700 fw-semibold fs-6">
                                            Lembrou da senha? <Link to='/' className="link-success">Entre na sua conta</Link>
                                        </div>
                                        </div>
                                        <div className="separator separator-content my-14">
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Ou insira os dados</span>
                                        </div>
                                        <div className="fv-row mb-8">
                                            <EmailField 
                                                name='email' 
                                                placeholder='E-mail' 
                                                onChange={(newValue:string)=>props.setFieldValue('email', newValue)} 
                                                values={props.values} 
                                                errors={props.errors.email} 
                                                touched={props.touched.email} 
                                                setFieldValue={props.setFieldValue} 
                                            />
                                            <ErrorMessage name='email' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="d-grid mb-10">
                                            <button type="submit" id="kt_sign_in_submit" className="btn btn-success">
                                                {props.isSubmitting ?
                                                    <span className="indicator-progress">Por favor, aguarde...<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                    :
                                                    <span className="indicator-label">Enviar e-mail</span>
                                                }
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