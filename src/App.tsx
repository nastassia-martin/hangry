import './assets/scss/App.scss'
import Navigation from './components/Navaigation'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'


const App = () => {
  return (
    <div id="App">
      <Navigation />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  )
}

export default App
