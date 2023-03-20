import { useCookies } from "react-cookie"
import Dash_Header from "../../components/Dash_Header"
import Dash_HeaderSecondary from "../../components/Dash_HeaderSecondary"
import { useTheme } from "../../helpers/ThemeContext"

export default function Dashboard() {
    const {mode, setMode} = useTheme()
    const [cookie, setCookie] = useCookies(['theme'])

    const handleTheme = () => {
        document.body.setAttribute('data-theme', mode === 'light' ? 'dark' : 'light')
        setCookie('theme', mode === 'light' ? 'dark' : 'light')
        if(setMode) setMode(mode === 'light' ? 'dark' : 'light')
    }
    return (
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root" data-kt-app-header-fixed='false'>
			<div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <Dash_Header />  
                <Dash_HeaderSecondary />
            </div>
				
                
               

            {/* <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                    <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
                        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">

                            <div className="d-flex flex-column flex-column-fluid">
                                <div id="kt_app_content" className="app-content flex-column-fluid separaMoldeCards">

                                    <div className="row g-5 g-xxl-10">
                                        <div className="col-xxl-6 mb-xxl-10">
                                            <div className="card card-reset mb-5 mb-xl-10">
                                                <div className="card-body p-0">
                                                    <div className="row g-5 g-lg-9">

                                                        <div className="col-4 col-J cardAuto-1">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-01 cardButHover">
                                                                        <span className="fig-card">
                                                                            <img src="assets/media/svg/brand-logos/colaborador-icon.svg" alt="" />
                                                                        </span>
                                                                        <div className="tit-card">
                                                                            <h3>Portal do</h3>
                                                                            <h4>Colaborador</h4>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-02 cardButHover">
                                                                        <span className="fig-card">
                                                                            <img src="assets/media/svg/brand-logos/colaborador-icon.svg" alt="" />
                                                                        </span>
                                                                        <div className="tit-card">
                                                                            <h3>Portal do</h3>
                                                                            <h4>Aluno</h4>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-03 cardButHover">
                                                                        <span className="fig-card">
                                                                            <img src="assets/media/svg/brand-logos/colaborador-icon.svg" alt="" />
                                                                        </span>
                                                                        <div className="tit-card">
                                                                            <h3>Colégio</h3>
                                                                            <h4>Satc</h4>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-04 cardButHover">
                                                                        <span className="fig-card">
                                                                            <img src="assets/media/svg/brand-logos/colaborador-icon.svg" alt="" />
                                                                        </span>
                                                                        <div className="tit-card">
                                                                            <h3>Escola de</h3>
                                                                            <h4>Talentos</h4>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-05 cardButHover">
                                                                        <span className="fig-card">
                                                                            <img src="assets/media/svg/brand-logos/colaborador-icon.svg" alt="" />
                                                                        </span>
                                                                        <div className="tit-card">
                                                                            <h3>Portal</h3>
                                                                            <h4>Alumni</h4>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-06 cardButHover">
                                                                        <span className="fig-card">
                                                                            <img src="assets/media/svg/brand-logos/colaborador-icon.svg" alt="" />
                                                                        </span>
                                                                        <div className="tit-card">
                                                                            <h3>Portal</h3>
                                                                            <h4>Unisatc</h4>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-03 cardButHover">
                                                                        <span className="fig-card">
                                                                            <img src="assets/media/svg/brand-logos/colaborador-icon.svg" alt="" />
                                                                        </span>
                                                                        <div className="tit-card">
                                                                            <h3>Colégio</h3>
                                                                            <h4>Satc</h4>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1 disabled-Col">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-01 disabled">
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-J cardAuto-1 disabled-Col">
                                                            <div className="card card-shadow">
                                                                <div className="card-body p-0">
                                                                    <a href='#' className="btn btn-active-color-primary p-9 text-start w-100 cardlink-color-01 disabled">
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-xxl-6 mb-5 mb-xl-10">
                                            <div className="card-slide card border-0 mb-5 mb-xl-11" data-theme="light">
                                                <div className="py-0">
                                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-touch="true">
                                                      <div className="carousel-indicators">
                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                      </div>
                                                      <div className="carousel-inner">
                                                        <div className="carousel-item active">
                                                          <img src="assets/media/slide/img_slide_01.jpg" className="d-block w-100" alt="..." />
                                                          <div className="gradientPhoto"></div>
                                                          <div className="carousel-caption d-none d-md-block">
                                                            <h4>16 de março de 2023</h4>
                                                            <h5>Lorem ipsum dolor sit amet</h5>
                                                            <h6>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
                                                          </div>
                                                        </div>
                                                        <div className="carousel-item">
                                                          <img src="assets/media/slide/img_slide_02.jpg" className="d-block w-100" alt="..." />
                                                          <div className="gradientPhoto"></div>
                                                          <div className="carousel-caption d-none d-md-block">
                                                            <h4>16 de março de 2023</h4>
                                                            <h5>Lorem ipsum dolor sit amet</h5>
                                                            <h6>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                      </button>
                                                      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                      </button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
			</div> */}
		</div>
    )
}