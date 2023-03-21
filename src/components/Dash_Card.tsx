import ColaboradorSvg from "../assets/images/colaborador-icon.svg"
import { AcessosCardType } from "../assets/types/type"

type Function = {
    item: AcessosCardType
    k:number
}

export default function Dash_Card({item, k}:Function) {


    

    return (
        <div key={k+1} className="col-4 col-J cardAuto-1">
            <div className="card card-shadow">
                <div className="card-body p-0">
                    <a href='#' className={`btn btn-active-color-primary p-9 text-start w-100 ${item.background_color} cardButHover`}>
                        <span className="fig-card">
                            <img src={ColaboradorSvg} alt="" />
                        </span>
                        <div className="tit-card">
                            <h3>{item.titulo1}</h3>
                            <h4>{item.titulo2}</h4>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}