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
			} catch (error:any) {
				if(error.response.status != 401) validateRequest(error)
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
					<div className="carousel-inner rounded">
						{slides.map((i, k)=>(
							<div key={k} className={`carousel-item ${k === 0 && 'active'}`}>
								
								<div style={{backgroundImage:`url(${i.imagem})`}} className="imgbanner"></div>
								<div className="gradientPhoto"></div>
								<div className="carousel-caption d-md-block">
									<h4>{i.dt_publicacao}</h4>
									<a href={i.url} target={"_blank"} className="fs-1 fw-bold text-white text-hover-primary">
										<p style={{textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}} title={i.titulo}>{i.titulo}</p>
										<p className=" fs-6">{i.resumo}</p>
									</a>
								</div>
							</div>
						))}
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