import { toast } from 'react-toastify'

export default function FixName(name:string) {
    
    let full_nome = name.toLocaleLowerCase()
    let array_nome = full_nome.split(' ')
    let format_nome:string[] = []

    array_nome.map((nome:string)=>{
        let first_letra = nome[0].toUpperCase()
        let resto = nome.slice(1)
        let nome_full = first_letra+resto
        format_nome.push(nome_full)
    })

    return format_nome.join(' ')
    
}