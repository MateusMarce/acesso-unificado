import { ErrorMessage, Field } from "formik";


export default function Cadastro_FormAluno(props:any) {

    return (
        <>
            <div className="fv-row mb-3">
                <Field
                    className={`form-control form-control-lg bg-transparent mt-1 ${(props.errors && props.touched) && 'is-invalid'}`}
                    name='valor'
                    placeholder={`Digite seu ${props.value} de nascimento, exemplo: ${props.value != 'ano' ? '01' : new Date().getFullYear()}`}
                    maxLength={props.value != 'ano' ? 2 : 4}
                    minLength={props.value === 'ano' ? 3 : 0}
                />
                <ErrorMessage name='email' component={'small'} className='invalid-feedback' />
            </div>
            <div className="fv-row mb-3">
                <span className="text-gray-500">Digite o e-mail completo: {props.email}</span>
                <Field
                    className={`form-control form-control-lg bg-transparent mt-1 ${(props.errors_email && props.touched_email) && 'is-invalid'}`}
                    name='email'
                    placeholder='E-mail'
                />
                <ErrorMessage name='email' component={'small'} className='invalid-feedback' />
            </div>
        </>
    )
}