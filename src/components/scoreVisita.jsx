// ScoreVisitor.jsx
import { useState } from "react";

const ScoreVisitor = () => {
  const [puntos, setPuntos] = useState(0);

  const handlePuntos = (operacion) => {
    setPuntos(prev => Math.max(0, operacion === 'sumar' ? prev + 1 : prev - 1));
  };

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl shadow-2xl border-2 border-rose-500 flex flex-col">
      {/* Cabecera compacta */}
      <h2 className="text-xs md:text-sm font-bold text-center py-1 text-rose-400  rounded-t-lg">
        VISITANTE
      </h2>
      
      {/* Contenedor principal para la puntuación - tamaño máximo */}
      <div className="flex-grow flex items-center justify-center p-1">
        {/* Puntuación con tamaño enorme */}
        <div className="text-8xl md:text-9xl lg:text-[10rem] font-mono font-bold text-rose-500">
          {puntos}
        </div>
      </div>

      {/* Botones compactos */}
      <div className="flex justify-center gap-1 p-1  rounded-b-lg">
        <button
          onClick={() => handlePuntos('restar')}
          className="p-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow
                    text-xs font-bold w-10 md:w-12 flex items-center justify-center
                    transition-all duration-200 transform hover:scale-105"
        >
          ➖
        </button>

        <button
          onClick={() => handlePuntos('sumar')}
          className="p-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow
                    text-xs font-bold w-10 md:w-12 flex items-center justify-center
                    transition-all duration-200 transform hover:scale-105"
        >
          ➕
        </button>
      </div>
    </div>
  );
};

export default ScoreVisitor;