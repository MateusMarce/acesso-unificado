
export default function Dash_Footer() {


    return (
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
		    <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
		        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
			        <div id="kt_app_footer" className="app-footer align-items-center justify-content-center justify-content-md-between flex-column flex-md-row py-3 py-lg-6">
			            <div className="text-dark order-2 order-md-1">
			                <span className="text-muted fw-semibold me-1">2023&copy;</span>
			                <a href="#" target="_blank" className="text-gray-800 text-hover-primary">TI SATC</a>
			            </div>
			            <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
			                <li className="menu-item">
			                    <a href="#" target="_blank" className="menu-link px-2">Política de Privacidade</a>
			                </li>
			            </ul>
			        </div>
	            </div>
	        </div>
	    </div>
    )
}