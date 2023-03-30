import FoneSvg from '../assets/images/fone-icon.svg'
import EmailSvg from '../assets/images/email-icon.svg'
import MsnSVG from '../assets/images/icon-book.svg'
import Nercu from '../assets/images/nercu-icon.svg'
import Treinas from '../assets/images/treinas-icon.svg'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

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
                                <Link to='/ramais' className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center cursor-pointer">
                                    <img src={FoneSvg} className="w-20px" alt="" />
                                    <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">Ramais</span>
                                </Link>
                                <a href='https://fs.satc.edu.br/adfs/ls/?cbcxt=&popupui=&vv=&mkt=&lc=&wfresh=&wa=wsignin1.0&wtrealm=urn:federation:MicrosoftOnline&wctx=bk%3D1421950828%26LoginOptions%3D3' target={'_blank'} className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center cursor-pointer">
                                    <img src={EmailSvg} className="w-20px" alt="" />
                                    <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">Webmail</span>
                                </a>
                                <a href='http://biblioteca.satc.edu.br/' target='_blank' className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center cursor-pointer">
                                    <img src={MsnSVG} className="w-20px" alt="" />
                                    <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">Biblioteca</span>
                                </a>
                            </div>
                        </div>
                        <div className="d-flex flex-stack">
                            {(cookies.user.link_nercu != '' || cookies.user.link_treinas != '') &&
                                <>
                                    <a href={cookies.user.link_nercu} className="buti buticolor_1 icoN" title="Nercu"><img src={Nercu} alt="" /></a>
                                    <a href={cookies.user.link_treinas} target='_blank' className="buti buticolor_1 icoT" title="Treinas"><img src={Treinas} alt="" /></a>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}