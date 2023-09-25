import "./assets/scss/App.scss"
import Navigation from "./components/Navaigation"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import Restaurant_tips from "./pages/RestaurantsIndexPage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import UpdateProfile from "./pages/UpdateProfile"
// import Sidebar from "./components/Sidebar"

const App = () => {
	return (
		<div id="App">
			<Navigation />
			{/* <Sidebar HIDDEN={false} /> */}
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/update-profile" element={<UpdateProfile />} />
				<Route path="/tips" element={<Restaurant_tips />} />
			</Routes>

			<ToastContainer theme="colored" />
		</div>
	)
}

export default App
