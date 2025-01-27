import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Plincko from "./component/Plincko"
import PlinkoGame from './component/PlinkoGame'
import { Simulation } from './pages/Simulation'
import {Game} from "./pages/Game"
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Simulation /> */}
        <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Game />} />
          {/* <Route path="/game" element={<Game />} /> */}
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
