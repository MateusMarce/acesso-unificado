import FoneSvg from '../assets/images/fone-icon.svg'
import EmailSvg from '../assets/images/email-icon.svg'
import MsnSVG from '../assets/images/msn-icon.svg'
import Nercu from '../assets/images/nercu-icon.svg'
import Treinas from '../assets/images/treinas-icon.svg'
import { useCookies } from 'react-cookie'
import Dash_Modal from './Dash_Modal'

export default function Dash_HeaderSecondary() {
    const [cookies] = useCookies(['user'])

    return (
        <section>
            <div className="app-header-secondary">
                <div className="app-container container-xxl d-flex align-items-stretch">
                    <div className="w-100 d-flex flex-stack">
                        <div className="d-flex flex-stack me-5">
                            <span className="text-white fw-bold fs-5 me-3 me-lg-6">Canais:</span>
                            <div className="d-flex gap-1 gap-lg-2">
                                <a className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <img src={FoneSvg} className="w-20px" alt="" />
                                    <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">Ramais</span>
                                </a>
                                <a className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <img src={EmailSvg} className="w-20px" alt="" />
                                    <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">E-mail</span>
                                </a>
                                <a className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <img src={MsnSVG} className="w-20px" alt="" />
                                    <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">Chat online</span>
                                </a>
                            </div>
                        </div>
                        <div className="d-flex flex-stack">
                            {(cookies.user.link_nercu != '' || cookies.user.link_treinas != '') &&
                                <>
                                    <a href={cookies.user.link_nercu} className="buti buticolor_1"><img src={Nercu} alt="" /></a>
                                    <a href={cookies.user.link_treinas} target='_blank' className="buti buticolor_1"><img src={Treinas} alt="" /></a>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Dash_Modal />
        </section>
    )
}