import "./assets/scss/App.scss"
import Navigation from "./components/Navaigation"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import Restaurant_tips from './pages/RestaurantsIndexPage'
import SignUp from './pages/SignUp'


const App = () => {
  return (
    <div id='App'>
      <Navigation />

      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<NotFound />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/tips" element={<Restaurant_tips />} />
      </Routes>
    </div>
  )
}

export default App
