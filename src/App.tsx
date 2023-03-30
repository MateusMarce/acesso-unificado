import CookieConsent from "react-cookie-consent";
import { Outlet } from "react-router-dom";


export default function App() {

    return (
        <>
            <Outlet />
            <CookieConsent
                location="bottom"
                buttonWrapperClasses="w-100 d-flex justify-content-center"
                style={{position:'absolute', right:0, left:'auto'}}
                containerClasses="w-500px rounded-4 mb-3 me-3"
                buttonText="Aceitar cookies"
                buttonClasses='btn btn-success bg-success text-white rounded'
                hideOnAccept
                declineButtonText="Negar cookies"
                declineButtonClasses="btn btn-success bg-success text-white rounded"
                cookieName="consent"
                expires={150}
            >
                <div id="consent-btn" className="w-100 d-flex flex-column align-items-center">
                    <i className="bi bi-shield-check text-success mb-5" style={{fontSize:50}}></i>
                    <h3 className="text-light">
                        O Acesso Unificado utiliza cookies para funcionar.
                    </h3>
                    <small>Seus dados são usados apenas para deixar o site utilizável.</small>
                    <small><a href="https://unisatc.com.br/politica-de-privacidade/" target={"_blank"}>[ Leia nossa Política de Privacidade ]</a></small>
                </div>
            </CookieConsent>
        </>
    )
}