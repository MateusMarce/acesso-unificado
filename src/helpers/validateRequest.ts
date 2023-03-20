import { toast } from 'react-toastify'

export default function validateRequest(props:any) {
    if(props.status == 200) toast.success(props.data.message ? props.data.message : 'Conectado com sucesso!', {autoClose:3000, pauseOnFocusLoss:false, pauseOnHover:false})

    if(props.response) {
        switch (props.response.status) {
            case 400:
                toast.error('Ocorreu um erro inesperado!', {autoClose:3000, pauseOnFocusLoss:false, pauseOnHover:false})
                break;
            case 401:
                toast.error(props.response.data.error, {autoClose:3000, pauseOnFocusLoss:false, pauseOnHover:false})
                break;
            case 406:
                toast.info(props.response.data.error, {autoClose:4000, pauseOnFocusLoss:false, pauseOnHover:false})
                break;
            case 422:
                toast.error('Preencha todos os dados!', {autoClose:3000, pauseOnFocusLoss:false, pauseOnHover:false})
                break;
            case 500:
                toast.error('Ocorreu um erro por parte do servidor!', {autoClose:3000, pauseOnFocusLoss:false, pauseOnHover:false})
                break;
        
            default:
                break;
        }
    }
}