import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy, useEffect } from 'react'
import App from "./App"
import * as Page from "./pages"
import { useCookies } from "react-cookie"
import api from "./services/api"
import { toast } from "react-toastify"

function AppRoutes() {
	const [cookies, , removeCookie] = useCookies(['login', 'user'])

	if (cookies.login && cookies.login.access_token) {
		api.defaults.headers.common['Authorization'] = `${cookies.login.token_type} ${cookies.login.access_token}`
	}
	// useEffect(()=>{
	// 	api.interceptors.response.use(res => res, (err) => {
	// 		if (err.response.status == 401) {
	// 			removeCookie('login')
	// 			removeCookie('user')
	// 			toast.error('Sua sessão expirou.', {autoClose:2000})
	// 			window.location.href = '/acesso-unificado/#/'
	// 		}
	// 		return Promise.reject(err);
	// 	});
	// },[location.pathname])

	return (
		<BrowserRouter>
			<Suspense fallback={<div>Carregando...</div>}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path=":cpf?" element={<Page.Login />} />
						<Route path="cadastro/:cpf?" element={<Page.Cadastro />} />
						<Route path="qrcode" element={<Page.QrCode />} />
						<Route path="troca-senha/:email" element={<Page.TrocaSenha />} />
						<Route path="esqueceu-senha" element={<Page.EsqueceuSenha />} />
						<Route path="painel" element={<Page.Dashboard />} />
						<Route path="perfil" element={<Page.Perfil />} />
						<Route path="ramais" element={<Page.Ramais />} />
						<Route path="contracheque" element={<Page.Contracheque />} />
						<Route path="alumni" element={<Page.Alumni />} />
						<Route path="comunicados" element={<Page.Comunicados />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default AppRoutes
