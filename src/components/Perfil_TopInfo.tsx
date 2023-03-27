import { useCookies } from "react-cookie"
import FixName from "../helpers/FixName"
import Banner from "../assets/images/bk_minha_conta.jpg"
import { EditTextarea } from "react-edit-text"
import { useState } from "react"

export const Perfil_TopInfo = ({dep}:any) => {
    const [showImage, setShowImage] = useState<boolean>(true)
    const [cookies, setCookies] = useCookies(['user', 'image'])


    const handleHideImage = () => {
        setShowImage(!showImage)
        setCookies('image', !showImage)
    }
    console.log(cookies.image);
    
    return (
        <div className="card card-flush mb-9 shadow-sm" id="kt_user_profile_panel">
            <div className="card-header rounded-top bgi-size-cover h-200px" style={{backgroundPosition: '100% 50%', backgroundImage:`url(${Banner})`}}>
            </div>
            <div className="card-body mt-n19">
                <div className="m-0">

                    <div className="d-flex align-items-end pb-4 mt-n19 avatarPerfil">
                        <div className="boxer position-relative mt-n3">
                            <span className="inicialNome fs-md-5x">{cookies.user.nome.charAt(0)}</span>
                            {cookies.image === 'true' &&
                                <img src={cookies.user.avatar} alt="image" className="border border-white border-4"/>
                            }
                        </div>
                        <span className="ocultar">
                            <button onClick={handleHideImage} title="Ocultar foto" className="btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger fs-8 py-1 px-2 ms-3">Ocultar</button>
                        </span>
                    </div>

                    <div className="d-flex flex-stack flex-wrap align-items-start">
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center mb-2">
                                <div className="text-gray-800 fs-2 fw-bolder me-1">{FixName(cookies.user.nome)}</div> 
                            </div>
                            <span className="fw-bold text-gray-600 fs-6 d-block w-100">
                                {/* Equipe TI SATC */}
                                <EditTextarea
                                    placeholder="Clique aqui para escrever sua bio"
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
                        {dep > 0 &&
                            <div className="d-flex flex-column">
                                <div className="text-gray-800 fs-5 fw-bolder me-1">Total de dependentes: {dep}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}