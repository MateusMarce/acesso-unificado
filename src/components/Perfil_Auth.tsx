import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik"
import { useCookies } from "react-cookie"
import * as Yup from 'yup'
import validateRequest from "../helpers/validateRequest"
import api from "../services/api"
import FoneField from "./Fields/FoneField"
import QRCode from "./Fields/QRCode"

const FormSchema = Yup.object().shape({
    codigo2fa:Yup.number().required('Preencha o código!')
})

export const Perfil_Auth = () => {
    const [cookie, setCookie] = useCookies(['user'])
    
    const handleSubmit = async (value:FormikValues) => {
        try {
            let res = await api.post('/user/habilita-2fa', {
                codigo2fa:value.codigo2fa
            })
            setCookie('user', {...cookie.user, autenticacao_2fa: cookie.user.autenticacao_2fa == 'N' ? 'S' : 'N'})
            validateRequest(res)
            setTimeout(()=>{
                location.reload()
            },3000)
            
        } catch (error) {
            validateRequest(error)
        }
    }
    return (
        <div className="card mb-5 mb-xl-10 shadow-sm">
            <div className="card-header border-0">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Segurança</h3>
                </div>
            </div>
            <div>
                <Formik
                    initialValues={{
                        codigo2fa:''
                    }}
                    enableReinitialize
                    validationSchema={FormSchema}
                    onSubmit={handleSubmit}
                >
                    {(props)=>(
                        <Form>
                            <div className="card-body border-top p-9">
                                <div className="row mb-6 d-flex align-items-top">
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Autenticação de duas etapas</label>
                                    <div className="col-lg-8 fv-row">
                                        <QRCode setValue={props.setFieldValue} />
                                        <ErrorMessage name="name" component='small' className='invalid-feedback' />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-end py-6 px-9">
                                <button type="submit" className="btn btn-success">Salvar Alterações</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}