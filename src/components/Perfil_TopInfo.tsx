import { useCookies } from "react-cookie"
import FixName from "../helpers/FixName"
import Banner from "../assets/images/bk_minha_conta.jpg"


export const Perfil_TopInfo = () => {
    const [cookies] = useCookies(['user'])

    return (
        <div className="card card-flush mb-9 shadow-sm" id="kt_user_profile_panel">
            <div className="card-header rounded-top bgi-size-cover h-200px" style={{backgroundPosition: '100% 50%', backgroundImage:`url(${Banner})`}}>
            </div>
            <div className="card-body mt-n19">
                <div className="m-0">
                    <div className="d-flex flex-stack align-items-end pb-4 mt-n19">
                        <div className="symbol symbol-125px symbol-lg-150px symbol-fixed position-relative mt-n3">
                            <img src={cookies.user.avatar} alt="image" className="border border-white border-4" style={{borderRadius: 20}} />
                            <div className="position-absolute translate-middle bottom-0 start-100 ms-n1 mb-9 bg-success rounded-circle h-15px w-15px"></div>
                        </div>
                    </div>
                    <div className="d-flex flex-stack flex-wrap align-items-end">
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center mb-2">
                                <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">{FixName(cookies.user.nome)}</a> 
                            </div>
                            <span className="fw-bold text-gray-600 fs-6 mb-2 d-block">
                                Equipe TI SATC
                            </span>                      
                            <div className="d-flex align-items-center flex-wrap fw-semibold fs-7 pe-2">
                                <a href={`mailto:${cookies.user.email}`} className="d-flex align-items-center text-primary text-hover-primary">
                                    {cookies.user.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}