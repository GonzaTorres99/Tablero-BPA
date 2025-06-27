// ShotClock.jsx optimizado para su nueva posición
import { useState, useEffect, useRef } from "react";

const ShotClock = () => {
  const [tiempo, setTiempo] = useState(24);
  const [corriendo, setCorriendo] = useState(false);
  const audioRef = useRef(null); // Referencia para el elemento de audio

  // Efecto para el contador
  useEffect(() => {
    let intervalo;
    if (corriendo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo((t) => t - 1);
      }, 1000);
    } else if (tiempo === 0) {
      setCorriendo(false);
    }
    return () => clearInterval(intervalo);
  }, [corriendo, tiempo]);

  // Efecto para la bocina cuando el tiempo llega a 0
  useEffect(() => {
    if (tiempo === 0) {
      // Intenta reproducir el sonido
      audioRef.current.play().catch(e => {
        console.error("Error al reproducir el sonido:", e);
      });
    }
  }, [tiempo]);

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl border-2 border-cyan-500 flex flex-col">
      {/* Elemento de audio oculto */}
      <audio ref={audioRef} src="/sounds/horn.mp3" preload="auto" />
      
      {/* Cabecera minimalista */}
      <div className="text-sm text-center py-1 text-cyan-400 bg-slate-800/80 rounded-t-lg">
        POSESIÓN
      </div>
      
      {/* Contenedor principal para el tiempo */}
      <div className="flex-grow flex flex-col items-center justify-center p-1">
        {/* Tiempo con tamaño enorme */}
        <div className="text-7xl md:text-8xl lg:text-9xl font-mono font-bold text-cyan-500">
          {tiempo.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Controles compactos */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-800/50 rounded-b-lg">
        <button
          onClick={() => setCorriendo(!corriendo)}
          className={`p-1 text-white rounded shadow text-sm font-bold
                    transition-all duration-200 ${corriendo
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'}`}
        >
          {corriendo ? '⏸ Pausar' : '▶️ Iniciar'}
        </button>

        <button
          onClick={() => {
            setCorriendo(false);
            setTiempo(24);
          }}
          className="p-1 bg-rose-600 hover:bg-rose-700 text-white rounded shadow
                    text-sm font-bold transition-all duration-200"
        >
          24s
        </button>

        <button
          onClick={() => {
            setCorriendo(false);
            setTiempo(14);
          }}
          className="p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow
                    text-sm font-bold transition-all duration-200 col-span-2"
        >
          14s
        </button>
      </div>
    </div>
  );
};

export default ShotClock;