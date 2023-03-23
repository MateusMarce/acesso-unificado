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
export type ModalContextType = {
    show?:boolean;
    setShow?:Dispatch<SetStateAction<boolean>>
}

export type AcessosCardType = {
    i_usuario: number,
    nome: string
    e_mail: string
    cpf: string
    tipo: string
    i_empresa: string
    nome_empresa: string
    access_token: string
    background_color: string
    icone: string
    titulo1: string
    titulo2: string
    logs_acesso:string
    liberar_acesso: boolean
    qtde_acessos:number
    dropdown:string
    logins:[{
        i_empresa: string
        nome_empresa: string
        nome_abrev: string
        logs_acesso: string
        access_token: string
    }]
}

export type DependentesType = {
    i_aluno:number
    nome:string
}