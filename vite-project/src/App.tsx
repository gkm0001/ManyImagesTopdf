import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImgsToPdf from './components/ImgsToPdf'

function App() {
  const [count, setCount] = useState(0)

  return (
     <>
        <ImgsToPdf/>
     </>
  )
}

export default App
