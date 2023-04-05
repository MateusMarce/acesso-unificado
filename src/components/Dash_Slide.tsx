import Slide2 from "../assets/images/img_slide_02.jpg"
import Slide1 from "../assets/images/img_slide_01.jpg"
import { useEffect, useState } from "react"
import api from "../services/api"
import { SlidesType } from "../assets/types/type"
import validateRequest from "../helpers/validateRequest"

export default function Dash_Slide() {
	const [slides, setSlides] = useState([] as SlidesType[])

	useEffect(()=>{
		(async () => {
			try {
				let res = await api.get('/user/noticias')
				setSlides(res.data)
			} catch (error) {
				validateRequest(error)
			}
		})()
	},[])

    return (
        <div className="card-slide card border-0 mb-5 mb-xl-11" data-theme="light">
			<div className="py-0">
				<div id="carouselExampleIndicators" className="carousel slide" data-bs-touch="true">
					<div className="carousel-indicators">
						{slides.map((i,k)=>(
							<button key={k} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={k} className={k == 0 ? 'active' : ''} aria-current={k === 0 ? 'true' : 'false'} aria-label={`Slide ${k+1}`}></button>
						))}
					</div>
					<div className="carousel-inner">
						{slides.map((i, k)=>(
							<div key={k} className={`carousel-item ${k === 0 && 'active'}`}>
								
								<div style={{backgroundImage:`url(${i.imagem})`}} className="imgbanner"></div>
								<div className="gradientPhoto"></div>
								<div className="carousel-caption d-md-block">
									<h4>23 de março de 2023</h4>
									<a href={i.url} target={"_blank"} className="fs-1 fw-bold text-white text-hover-primary">
										<p style={{textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}} title={i.titulo}>{i.titulo}</p>
									</a>
									<h6>{i.resumo}</h6>
								</div>
							</div>
						))}
						{/* <div className="carousel-item">
							<img src={Slide1} className="d-block w-100" alt="..." />
							<div className="gradientPhoto"></div>
							<div className="carousel-caption d-none d-md-block">
								<h4>23 de março de 2023</h4>
								<h5>Chegou o acesso <i>All-in-one</i></h5>
								<h6>Venha usufruir desse novo portal de acessos agora mesmo. <i>"Essa nova ferramenta vai facilitar seu dia a dia em 10 vezes." - Equipe TI SATC</i></h6>
							</div>
						</div> */}
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