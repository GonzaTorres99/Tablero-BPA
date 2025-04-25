import { useState, useEffect } from "react"
import Cronometro from './components/Cronometro'
import Puntuacion from './components/Puntuacion'
import Cuarto from './components/Cuarto'
import Faltas from './components/Faltas'
import './App.css'

const App = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
  {/* Logo */}
  <div className="absolute top-2 right-2 z-10">
    <img
      src="./logoBPA.png"
      alt="Logo BPA"
      className="w-20 h-20 md:w-28 md:h-28  lg:w-55  lg:h-55 object-contain 
                opacity-90 hover:opacity-100 transition-opacity
                drop-shadow-lg hover:drop-shadow-xl"
    />
  </div>

  {/* Contenido principal */}
  <div className="h-full flex flex-col items-center justify-center pt-1 pb-1 px-2 mx-auto">
    {/* Título */}
    <div className="mb-1">
      <h1 className="text-xl md:text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        TABLERO <span className="text-amber-400">BPA</span>
      </h1>
      <div className="h-1 w-12 md:w-20 mx-auto bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mt-1"></div>
    </div>

    {/* Contenedor de componentes */}
    <div className="w-full max-w-3xl flex-grow flex flex-col gap-1 justify-center p-1 min-h-0">
      <Cronometro />
      <Puntuacion />
      <Faltas />
      <Cuarto />
    </div>
  </div>
</div>
  )
}

export default App