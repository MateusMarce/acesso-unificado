import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from 'react'
import App from "./App"
import * as Page from "./pages"

function AppRoutes() {


	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="" element={<Page.Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
