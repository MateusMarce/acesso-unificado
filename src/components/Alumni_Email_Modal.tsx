import { useState } from "react"
import { ErrorMessage, Field, Form, Formik, FormikBag, FormikHelpers, FormikValues } from "formik"
import * as Yup from 'yup'
import { EmailType } from "../assets/types/type"
import { useCookies } from "react-cookie"
import api from "../services/api"
import validateRequest from "../helpers/validateRequest"

const ValidationSchema = Yup.object().shape({
    assunto:Yup.string(),
    conteudo:Yup.string(),
})

export default function Alumni_Email_Modal(props:any) {
	const [data, setData] = useState({
		assunto:'',
		conteudo:'',
	} as EmailType)
	const [cookies] = useCookies(['user'])

	const handleSubmit = async (values: FormikValues, action: any) => {
		try {
			let res = await api.post('/alumni/fale-conosco', values)
			validateRequest(res)
			action.resetForm()
		} catch (error) {
		}
	}

    return (
		<Formik
			initialValues={data}
			validationSchema={ValidationSchema}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{({isSubmitting})=>(
				<Form>
					<div className="modal fade" id="modalAlumni" tabIndex={-1} aria-labelledby="modalAlumni" aria-hidden="true">
						<div className="modal-dialog modal-dialog-centered mw-900px">
							<div className="modal-content">
								<div className="modal-header">
									<h2>Fale Conosco</h2>
									{/* MODAL CLOSE BUTTON */}
									<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
										<span className="svg-icon svg-icon-1">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
												<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
											</svg>
										</span>
									</div>
								</div>
								<div className="modal-body">
									<div className="mb-3 row">
										<div className="col-sm-12">
											<Field name="assunto" type="text" className={`form-control`} placeholder="Assunto"/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<Field name="conteudo" type="text" as="textarea" rows="3" className={`form-control`} placeholder="Mensagem"/>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn btn-success">{isSubmitting ? <i className='fa-solid fa-spinner spinner'></i> : 'Enviar'}</button>
								</div>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
    )
}