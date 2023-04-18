import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import * as Yup from 'yup'

import { CadastroType } from '../../assets/types/type'
import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import CpfField from '../../components/Fields/CpfField'
import validateRequest from '../../helpers/validateRequest'
import api from '../../services/api'
import { useState, useEffect } from 'react'
import Cadastro_FormColaborador from '../../components/Cadastro_FormColaborador'
import Cadastro_FormAluno from '../../components/Cadastro_FormAluno'
import { toast } from 'react-toastify'
import ChangePassword from '../../components/Buttons/ChangePassword'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useCookies } from 'react-cookie'


export default function Cadastro() {
    const [cookies, setCookies, removeCookies] = useCookies(['consent', 'login', 'theme'])
    const [dados, setDados] = useState<any>({})
    const [colaborador, setColaborador] = useState<boolean>(false)
    const [aluno, setAluno] = useState<boolean>(false)
    const [senha, setSenha] = useState<boolean>(false)
    const [alunoEmail, setAlunoEmail] = useState<string>('')
    const [cpfVal, setCpfVal] = useState<string>('')
    const Schema = Yup.object().shape({
        aluno:Yup.boolean(),
        colaborador:Yup.boolean(),
        cpf: Yup.string().required('Este campo é obrigatório.'),
        password_old: Yup.string().min(5, 'A senha deve conter 5 caractéres.'),
        senha_atual: Yup.string().min(5, 'A senha deve conter 5 caractéres.').when('colaborador', 
        (val, schema) => {
            if(val[0] === true){
                return schema.required('Este campo é obrigatório.')
            } else {
                return schema.notRequired()
            }
        }),
        password_confirmation: Yup.string().min(5, 'A senha deve conter 5 caractéres.').oneOf([Yup.ref('password_old')], 'As senhas não são iguais.'),
        email: Yup.string().email('Digite um e-mail válido.').when('aluno', 
        (val, schema)=> {
            if(val[0] === true){
                return schema.required('Este campo é obrigatório.')
            } else {
                return schema.notRequired()
            }
        }),
        valor: Yup.string().when('aluno', 
        (val, schema) => {
            if(val[0] === true){
                return schema.required('Este campo é obrigatório.')
            } else {
                return schema.notRequired()
            }
        }),
        campo: Yup.number().when('aluno', 
        (val, schema) => {
            if(val[0] === true){
                return schema.required('Este campo é obrigatório.')
            } else {
                return schema.notRequired()
            }
        }),
    })
    const {cpf} = useParams()
    const navigate = useNavigate()
    let consent = document.getElementById('consent-btn')

    useEffect(()=>{
        if(cpf) {
            setCpfVal(cpf)
            handleChange(cpf)
        }
    },[])

    const handleSubmit = async (values:FormikValues, action:FormikHelpers<CadastroType>) => {
        action.setSubmitting(true)

        //requisiçao
        try {
            let val = {...values}
            delete val.aluno
            delete val.colaborador

            if(aluno){
                //VERIFICA SE EH ALUNO
                delete val.password_old
                delete val.password_confirmation
                if(!senha){
                    //SE NAO TIVER OS CAMPOS DE SENHA, CONFIRMA USUARIO
                    try {
                        let res = await api.get(`/cadastro/confirm?campo=${val.campo}&cpf=${val.cpf}&valor=${val.valor}&email=${val.email}`)
                        validateRequest(res)
                        if(res.status === 200) {
                            setSenha(true)
                        }
                        
                    } catch (error) {
                        validateRequest(error)
                    }
                } else {
                    //CRIA USUARIO DPS DE COLOCAR SENHA
                    delete val.senha_atual
                    try {
                        let res = await api.post('/cadastro/createuser', {...val, nome: dados.nome, password: values.password_old})
                        validateRequest(res)
                        //LOGA COM O USUARIO DPS DE CADASTRAR
                        if(!consent || cookies.consent === 'true' && res.status === 200){
                            let value = {user: val.cpf, password:values.password_old}
                            let res = await api.post('/auth/login', value)
                            setCookies('login', res.data.content, {path:'/acesso-unificado'})
                            navigate('/painel')
                            validateRequest(res)
                        } else {
                            toast.error('Não é possivel acessar nosso portal sem aceitar os cookies.', {autoClose:2000, theme: cookies.theme ==='light'?'light':'dark'})
                        }
                        
                    } catch (error) {
                        validateRequest(error)
                    }
                }
            } else if(colaborador) {
                val = {...val, nome:dados.nome, usuario:dados.e_mail, password:val.password_old}
                delete val.valor
                delete val.campo
                delete val.password_old
                delete val.password_confirmation
                delete val.email
                try {
                    let res = await api.post('/cadastro/updatepassAD', val)
                    validateRequest(res)
                    //LOGA COM O USUARIO DPS DE CADASTRAR
                    if(!consent || cookies.consent === 'false' && res.status === 200){
                        let value = {user: val.cpf, password:val.password_old}
                        let res = await api.post('/auth/login', value)
                        setCookies('login', res.data.content, {path:'/acesso-unificado'})
                        navigate('/painel')
                        validateRequest(res)
                    } else {
                        toast.error('Não é possivel acessar nosso portal sem aceitar os cookies.', {autoClose:2000, theme: cookies.theme ==='light'?'light':'dark'})
                    }
                    
                } catch (error) {
                    console.log(error);
                    validateRequest(error)
                    
                }
            }
            
            
        } catch (error) {
            validateRequest(error)
            
        }
        action.setSubmitting(false)
    }
    const handleChange = async (value:any, setFieldValue?:any) => {
        let cpf = value.replaceAll('.','').replace('-','')
        console.log(value);
        
        setCpfVal(cpf)
        if(setFieldValue) setFieldValue('cpf', cpf)
        setSenha(false)
        try {
            if(cpf.length === 11){
                let res = await api.get(`/cadastro/checkcpf?cpf=${cpf}`)
                setDados(res.data)
                validateRequest(res.data)
                if(res.data.tipo === "colaborador") {
                    setColaborador(true)
                    setAluno(false)
                    toast.success(`Identificamos que você é um ${res.data.tipo}. Preencha os campos seguintes.`)
                }
                if(res.data.tipo === "aluno" || res.data.tipo === "responsavel") {
                    toast.success(`Identificamos que você é um ${res.data.tipo}. Preencha os campos seguintes.`)
                    setAluno(true)
                    setColaborador(false)
                    setAlunoEmail(res.data.email_verificar)
                }
                // setFieldValue('email', res.data.colaborador.e_mail)
                // setFieldValue('nome', res.data.colaborador.nome)
                
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
                                    aluno:aluno,
                                    colaborador:colaborador,
                                    cpf: cpfVal || '',
                                    nome:'',
                                    email:'',
                                    password_old:'',
                                    senha_atual:'',
                                    password_confirmation:'',
                                    valor:'',
                                    campo:0
                                }}
                                validationSchema={Schema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                
                                {(props:FormikProps<CadastroType>) => {
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
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Ou insira os dados</span>
                                        </div>

                                        <div className="fv-row mb-3">
                                            <CpfField autoFocus={false} onChange={(t:any)=>handleChange(t.target.value, props.setFieldValue)} type="text" value={cpfVal} placeholder="CPF" name="cpf" autoComplete='off' className={`form-control form-control-lg bg-transparent ${props.errors.cpf && props.touched.cpf ? 'is-invalid' : ''}`}/> 
                                            <ErrorMessage name='cpf' component={'small'} className='invalid-feedback' />
                                        </div>
                                        <div className='visually-hidden'>{props.values.campo}</div>
                                        {aluno &&
                                            <>
                                                <Cadastro_FormAluno
                                                    errors={props.errors.valor}
                                                    touched={props.touched.valor}
                                                    errors_email={props.errors.email} 
                                                    touched_email={props.touched.email}
                                                    email={alunoEmail}
                                                    setFieldValue={props.setFieldValue}
                                                />
                                                {senha &&
                                                    <>
                                                        <div className="fv-row mb-3 login-password position-relative">
                                                            <ChangePassword 
                                                                name='password_old'
                                                                placeholder='Senha nova'
                                                                errors={props.errors.password_old}
                                                                touched={props.touched.password_old}
                                                            />
                                                            <ErrorMessage name='password_old' component={'small'} className='invalid-feedback' />
                                                            {props.values.password_old &&
                                                                <PasswordStrengthBar 
                                                                    password={props.values.password_old} 
                                                                    className='w-100'
                                                                    scoreWords={['Ruim', 'Fraca', 'Boa', 'Ótima', 'Excelente']}
                                                                    minLength={5}
                                                                    shortScoreWord='Muito curto'
                                                                />
                                                            }
                                                        </div>
                                                        <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-8 login-password position-relative">
                                                            <ChangePassword 
                                                                name='password_confirmation'
                                                                placeholder='Confirmar senha'
                                                                errors={props.errors.password_confirmation}
                                                                touched={props.touched.password_confirmation}
                                                            />
                                                            <ErrorMessage name='password_confirmation' component={'small'} className='invalid-feedback' />
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        }
                                        {colaborador &&
                                            <Cadastro_FormColaborador
                                                values={props.values.password_old} 
                                                errors={props.errors.password_old} 
                                                touched={props.touched.password_old}
                                                errors_conf={props.errors.password_confirmation} 
                                                touched_conf={props.touched.password_confirmation}
                                                errors_old={props.errors.senha_atual} 
                                                touched_old={props.touched.senha_atual} 
                                            />
                                        }

                                        
                                        {(aluno || colaborador) &&
                                            <div className="d-grid mt-8">
                                                <button type={'button'} onClick={()=>props.submitForm()} id="kt_sign_in_submit" className="btn btn-success">
                                                    {props.isSubmitting ?
                                                        <span className="indicator-progress">Por favor, aguarde...<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                        :
                                                        <span className="indicator-label">Cadastrar</span>
                                                    }
                                                </button>
                                            </div>
                                        }
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
            </div>
        </div>
    )
}