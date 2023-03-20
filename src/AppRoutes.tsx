import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from 'react'
import App from "./App"
import * as Page from "./pages"


function AppRoutes() {


	return (
		<BrowserRouter>
			<Suspense fallback={<div>Carregando...</div>}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="" element={<Page.Login />} />
						<Route path="cadastro" element={<Page.Cadastro />} />
						<Route path="esqueceu-senha" element={<Page.EsqueceuSenha />} />
						<Route path="painel" element={<Page.Dashboard />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default AppRoutes
