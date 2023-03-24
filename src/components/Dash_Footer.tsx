
export default function Dash_Footer() {


    return (
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
		    <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
		        <div className="app-main flex-column flex-row-fluid justify-content-center" id="kt_app_main">
			        <div id="kt_app_footer" className="app-footer align-items-center justify-content-center justify-content-md-between flex-column flex-md-row py-3 py-lg-6">
			            <div className="text-dark order-2 order-md-1 d-flex gap-1">
			                <span className="text-muted fw-semibold me-1">{new Date().getFullYear()} &copy;</span>
			                <div onClick={()=>alert(`Mateus, o Deus do React. 
João, o guerreiro do design. 
Thiago, o fanfarrão do back.`)} className="text-gray-800 text-hover-primary">TI SATC</div>
			            </div>
			            <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
			                <li className="menu-item">
			                    <a href="https://unisatc.com.br/politica-de-privacidade/" target={"_blank"} className="menu-link px-2">Política de Privacidade</a>
			                </li>
			            </ul>
			        </div>
	            </div>
	        </div>
	    </div>
    )
}