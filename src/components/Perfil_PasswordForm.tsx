import { ErrorMessage, Field, Form, Formik } from "formik"
import { useCookies } from "react-cookie"
import * as Yup from 'yup'
import ChangePassword from "./Buttons/ChangePassword"

const FormSchema = Yup.object().shape({
    senha_antiga:Yup.string().required('Este campo é obrigatório.'),
    senha_nova:Yup.string().required('Este campo é obrigatório.').min(5, 'A senha deve conter 5 caractéres.'),
    senha_nova_confirmar:Yup.string().required('Este campo é obrigatório.').oneOf([Yup.ref('senha_nova')], 'As senhas não são iguais.').min(5, 'A senha deve conter 5 caractéres.'),
})

export const Perfil_PasswordForm = () => {
    const [cookie] = useCookies(['user'])

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
                    onSubmit={()=>{}}
                >
                    {(props)=>(
                        <Form>
                            <div className="card-body border-top p-9">
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Senha antiga</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field name='senha_antiga' className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${(props.errors.senha_antiga && props.touched.senha_antiga) && 'is-invalid'}`} />
                                        <ErrorMessage name="senha_antiga" component='small' className='invalid-feedback' />
                                        <ChangePassword
                                            name='senha_antiga'
                                            placeholder='Senha'
                                            errors={props.errors.senha_antiga}
                                            touched={props.touched.senha_antiga}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Nova senha</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field name='senha_nova' className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${(props.errors.senha_nova && props.touched.senha_nova) && 'is-invalid'}`} />
                                        <ErrorMessage name="senha_nova" component='small' className='invalid-feedback' />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-lg-4 col-form-label  fw-semibold fs-6">Confirmar senha</label>
                                    <div className="col-lg-8 fv-row fv-plugins-icon-container">
                                        <Field name='senha_nova_confirmar' className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${(props.errors.senha_nova_confirmar && props.touched.senha_nova_confirmar) && 'is-invalid'}`} />
                                        <ErrorMessage name="senha_nova_confirmar" component='small' className='invalid-feedback' />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-end py-6 px-9">
                                <button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">Salvar Alterações</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}