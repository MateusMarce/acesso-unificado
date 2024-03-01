import { useCookies } from "react-cookie";
import Alumni_Email_Modal from "../Alumni_Email_Modal";


export default function FaleConosco(props: any) {
    const [ cookies ] = useCookies(['theme'])

    return (
        <div>
            <div className="box-fale-conosco">
                <button type="button" className="btn-fale-conosco d-flex align-items-center gap-5" data-bs-toggle="modal" data-bs-target="#modalAlumni">
                    <i className={`fa-solid fa-circle-info`} style={{color: 'var(--kt-app-bg-color)'}}></i>
                    <span className="fw-bold fs-4" style={{color: 'var(--kt-app-bg-color)'}}>Fale Conosco</span>
                </button>
            </div>
            <Alumni_Email_Modal />
        </div>
    )
}