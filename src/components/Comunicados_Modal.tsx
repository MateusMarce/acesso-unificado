import Icon from "../assets/images/ico_desenv.svg"
import { ComunicadosType } from "../assets/types/type"

export type ThisProps = {
	item:ComunicadosType
}

export default function Comunicados_Modal({item}:ThisProps) {
	let date = ''
	if(item && item.dt_publicacao){
		let [y, m, d]:string[] = item.dt_publicacao.split(' ')[0].split('-')
		let [h, i]:string[] = item.dt_publicacao.split(' ')[1].split(':')
		date = `${d}/${m}/${y} ${h}:${i}`
	}

    return item && (
        <div className="modal fade" id="modalComunicados" tabIndex={-1} aria-labelledby="modalComunicados" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered mw-900px">
				<div className="modal-content">
					<div className="modal-header">
					<div className="d-flex flex-column">
									<span className="frase_Desenv">{item.titulo}</span>
								</div>

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
					<div className="modal-body py-lg-10 px-lg-10">
						<div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid" id="kt_modal_create_app_stepper">
							<div className="flex-row-fluid py-lg-5 px-lg-15">
								
									<small className="text-start">{date} | {item.usuario}</small>
								<div className="mb-5 mt-5" dangerouslySetInnerHTML={{__html: item.conteudo}} />
								{item.link &&
									<a href={item.link}>Link: {item.link}</a>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}