// Cuarto.jsx optimizado para su nueva posición
import { useState } from "react";

const Cuarto = () => {
  const [cuartoActual, setCuartoActual] = useState(1);

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl border-2 border-indigo-500 flex flex-col">
      {/* Cabecera minimalista */}
      <div className="text-sm text-center py-1 text-indigo-400 bg-slate-800/80 rounded-t-lg">
        CUARTO
      </div>
      
      {/* Contenedor principal - ocupa máximo espacio */}
      <div className="flex-grow flex items-center justify-center p-1">
        {/* Número de cuarto enorme */}
        <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-indigo-500">
          {cuartoActual}
        </div>
      </div>

      {/* Botones compactos */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-800/50 rounded-b-lg">
        {[1, 2, 3, 4].map((num) => (
          <button 
            key={num}
            onClick={() => setCuartoActual(num)}
            className={`p-1 rounded transition-all ${
              cuartoActual === num 
                ? 'bg-gradient-to-br from-cyan-500 to-indigo-600 text-white'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            <span className="text-base font-bold">
              {num}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cuarto;