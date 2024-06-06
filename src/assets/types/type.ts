import { Dispatch, SetStateAction } from "react"

export type LoginType = {
    user: string
    password: string
}
export type QrType = {
    user: string
    password: string
    codigo2fa:string
}
export type EsqueceuSenhaType = {
    email: string
}
export type CadastroType = {
    cpf:string,
    nome:string,
    email:string,
    telefone:string,
    password_old:string
    senha_atual:string,
    password_confirmation:string
    valor:string
    campo:number
    aluno:boolean
    colaborador:boolean
}
export type TrocaSenhaType = {
    email:string,
    password_old:string
    senha_atual:string,
    password_confirmation:string
}
export type ChangePasswordType = {
    name:string
    errors:string | undefined
    touched:boolean | undefined
    placeholder: string
    tabIndex:number | string
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

export type ChequeType = {
    competencia:string,
    dt_pgto:string,
    tipo_folha_desc:string,
    url:string
}

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
    dt_publicacao:string
}

export type AlumniDadosType = 
    {
        justificativa: string
        niveis: [
            {
                id: number,
                i_empresa: string
                nome: string
            }
        ],
        areas: [
            {
                id: number,
                nome: string
            }
        ],
        id_egresso: string
        matriculas: [
            {
                i_empresa: string
                i_curso: string
                nome_curso: string
                i_aluno: string
                semestre: string
                isTecnico: string
                id_nivel: string
                ordem: string
            }
        ],
        i_curso: string
        nome_curso: string
        id_nivel: string
        isAluno: 5,
        curso: {
            i_curso: string
            nome: string
        },
        retorno: number,
        dados_retorno: {
            alert: string
            icon: string
            txt: string
        },
        eventos_alumni: [
            {
                post_title: string
                post_content: string
                guid: string
                dt_inicio: string
                dt_fim: string
            }
        ],
        agenda_alumni: [
            {
                comunicados: [
                    {
                        id: number,
                        titulo: string
                        conteudo: string
                        link: string
                        dt_evento_br: string
                        ano_evento: string
                        dia_evento: number,
                        dia_semana_evento: string
                        mes_evento_desc: string
                        mes_evento: string
                    }
                ],
                titulo: string
            }
        ]
}

export type AlumniSalariosType = [
    [
        string
    ]
]

export type DependentesType = 
    {
        i_aluno: number,
        nome: string
        cpf: string
        i_empresa: number,
        email: string
        url: string
        cursos: [
            {
                i_empresa: number,
                nome: string
                turma: string
            }
        ]
    }

export type EmailType = {
    assunto:string
    conteudo:string
}