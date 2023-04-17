import { Field } from "formik"
import { useState } from "react"
import { ChangePasswordType } from "../../assets/types/type"

export default function ChangePassword({name, errors, touched, placeholder}:ChangePasswordType) {
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password')
    
    const handleChangePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    return (
        <>
            <Field type={passwordType} placeholder={placeholder} name={name} autoComplete='off' className={`form-control form-control-lg bg-transparent ${errors && touched && 'is-invalid'}`} />
            <button onClick={handleChangePasswordVisibility} type='button' className={`password-control ${passwordType === 'text' && 'view'}`}></button>
        </>
    )
}