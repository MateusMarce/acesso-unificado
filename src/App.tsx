import CookieConsent from "react-cookie-consent";
import { Outlet } from "react-router-dom";


export default function App() {

    return (
        <>
            <Outlet />
            <CookieConsent
                location="bottom"
                buttonText="Aceitar cookies"
                cookieName="AcceptCookies"
                style={{ background: "#2B373B" }}
                buttonClasses='btn btn-success bg-success text-white rounded'
                expires={150}
            >
                O Acesso Unificado utiliza cookies para o funcionamento do site. {" "}
                <span style={{ fontSize: "10px" }}>Seus dados são utilizados apenas para deixar o site mais dinâmico.</span>
            </CookieConsent>
        </>
    )
}