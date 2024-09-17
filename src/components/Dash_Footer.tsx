import { isDevelopment, isProductionDev } from "../services/url";

export default function Dash_Footer() {


    return (
		<>
			<div className={`app-footer-new ${(isDevelopment || isProductionDev) && 'desenv'}`} id="kt_app_wrapper">
				<div className="app-container container-xxl d-flex flex-row flex-column-fluid">
					<div className="w-100" id="kt_app_main">
						<div id="kt_app_footer" className="d-flex h-100 align-items-center justify-content-center justify-content-md-between flex-column flex-md-row">
							<div className=" order-3 order-md-1 d-flex gap-1">
								<span className={`${(isDevelopment || isProductionDev) ? 'text-black' : 'text-gray-600'} fw-semibold me-1`}>{new Date().getFullYear()} &copy;</span>
								<div className={`${(isDevelopment || isProductionDev) ? 'text-black' : 'text-dark'}`}>TI SATC</div>
							</div>
							{(isDevelopment || isProductionDev) &&
								<div className="order-1 order-md-1 text-black fw-bold fs-1 d-flex align-items-center gap-8">
									<div className="w-40px">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
									</div>
									SISTEMA BETA
									<div className="w-40px">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
									</div>
								</div>
							}
							<ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
								<li className="menu-item">
									<a href="https://unisatc.com.br/politica-de-privacidade/" target={"_blank"} className={`${(isDevelopment || isProductionDev) ? 'text-black' : 'text-gray-600'} menu-link px-2`}>Política de Privacidade</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
    )
}