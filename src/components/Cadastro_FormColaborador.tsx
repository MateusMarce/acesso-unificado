import PasswordStrengthBar from "react-password-strength-bar";
import ChangePassword from "./Buttons/ChangePassword";
import { ErrorMessage } from "formik";



export default function Cadastro_FormAluno(props:any) {

    return (
        <div>
            {(props) &&
                <>
                    <div className="fv-row mb-3 login-password position-relative">
                        <ChangePassword 
                            name='senha_atual'
                            placeholder='Senha antiga'
                            errors={props.errors_old}
                            touched={props.touched_old}
                        />
                        <ErrorMessage name='senha_atual' component={'small'} className='invalid-feedback' />
                    </div>
                    <div className="fv-row mb-3 login-password position-relative">
                        <ChangePassword 
                            name='password_old'
                            placeholder='Senha nova'
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