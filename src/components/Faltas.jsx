import { useState } from "react"

const Faltas = () => {
  const [faltasLocal, setFaltasLocal] = useState(0)
  const [faltasVisitante, setFaltasVisitante] = useState(0)

  const handleFaltas = (equipo, operacion) => {
    const actualizador = (prev) => (prev === 5 ? 0 : prev + 1)
    equipo === 'local' 
      ? setFaltasLocal(actualizador)
      : setFaltasVisitante(actualizador)
  }

  const CasilleroFaltas = ({ cantidad, actual, color }) => {
    return (
      <div className={`p-2 rounded-lg text-center transition-all ${
        actual >= cantidad 
          ? `bg-gradient-to-br ${color.from} ${color.to} border-2 ${color.border}`
          : 'bg-slate-800 border-2 border-slate-600'
      }`}>
        <span className={`text-xl font-bold ${
          actual >= cantidad ? 'text-slate-100' : 'text-slate-400'
        }`}>
          {cantidad}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 p-2">
  {/* Faltas Local */}
  <div className="w-full md:w-1/2 bg-slate-900 p-3 rounded-xl shadow-2xl border-2 border-blue-500">
    <div className="flex items-center justify-between gap-2">
      <div className="grid grid-cols-5 gap-1 flex-grow">
        {[1, 2, 3, 4, 5].map((num) => (
          <CasilleroFaltas
            key={`local-${num}`}
            cantidad={num}
            actual={faltasLocal}
            color={{ 
              from: 'from-blue-500', 
              to: 'to-cyan-600', 
              border: 'border-cyan-300' 
            }}
          />
        ))}
      </div>
      <button
        onClick={() => handleFaltas('local')}
        className="p-2 bg-cyan-600 hover:bg-cyan-700 text-black rounded-lg shadow-lg
                  text-lg font-bold w-14 flex items-center justify-center
                  transition-all duration-200 transform hover:scale-105"
      >
        +
      </button>
    </div>
    <div className="mt-2 text-center text-cyan-400 font-semibold text-sm">
      FALTAS LOCAL
    </div>
  </div>

  {/* Faltas Visitante */}
  <div className="w-full md:w-1/2 bg-slate-900 p-3 rounded-xl shadow-2xl border-2 border-red-500">
    <div className="flex items-center justify-between gap-2">
      <div className="grid grid-cols-5 gap-1 flex-grow">
        {[1, 2, 3, 4, 5].map((num) => (
          <CasilleroFaltas
            key={`visitante-${num}`}
            cantidad={num}
            actual={faltasVisitante}
            color={{ 
              from: 'from-red-500', 
              to: 'to-rose-600', 
              border: 'border-red-300' 
            }}
          />
        ))}
      </div>
      <button
        onClick={() => handleFaltas('visitante')}
        className="p-2 bg-rose-600 hover:bg-rose-700 text-black rounded-lg shadow-lg
                  text-lg font-bold w-14 flex items-center justify-center
                  transition-all duration-200 transform hover:scale-105"
      >
        +
      </button>
    </div>
    <div className="mt-2 text-center text-red-400 font-semibold text-sm">
      FALTAS VISITANTE
    </div>
  </div>
</div>
  )
} 

export default Faltas