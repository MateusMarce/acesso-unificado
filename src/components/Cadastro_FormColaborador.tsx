import PasswordStrengthBar from "react-password-strength-bar";
import ChangePassword from "./Buttons/ChangePassword";
import { ErrorMessage, Field } from "formik";
import FoneField from "./Fields/FoneField";



export default function Cadastro_FormColaborador(props:any) {

    return (
        <div>
            {(props) &&
                <>
                    {props.dados.sugestoes_usuarios && 
                        <div>
                            <Field as="select" className="form-select bg-transparent mb-3" style={{border:" 1px solid #92929254"}} name="login" id="login">
                            <option value=''>Selecione um usuário para sua conta</option>
                            {props.dados.sugestoes_usuarios.length > 0 && props.dados.sugestoes_usuarios.map((i:string, k:number)=>(
                                <option key={k} value={i}>{i}</option>
                            ))}
                            </Field>
                        </div>
                    }
                    {(!props.dados.sugestoes_usuarios || props.dados.sugestoes_usuarios.length == 0) && 
                        <div className="fv-row mb-3 login-password position-relative">
                            <ChangePassword
                                tabIndex={6}
                                name='senha_atual'
                                placeholder='Senha atual'
                                errors={props.errors_old}
                                touched={props.touched_old}
                            />
                            <ErrorMessage name='senha_atual' component={'small'} className='invalid-feedback' />
                        </div>
                    }
                    <div className="fv-row mb-3 login-password position-relative">
                        <ChangePassword
                            tabIndex={7}
                            name='password_old'
                            placeholder='Nova senha'
                            errors={props.errors}
                            touched={props.touched}
                        />
                        <ErrorMessage name='password_old' component={'small'} className='invalid-feedback' />
                        {props.values &&
                            <PasswordStrengthBar 
                                password={props.values} 
                                className='w-100'
                                scoreWords={['Péssimo', 'Fraco', 'Bom', 'Ótimo', 'Excelente']}
                                minLength={5}
                                shortScoreWord='Muito curto'
                            />
                        }
                    </div>
                    <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-8 login-password position-relative">
                        <ChangePassword
                            tabIndex={8}
                            name='password_confirmation'
                            placeholder='Confirmar senha'
                            errors={props.errors_conf}
                            touched={props.touched_conf}
                        />
                        <ErrorMessage name='password_confirmation' component={'small'} className='invalid-feedback' />
                    </div>
                </>
            }
        </div>
    )
}