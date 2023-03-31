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
    classe:string
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

export type RamaisType = {
    ramais: [
        {
            ramal: number,
            nome_ramal:string
            lista_usuarios:string
            ativo: "S" | "N"
        } | any
    ],
    i_unidade:string
    nome_unidade:string
} | any

export type ComunicadosType = {
    id: number,
    titulo: string
    conteudo: string
    dt_publicacao: string
    dt_limite_publicacao: string
    imagem: string
    link: string
    publico_alvo: string
    usuario: string
    dt_sistema: string
    leitura: string
}

export type SlidesType = {
    id: number,
    titulo: string
    resumo: string
    url: string
    imagem: string
    dt_inicio_publicacao: string
    dt_fim_publicacao: string
    usuario: string
    publico_alvo: string
    dt_sistema: string
}