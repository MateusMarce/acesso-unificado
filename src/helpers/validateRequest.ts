import { toast } from 'react-toastify'

export default function validateRequest(props:any) {
    switch (props.response.status) {
        case 200:
            toast.success(props.data.message, {autoClose:3000})
            break;
        case 400:
            toast.error('Ocorreu um erro inesperado!', {autoClose:3000})
            break;
        case 401:
            toast.error(props.response.data.error, {autoClose:3000})
            break;
        case 406:
            toast.info(props.response.data.error, {autoClose:4000})
            break;
        case 422:
            toast.error('Preencha todos os dados!', {autoClose:3000})
            break;
        case 500:
            toast.error('Ocorreu um erro por parte do servidor!', {autoClose:3000})
            break;
    
        default:
            break;
    }
}