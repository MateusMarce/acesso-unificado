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
import CookieConsent from 'react-cookie-consent'
import Cadastro_FormExterno from '../../components/Cadastro_FormExterno'


export default function Cadastro() {
    const [cookies, setCookies] = useCookies(['consent', 'login', 'theme'])
    const [cookie, setCookie] = useState<boolean>(cookies.consent && cookies.consent === 'true' ? true : false)
    const [dados, setDados] = useState<any>({})
    const [colaborador, setColaborador] = useState<boolean>(false)
    const [aluno, setAluno] = useState<boolean>(false)
    const [externo, setExterno] = useState<boolean>(false)
    const [senha, setSenha] = useState<boolean>(false)
    const [alunoEmail, setAlunoEmail] = useState<string>('')
    const [cpfVal, setCpfVal] = useState<string>('')
    const [value, setValue] = useState('')
    const [campo, setCampo] = useState(0)
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
        telefone: Yup.string().min(15, 'Preencha um número válido.').required('Este campo é obrigatório.'),
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
        if(cpf && !cpf.includes('@')) {
            setCpfVal(cpf)
            handleChange(cpf)
        }
    },[])

    const handleSubmit = async (values:FormikValues, action:FormikHelpers<CadastroType>) => {
        action.setSubmitting(true)
        console.log(values.telefone.replace('(','').replace(')','').replace('-','').replace(' ','').replaceAll('_','').length);
        
        
        //requisiçao
        if(values.telefone.replace('(','').replace(')','').replace('-','').replace(' ','').replaceAll('_','').length >= 10) {
            try {
                let val = {...values}
                val = {...val, cpf:val.cpf.replaceAll('.','').replace('-',''), telefone: val.telefone.replace('(','').replace(')','').replace('-','').replace(' ','')}
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
                            if(cookie && res.status === 200){
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
                        if(cookie && res.status === 200){
                            let value = {user: val.cpf, password:values.password_old}
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
                } else if(externo) {
                    val = {...val, password:val.password_old}
                    delete val.valor
                    delete val.campo
                    delete val.senha_atual
                    delete val.password_confirmation
                    delete val.password_old
                    console.log(val);
                    
                    try {
                        
                        let res = await api.post('/cadastro/createuser', val)
                        validateRequest(res)
                        // LOGA COM O USUARIO DPS DE CADASTRAR
                        if(cookie && res.status === 200){
                            let value = {user: val.cpf, password:values.password_old}
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
        } else {
            toast.error('Preencha um telefone válido.', {autoClose:3000, pauseOnFocusLoss:false, pauseOnHover:false, theme:cookies.theme==='light'?'light':'dark'})
        }
        action.setSubmitting(false)
    }
    const handleChange = async (value:any, setFieldValue?:any) => {
        setCpfVal(value)
        let cpf = value.replaceAll('.','').replace('-','')
        
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
                    toast.success(`Identificamos que você é um ${res.data.tipo}. Preencha os campos seguintes.`, {autoClose:4000,theme:cookies.theme==='light'?'light':'dark'})
                }
                if(res.data.tipo === "externo") {
                    setColaborador(false)
                    setAluno(false)
                    setExterno(true)
                    toast.success(`Identificamos que você não tem relação com a Satc. Preencha os campos seguintes.`, {autoClose:4000,theme:cookies.theme==='light'?'light':'dark'})
                }
                if(res.data.tipo === "aluno" || res.data.tipo === "responsavel") {
                    toast.success(`Identificamos que você é um ${res.data.tipo}. Preencha os campos seguintes.`, {autoClose:4000,theme:cookies.theme==='light'?'light':'dark'})
                    setAluno(true)
                    setColaborador(false)
                    setAlunoEmail(res.data.email_verificar)
                    VerificarDataAleatorio()
                }                
            }
        } catch (error) {
            validateRequest(error)
        }
    }
    const VerificarDataAleatorio = () => {
        const v = Math.floor(Math.random() * 3)
        const date_conf = [
            {
                id:1,
                title:'dia'
            },
            {
                id:2,
                title:'mês'
            },
            {
                id:3,
                title:'ano'
            },
        ]
        setCampo(date_conf[v].id)
        setValue(date_conf[v]?.title)
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
                                    aluno:aluno,
                                    colaborador:colaborador,
                                    cpf: cpfVal || '',
                                    nome:'',
                                    email:'',
                                    telefone:'',
                                    password_old:'',
                                    senha_atual:'',
                                    password_confirmation:'',
                                    valor:'',
                                    campo:campo
                                }}
                                validationSchema={Schema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                
                                {(props:FormikProps<CadastroType>) => {
                                    // console.log(props.values.campo);
                                    
                                    return(
                                    <Form className='form w-100'>
                                        <div className="text-center mb-11">
                                            <h1 className="text-dark fw-bolder mb-3">Acesso Unificado</h1>
                                            <div className="text-gray-700 fw-semibold fs-6">
                                                Já tem cadastro? <Link to="/" className="link-success">Entre na sua conta</Link>
                                            </div>
                                        </div>
                                        <div className="separator separator-content border-dark my-14">
                                            <span className="w-175px text-gray-700 fw-semibold fs-7">Faça seu <b>Cadastro</b></span>
                                        </div>

                                        <div className="fv-row mb-3">
                                            <CpfField autoFocus={false} onChange={(t:any)=>handleChange(t.target.value, props.setFieldValue)} type="text" value={cpfVal} placeholder="CPF" name="cpf" autoComplete='off' className={`form-control form-control-lg bg-transparent ${props.errors.cpf && props.touched.cpf ? 'is-invalid' : ''}`}/> 
                                            <ErrorMessage name='cpf' component={'small'} className='invalid-feedback' />
                                        </div>
                                        {aluno &&
                                            <>
                                                <Cadastro_FormAluno
                                                    errors={props.errors.valor}
                                                    touched={props.touched.valor}
                                                    errors_email={props.errors.email} 
                                                    touched_email={props.touched.email}
                                                    errors_fone={props.errors.telefone} 
                                                    touched_fone={props.touched.telefone} 
                                                    email={alunoEmail}
                                                    setFieldValue={props.setFieldValue}
                                                    value={value}
                                                />
                                                {senha &&
                                                    <>
                                                        <div className="fv-row mb-3 login-password position-relative">
                                                            <ChangePassword 
                                                                tabIndex={4}
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
                                                                tabIndex={5}
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
                                                errors_fone={props.errors.telefone} 
                                                touched_fone={props.touched.telefone} 
                                            />
                                        }
                                        {externo &&
                                            <Cadastro_FormExterno
                                                values={props.values.password_old} 
                                                errors={props.errors.password_old} 
                                                touched={props.touched.password_old}
                                                errors_conf={props.errors.password_confirmation} 
                                                touched_conf={props.touched.password_confirmation}
                                                errors_nome={props.errors.nome} 
                                                touched_nome={props.touched.nome} 
                                                errors_email={props.errors.email} 
                                                touched_email={props.touched.email} 
                                                errors_fone={props.errors.telefone} 
                                                touched_fone={props.touched.telefone} 
                                            />
                                        }

                                        
                                        {(aluno || colaborador || externo) &&
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