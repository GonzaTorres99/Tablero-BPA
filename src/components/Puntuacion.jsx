import { useState } from "react"

const Puntuacion = () => {
  const [puntosLocal, setPuntosLocal] = useState(0)
  const [puntosVisitante, setPuntosVisitante] = useState(0)

  const handlePuntos = (equipo, operacion) => {
    const modificador = operacion === 'sumar' ? 1 : -1
    const actualizador = (prev) => Math.max(0, prev + modificador)

    equipo === 'local'
      ? setPuntosLocal(actualizador)
      : setPuntosVisitante(actualizador)
  }

  return (
    <div className="flex flex-col md:flex-row gap-1 p-1">
      {/* Equipo Local */}
      <div className="w-full md:w-1/2 bg-slate-900 p-2 rounded-xl shadow-2xl border-2 border-blue-500">
        <h2 className="text-lg font-bold text-center mb-1 text-blue-400">LOCAL</h2>
        <div className="text-4xl md:text-6xl font-mono font-bold text-center mb-2 text-blue-500">
          {puntosLocal}
        </div>

        <div className="flex gap-1 justify-center">
          <button
            onClick={() => handlePuntos('local', 'restar')}
            className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-lg
                  text-lg font-bold w-16 flex items-center justify-center
                  transition-all duration-200 transform hover:scale-105"
          >
            ➖
          </button>

          <button
            onClick={() => handlePuntos('local', 'sumar')}
            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg
                  text-lg font-bold w-16 flex items-center justify-center
                  transition-all duration-200 transform hover:scale-105"
          >
            ➕
          </button>
        </div>
      </div>

      {/* Equipo Visitante */}
      <div className="w-full md:w-1/2 bg-slate-900 p-2 rounded-xl shadow-2xl border-2 border-rose-500">
        <h2 className="text-lg font-bold text-center mb-1 text-rose-400">VISITANTE</h2>
        <div className="text-4xl md:text-6xl font-mono font-bold text-center mb-2 text-rose-500">
          {puntosVisitante}
        </div>

        <div className="flex gap-1 justify-center">
          <button
            onClick={() => handlePuntos('visitante', 'restar')}
            className="p-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-lg
                  text-lg font-bold w-16 flex items-center justify-center
                  transition-all duration-200 transform hover:scale-105"
          >
            ➖
          </button>

          <button
            onClick={() => handlePuntos('visitante', 'sumar')}
            className="p-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-lg
                  text-lg font-bold w-16 flex items-center justify-center
                  transition-all duration-200 transform hover:scale-105"
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  )
}

export default Puntuacion