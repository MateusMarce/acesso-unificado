import { Dispatch, SetStateAction } from "react"

export type LoginType = {
    user: string
    password: string
}
export type EsqueceuSenhaType = {
    email: string
}
export type CadastroType = {
    cpf:string,
    nome:string,
    email:string,
    password:string,
    password_confirmation:string
}
export type ChangePasswordType = {
    name:string
    errors:string | undefined
    touched:boolean | undefined
    placeholder: string
}

export type ThemeContextType = {
    mode?:string;
    setMode?:Dispatch<SetStateAction<string>>
}
