import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik"
import { useCookies } from "react-cookie"
import * as Yup from 'yup'
import validateRequest from "../helpers/validateRequest"
import api from "../services/api"
import FoneField from "./Fields/FoneField"

const FormSchema = Yup.object().shape({
    name:Yup.string().required('Este campo é obrigatório.'),
    email:Yup.string().required('Este campo é obrigatório.').email('Digite um e-mail válido.'),
    telefone:Yup.string().required('Este campo é obrigatório.'),
})

export const Perfil_InfoForm = () => {
    const [cookie, setCookie] = useCookies(['user'])
    
    const handleSubmit = async (value:FormikValues) => {
        const fone = value.telefone.replace('(','').replace(')','').replace('-','').replaceAll('_','').replace(' ','')
        try {
            let res = await api.post('/user/update', {
                nome:value.name,
                email:value.email,
                telefone:fone
            })
            setCookie('user', {...cookie.user, telefone:fone, nome:value.name, email:value.email})
            validateRequest(res)
            
        } catch (error) {
            validateRequest(error)
        }
    }
    return (
        <div className="card mb-5 mb-xl-10 shadow-sm">
            <div className="card-header border-0">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Detalhes</h3>
                </div>
            </div>
            <div>
                <Formik
                    initialValues={{
                        name:cookie.user.nome || '',
                        email:cookie.user.email || '',
                        telefone:cookie.user.telefone || '',
                    }}
                    enableReinitialize
                    validationSchema={FormSchema}
                    onSubmit={handleSubmit}
                >
                    {(props)=>(
                        <Form>
                            <div className="card-body border-top p-9">
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Nome completo</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field name='name' className={`form-control form-control-lg mb-3 mb-lg-0 ${(props.errors.name && props.touched.name) && 'is-invalid'}`} />
                                        <ErrorMessage name="name" component='small' className='invalid-feedback' />
                                    </div>
                                </div>
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">E-mail</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field name='email' className={`form-control form-control-lg mb-3 mb-lg-0 ${(props.errors.email && props.touched.email) && 'is-invalid'}`} />
                                        <ErrorMessage name="email" component='small' className='invalid-feedback' />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-lg-4 col-form-label  fw-semibold fs-6">Telefone</label>
                                    <div className="col-lg-8 fv-row fv-plugins-icon-container">
                                        {/* <Field name='telefone' className={`form-control form-control-lg mb-3 mb-lg-0 ${(props.errors.telefone && props.touched.telefone) && 'is-invalid'}`} /> */}
                                        <FoneField value={props.values.telefone} className={`form-control form-control-lg mb-3 mb-lg-0 ${(props.errors.telefone && props.touched.telefone) ? 'is-invalid' : ''}`} type="text" name="telefone" />
                                        <ErrorMessage name="telefone" component='small' className='invalid-feedback' />
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