import { ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";



export default function Cadastro_FormAluno(props:any) {
    const [value, setValue] = useState('')

    useEffect(()=>{
        VerificarDataAleatorio()
    },[])

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
        props.setFieldValue('campo', date_conf[v]?.id)
        setValue(date_conf[v]?.title)
    }
    

    return (
        <>
            <div className="fv-row mb-3">
                <Field
                    className={`form-control form-control-lg bg-transparent mt-1 ${(props.errors && props.touched) && 'is-invalid'}`}
                    name='valor'
                    placeholder={`Digite seu ${value} de nascimento, exemplo: ${value != 'ano' ? '01' : new Date().getFullYear()}`}
                    maxLength={value != 'ano' ? 2 : 4}
                    minLength={value === 'ano' ? 3 : 0}
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