import ColaboradorSvg from "../assets/images/colaborador-icon.svg"

export default function Dash_Card() {


    return (
        <div className="col-4 col-J cardAuto-1">
            <div className="card card-shadow">
                <div className="card-body p-0">
                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-01 cardButHover">
                        <span className="fig-card">
                            <img src={ColaboradorSvg} alt="" />
                        </span>
                        <div className="tit-card">
                            <h3>Portal do</h3>
                            <h4>Colaborador</h4>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}