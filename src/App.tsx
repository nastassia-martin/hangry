import './assets/scss/App.scss'
import Navigation from './components/Navaigation'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'


const App = () => {
  return (
    <div id="App">
      <Navigation />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<NotFound />} />
        <Route path="/signup" element={<NotFound />} />
      </Routes>

    </div>
  )
}

export default App
