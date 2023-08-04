
export default function Dash_Footer() {


    return (
        <div className="app-footer-new" id="kt_app_wrapper">
		    <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
		        <div className="w-100" id="kt_app_main">
			        <div id="kt_app_footer" className="d-flex h-100 align-items-center justify-content-center justify-content-md-between flex-column flex-md-row">
			            <div className=" order-2 order-md-1 d-flex gap-1">
			                <span className="text-gray-600 fw-semibold me-1">{new Date().getFullYear()} &copy;</span>
			                <div className="text-dark">TI SATC</div>
			            </div>
			            <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
			                <li className="menu-item">
			                    <a href="https://unisatc.com.br/politica-de-privacidade/" target={"_blank"} className="text-gray-600 menu-link px-2">Política de Privacidade</a>
			                </li>
			            </ul>
			        </div>
	            </div>
	        </div>
	    </div>
    )
}