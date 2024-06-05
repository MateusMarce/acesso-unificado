import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik"
import { useState } from "react"
import api from "../../services/api"
import base64 from "base-64"
import AuthCode from "react-auth-code-input"
import { useCookies } from "react-cookie"

export default function QRCode(props:any) {
    const [cookie, setCookie] = useCookies(['user'])
    const [auth, setAuth] = useState(cookie.user.autenticacao_2fa == 'N' ? false : true)
    const [qr, setQr] = useState('')

    const gerarQR = async () => {
        try {
            let res = await api.get('/user/qrcode2fa')
            setQr(base64.decode(res.data.qrcode))
        } catch (error) {
            
        }
    }

    const handleChange = (value:string) => {
        props.setValue('codigo2fa', value)
    }

    const handleToggle = () => {
        if(!auth && cookie.user.autenticacao_2fa == 'N'){
            gerarQR()
        }
        setAuth(!auth)
    }

    return (
        <div className="row gap-3">
            <div className="d-flex align-items-center gap-2" style={{height:43}}>
                <button type="button" onClick={()=>handleToggle()} className={`btn-toggle toggle-${auth?'true':'false'}`}>
                    <div className={`check-toggle toggle-${auth?'true':'false'}`}></div>
                </button>
                <label>{auth ? 'Ativado' : 'Desativado'}</label>
            </div>
            {auth && cookie.user.autenticacao_2fa == 'N' &&
                <div>
                    <h5>1° Passo - Baixar "Google Authenticator"</h5>
                    <p>Vá para loja do seu celular, digite "Google Authenticator" e instale no dispositivo.</p>
                    <h5>2° Passo - Ler o código QR</h5>
                    <p>Clique em (+) e leia o código QR abaixo:</p>
                    <div className="mb-3 w-25 border border-white border-5 qrcode" dangerouslySetInnerHTML={{__html:qr}}></div>

                    <h5>3° Passo - Inserir os 6 dígitos</h5>
                    <p>Para salvar, insira os 6 dígitos que aparecem no celular.</p>
                    <div className="d-flex gap-2">
                    <AuthCode
                        allowedCharacters={"numeric"}
                        containerClassName="d-flex gap-3"
                        inputClassName="form-control text-center w-50px"
                        onChange={t=>handleChange(t)}
                        length={6}
                    />
                    </div>
                </div>
            }
            {!auth && cookie.user.autenticacao_2fa == 'S' &&
                <div>
                    <p>Insira o código para desabilitar.</p>
                    <AuthCode
                        allowedCharacters={"numeric"}
                        containerClassName="d-flex gap-3"
                        inputClassName="form-control text-center w-50px"
                        onChange={t=>handleChange(t)}
                        length={6}
                    />
                </div>
            }
        </div>
    )
}