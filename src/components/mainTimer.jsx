// MainTimer.jsx
import { useState, useEffect, useRef } from "react";

const MainTimer = () => {
  const [tiempoCuarto, setTiempoCuarto] = useState(600);
  const [corriendo, setCorriendo] = useState(false);
  const audioRef = useRef(null); // Referencia para el elemento de audio

  useEffect(() => {
    let intervalo;
    if (corriendo && tiempoCuarto > 0) {
      intervalo = setInterval(() => {
        setTiempoCuarto((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [corriendo, tiempoCuarto]);

  // Efecto para la bocina cuando el tiempo llega a 0
  useEffect(() => {
    if (tiempoCuarto === 0) {
      // Intenta reproducir el sonido
      audioRef.current.play().catch(e => {
        console.error("Error al reproducir el sonido:", e);
      });
    }
  }, [tiempoCuarto]);

  const formatearTiempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const ajustarTiempo = (operacion) => {
    if (operacion === 'sumar') {
      setTiempoCuarto(prev => prev + 60);
    } else {
      setTiempoCuarto(prev => Math.max(0, prev - 60));
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl shadow-2xl border-2 border-purple-500 flex flex-col">
      {/* Elemento de audio oculto */}
      <audio ref={audioRef} src="/sounds/horn.mp3" preload="auto" />
      
      {/* Contenedor principal para el tiempo - ocupa máximo espacio */}
      <div className="flex-grow flex flex-col items-center justify-center p-1">
        {/* Tiempo con tamaño adaptativo usando clamp() */}
        <div 
          className="text-white font-mono font-bold text-center w-full"
          style={{ 
            fontSize: 'clamp(3rem, 15vw, 12rem)',
            lineHeight: 1,
            textShadow: '0 0 10px rgba(192, 132, 252, 0.7)'
          }}
        >
          {formatearTiempo(tiempoCuarto)}
        </div>
      </div>

      {/* Botones más compactos */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-800/50 rounded-b-lg">
        <button
          onClick={() => ajustarTiempo('sumar')}
          className="p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow
                    text-xs md:text-sm font-bold transition-all duration-200"
        >
          +1 min
        </button>
        
        <button
          onClick={() => ajustarTiempo('restar')}
          className="p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow
                    text-xs md:text-sm font-bold transition-all duration-200"
        >
          -1 min
        </button>

        <button
          onClick={() => setCorriendo(!corriendo)}
          className={`p-1 text-white rounded-lg shadow text-xs md:text-sm font-bold
                    transition-all duration-200 ${corriendo
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'}`}
        >
          {corriendo ? '⏸ Pausar' : '▶️ Iniciar'}
        </button>

        <button
          onClick={() => {
            setCorriendo(false);
            setTiempoCuarto(600);
          }}
          className="p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow
                    text-xs md:text-sm font-bold transition-all duration-200"
        >
          🔄 Reiniciar
        </button>
      </div>
    </div>
  );
};

export default MainTimer;