import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from "formik"
import { toast } from "react-toastify"
import * as Yup from 'yup'
import ChangePassword from "./Buttons/ChangePassword"
import api from "../services/api"
import validateRequest from "../helpers/validateRequest"

const FormSchema = Yup.object().shape({
    senha_antiga:Yup.string().required('Este campo é obrigatório.'),
    senha_nova:Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
    senha_nova_confirmar:Yup.string().required('Este campo é obrigatório.').oneOf([Yup.ref('senha_nova')], 'As senhas não são iguais.').min(5, 'A senha deve conter 5 caractéres.'),
})

export const Perfil_PasswordForm = () => {

    const handleSubmit = async (values: FormikValues, action:any) => {
        try {
            let res = await api.post('/cadastro/updatepass', {
                old_password:values.senha_antiga,
                password:values.senha_nova
            })
            validateRequest(res)
        } catch (error) {
            validateRequest(error)
        }
        action.resetForm()
    }

    return (
        <div className="card mb-5 mb-xl-10 shadow-sm">
            <div className="card-header border-0">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Alterar senha</h3>
                </div>
            </div>
            <div>
                <Formik
                    initialValues={{
                        senha_antiga:'',
                        senha_nova:'',
                        senha_nova_confirmar:'',
                    }}
                    validationSchema={FormSchema}
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {(props)=>(
                        <Form>
                            <div className="card-body border-top p-9">
                                <div className="row mb-6 me-1">
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Senha atual</label>
                                    <div className="pe-0 col-lg-8 position-relative login-password">
                                        <ChangePassword
                                            tabIndex="1"
                                            name='senha_antiga'
                                            placeholder=''
                                            errors={props.errors.senha_antiga}
                                            touched={props.touched.senha_antiga}
                                        />
                                        <ErrorMessage name="senha_antiga" component='small' className='invalid-feedback' />
                                    </div>
                                </div>
                                <div className="row mb-6 me-1">
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Nova senha</label>
                                    <div className="pe-0 col-lg-8 position-relative login-password">
                                        <ChangePassword
                                            tabIndex="2"
                                            name='senha_nova'
                                            placeholder=''
                                            errors={props.errors.senha_nova}
                                            touched={props.touched.senha_nova}
                                        />
                                        <ErrorMessage name="senha_nova" component='small' className='invalid-feedback' />
                                    </div>
                                </div>
                                <div className="row me-1">
                                    <label className="col-lg-4 col-form-label  fw-semibold fs-6">Confirmar senha</label>
                                    <div className="pe-0 col-lg-8 position-relative login-password">
                                        <ChangePassword
                                            tabIndex="3"
                                            name='senha_nova_confirmar'
                                            placeholder=''
                                            errors={props.errors.senha_nova_confirmar}
                                            touched={props.touched.senha_nova_confirmar}
                                        />
                                        <ErrorMessage name="senha_nova_confirmar" component='small' className='invalid-feedback' />
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