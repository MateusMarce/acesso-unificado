import { Login_LeftBanner } from '../../components/Login_LeftBanner'
import { useCookies } from 'react-cookie'


export default function Reset() {
    const [cookies, setCookies, removeCookies] = useCookies(['login', 'user', 'consent', 'theme', 'image', 'exames', 'comunicados'])

    
    const handleClick = () => {
        removeCookies('user')
        removeCookies('user', {path:'/'})
        removeCookies('login')
        removeCookies('login', {path:'/'})
        removeCookies('consent')
        removeCookies('consent', {path:'/'})
        removeCookies('theme')
        removeCookies('theme', {path:'/'})
        removeCookies('image')
        removeCookies('image', {path:'/'})
        removeCookies('exames')
        removeCookies('exames', {path:'/'})
        removeCookies('comunicados')
        removeCookies('comunicados', {path:'/'})
        location.reload()
    }
    
    return (
        <div className="d-flex flex-column flex-root h-100" id="kt_app_root">
            <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                <Login_LeftBanner />
                <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 align-self-center">
                    <div className='text-center'>
                        <h3>Clique no botão para deletar os Cookies</h3>
                        <button className='btn btn-success' onClick={()=>handleClick()}>Deletar cookies</button>
                    </div>
                </div>
            </div>
        </div>
    )
}