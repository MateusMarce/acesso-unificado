import LogoSatc from '../assets/images/logo_satc_2.svg'
import AuthBg from '../assets/images/auth-bg.png'
import Illustration from '../assets/images/design_page1.svg'

export const Login_LeftBanner = () => (
    <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center" style={{backgroundImage:`url(${AuthBg})`}}>
        <div className="d-flex flex-column flex-center p-6 p-lg-10 w-100">          
            <a href="#" className="logoLogin mb-0 mb-lg-15"><img alt="Logo" src={LogoSatc} /></a>        
            <img className="d-none d-lg-block mx-auto w-300px w-lg-75 w-xl-500px mb-10 mb-lg-15" src={Illustration} alt=""/>
            <h1 className="d-none d-lg-block text-white fs-2qx fw-bold text-center mb-7"> 
                <span className="fontHand-1 fs-3tx d-lg-block">Melhorando a sua experiência!</span>
            </h1>  
        </div>
    </div>
)