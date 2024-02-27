import PasswordStrengthBar from "react-password-strength-bar";
import ChangePassword from "./Buttons/ChangePassword";
import { ErrorMessage, Field } from "formik";
import FoneField from "./Fields/FoneField";



export default function Cadastro_FormExterno(props:any) {

    return (
        <div>
            {(props) &&
                <>
                    <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-3 login-password position-relative">
                        <Field name='nome' placeholder='Nome' className={`form-control form-control-lg bg-transparent ${props.errors_nome && props.touched_nome && 'is-invalid'}`} />
                        <ErrorMessage name='nome' component={'small'} className='invalid-feedback' />
                    </div>
                    <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-3 login-password position-relative">
                        <Field name='email' type='email' placeholder='E-mail' className={`form-control form-control-lg bg-transparent ${props.errors_email && props.touched_email && 'is-invalid'}`} />
                        <ErrorMessage name='email' component={'small'} className='invalid-feedback' />
                    </div>
                    <div className="fv-row d-flex flex-stack flex-wrap fs-base fw-semibold mb-3 login-password position-relative">
                        <FoneField name='telefone' placeholder='Telefone' className={`form-control form-control-lg bg-transparent ${props.errors_fone && props.touched_fone && 'is-invalid'}`} />
                        <ErrorMessage name='telefone' component={'small'} className='invalid-feedback' />
                    </div>
                    <div className="fv-row mb-3 login-password position-relative">
                        <ChangePassword
                            tabIndex={0}
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
                            tabIndex={0}
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