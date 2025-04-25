import { useState } from "react"

const Cuarto = () => {
  const [cuartoActual, setCuartoActual] = useState(1)

  const handleCambiarCuarto = () => {
    setCuartoActual(prev => prev === 4 ? 1 : prev + 1)
  }

  return (
    <div className="bg-slate-900 p-3 rounded-xl shadow-2xl border-2 border-purple-500 max-w-md mx-auto">
  <div className="flex items-center justify-between gap-2">
    <div className="grid grid-cols-4 gap-1 flex-grow">
      {[1, 2, 3, 4].map((num) => (
        <div 
          key={num}
          className={`p-1.5 rounded-lg text-center transition-all ${
            cuartoActual === num 
              ? 'bg-gradient-to-br from-cyan-500 to-purple-600 border-2 border-cyan-300'
              : 'bg-slate-800 border-2 border-slate-600'
          }`}
        >
          <span className={`text-xl md:text-2xl font-bold ${
            cuartoActual === num ? 'text-slate-100' : 'text-slate-400'
          }`}>
            {num}
          </span>
        </div>
      ))}
    </div>
    <button
      onClick={handleCambiarCuarto}
      className="p-2 bg-emerald-600 hover:bg-emerald-700 text-black rounded-lg shadow-lg
                text-lg font-bold w-14 flex items-center justify-center
                transition-all duration-200 transform hover:scale-105"
    >
      ▶
    </button>
  </div>
  <div className="mt-2 text-center text-purple-400 font-semibold text-sm">
    CUARTO ACTUAL
  </div>
</div>
  )
} 

export default Cuarto