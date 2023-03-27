import { useCookies } from "react-cookie"
import FixName from "../helpers/FixName"
import Banner from "../assets/images/bk_minha_conta.jpg"
import { EditTextarea } from "react-edit-text"


export const Perfil_TopInfo = () => {
    const [cookies] = useCookies(['user'])

    return (
        <div className="card card-flush mb-9 shadow-sm" id="kt_user_profile_panel">
            <div className="card-header rounded-top bgi-size-cover h-200px" style={{backgroundPosition: '100% 50%', backgroundImage:`url(${Banner})`}}>
            </div>
            <div className="card-body mt-n19">
                <div className="m-0">
                    <div className="d-flex flex-stack align-items-end pb-4 mt-n19">
                        <div className="round-container med-xl symbol-fixed position-relative mt-n3">
                            <img src={cookies.user.avatar} alt="image" className="border border-white border-4" style={{borderRadius: 20}} />
                        </div>
                    </div>
                    <div className="d-flex flex-stack flex-wrap align-items-end">
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center mb-2">
                                <div className="text-gray-800 fs-2 fw-bolder me-1">{FixName(cookies.user.nome)}</div> 
                            </div>
                            <span className="fw-bold text-gray-600 fs-6 d-block w-100">
                                {/* Equipe TI SATC */}
                                <EditTextarea
                                    placeholder="Escreva sua bio."
                                    rows={2}
                                    className="m-0"
                                    inputClassName="w-100"
                                />
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