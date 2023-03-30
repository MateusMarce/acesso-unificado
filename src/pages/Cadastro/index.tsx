import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import * as Yup from 'yup'

import { CadastroType } from '../../assets/types/type'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import ChangePassword from '../../components/Buttons/ChangePassword'
import CpfField from '../../components/Fields/CpfField'
import EmailField from '../../components/Fields/EmailField'
import validateRequest from '../../helpers/validateRequest'
import api from '../../services/api'

const Schema = Yup.object().shape({
    cpf: Yup.string().required('Este campo é obrigatório.'),
    nome: Yup.string().required('Este campo é obrigatório.'),
    email: Yup.string().required('Este campo é obrigatório.').email('Digite um e-mail válido.'),
    password: Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
    password_confirmation: Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.').oneOf([Yup.ref('password')], 'As senhas não são iguais.'),
})

export default function Cadastro() {
    

    const handleSubmit = async (values:FormikValues, action:FormikHelpers<CadastroType>) => {
        action.setSubmitting(true)

        //requisiçao
        try {
            let res = await api.post('/cadastro/createuser', values)
            validateRequest(res)
            
        } catch (error) {
            validateRequest(error)
            
        }
        action.setSubmitting(false)
    }
    const handleChange =async (value:any, setFieldValue:any) => {
        let cpf = value.replaceAll('.','').replace('-','')
        setFieldValue('cpf', cpf)
        try {
            if(cpf.length === 11){
                let res = await api.get(`/cadastro/checkcpf?cpf=${cpf}`)
                validateRequest(res.data)
            }
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
                                    cpf:'',
                                    nome:'',
                                    email:'',
                                    password:'',
                                    password_confirmation:''
                                }}
                                validationSchema={Schema}
                                onSubmit={handleSubmit}
                            >
                                
                                {(props:FormikProps<CadastroType>) => (
                                    <Form className='form w-100'>
                                        <div className="text-center mb-11">
                                        <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                        <div className="text-gray-700 fw-semibold fs-6">
                                            Já tem cadastro? <Link to="/" className="link-success">Entre na sua conta</Link>
                                        </div>
                                        </div>
                                        <div className="separator separator-content border-dark my-14">
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Ou insira os dados</span>
                                        </div>
                                        <div className="fv-row mb-3">
                                            <CpfField autoFocus={false} onChange={(t:any)=>handleChange(t.target.value, props.setFieldValue)} type="text" value={props.values.cpf} placeholder="CPF" name="cpf" autoComplete='off' className={`form-control bg-transparent ${props.errors.cpf && props.touched.cpf ? 'is-invalid' : ''}`}/> 
                                            <ErrorMessage name='cpf' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row mb-3">
                                            <Field type="text" placeholder="Nome" name="nome" autoComplete='off' className={`form-control bg-transparent ${props.errors.nome && props.touched.nome && 'is-invalid'}`}/>
                                            <ErrorMessage name='nome' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row mb-8">
                                            <EmailField name='email' placeholder='E-mail' onChange={(newValue:string)=>props.setFieldValue('email', newValue)}  values={props.values} errors={props.errors.email} touched={props.touched.email} setFieldValue={props.setFieldValue} />
                                            <ErrorMessage name='email' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row mb-3 login-password position-relative">
                                            {/* <Field type="password" placeholder="Senha" name="password" autoComplete='off' className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`}/> */}
                                            <ChangePassword 
                                                name='password'
                                                placeholder='Senha'
                                                errors={props.errors.password}
                                                touched={props.touched.password}
                                            />
                                            <ErrorMessage name='password' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-8 login-password position-relative">
                                            {/* <Field type="password" placeholder="Confirmar senha" name="password_confirmation" autoComplete='off' className={`form-control bg-transparent ${props.errors.password && props.touched.password && 'is-invalid'}`}/> */}
                                            <ChangePassword 
                                                name='password_confirmation'
                                                placeholder='Confirmar senha'
                                                errors={props.errors.password_confirmation}
                                                touched={props.touched.password_confirmation}
                                            />
                                            <ErrorMessage name='password_confirmation' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className="d-grid mb-10">
                                            <button type="submit" id="kt_sign_in_submit" className="btn btn-success">
                                                {props.isSubmitting ?
                                                    <span className="indicator-progress">Por favor, aguarde...<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                    :
                                                    <span className="indicator-label">Cadastrar</span>
                                                }
                                            </button>
                                        </div>
                                        <div className="text-gray-700 text-center fw-semibold fs-6"><a href="https://unisatc.com.br/politica-de-privacidade/" target={'_blank'} className="link-success">Política de Privacidade</a></div>
                                    </Form>
                                )}

                            </Formik>
                        </div>
                    </div>      
                    <div className="d-flex flex-center flex-wrap px-5">
                        <div className="text-gray-700 text-center fw-semibold fs-6">{new Date().getFullYear()} &copy; <a href="#" className="link-success">TI SATC</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}