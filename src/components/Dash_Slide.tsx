import Slide2 from "../assets/images/img_slide_02.jpg"
import Slide1 from "../assets/images/img_slide_01.jpg"

export default function Dash_Slide() {


    return (
        <div className="card-slide card border-0 mb-5 mb-xl-11" data-theme="light">
			<div className="py-0">
				<div id="carouselExampleIndicators" className="carousel slide" data-bs-touch="true">
					<div className="carousel-indicators">
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					</div>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src={Slide2} className="d-block w-100" alt="..." />
							<div className="gradientPhoto"></div>
							<div className="carousel-caption d-none d-md-block">
								<h4>23 de março de 2023</h4>
								<h5>Bem-vindo ao Acesso Unificado</h5>
								<h6>Esse será seu novo hub de acessos para todos os portais disponíveis.</h6>
							</div>
						</div>
						<div className="carousel-item">
							<img src={Slide2} className="d-block w-100" alt="..." />
							<div className="gradientPhoto"></div>
							<div className="carousel-caption d-none d-md-block">
								<h4>23 de março de 2023</h4>
								<h5>Bem-vindo ao Acesso Unificado</h5>
								<h6>Esse será seu novo hub de acessos para todos os portais disponíveis.</h6>
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
    )
}