import { useState } from "react";

const ScoreLocal = () => {
  const [puntos, setPuntos] = useState(0);
  const [equipo, setEquipo] = useState("blanco");
  
  // Mapeo de equipos a colores (se agregó "negro")
  const coloresEquipos = {
    blanco: { 
      border: "border-gray-300",
      text: "text-gray-300",
      bg: "bg-gray-100/10"
    },
    amarillo: { 
      border: "border-yellow-500",
      text: "text-yellow-500",
      bg: "bg-yellow-900/20"
    },
    rojo: { 
      border: "border-red-500",
      text: "text-red-500",
      bg: "bg-red-900/20"
    },
    naranja: { 
      border: "border-orange-500",
      text: "text-orange-500",
      bg: "bg-orange-900/20"
    },
    azul: { 
      border: "border-blue-500",
      text: "text-blue-500",
      bg: "bg-blue-900/20"
    },
    rosa: { 
      border: "border-pink-500",
      text: "text-pink-500",
      bg: "bg-pink-900/20"
    },
    celeste: { 
      border: "border-cyan-300",
      text: "text-cyan-300",
      bg: "bg-cyan-900/20"
    },
    verde: { 
      border: "border-green-500",
      text: "text-green-500",
      bg: "bg-green-900/20"
    },
    negro: {
      border: "border-black",
      text: "text-white",
      bg: "bg-black/40"
    }
  };

  const handlePuntos = (operacion) => {
    setPuntos(prev => Math.max(0, operacion === 'sumar' ? prev + 1 : prev - 1));
  };

  return (
    <div className={`w-full h-full bg-slate-900 rounded-xl shadow-2xl border-2 ${coloresEquipos[equipo].border} flex flex-col`}>
      {/* Cabecera con selector de equipo - tamaño aumentado */}
      <div className="flex flex-col items-center bg-slate-800 rounded-t-lg px-2 py-2">
        {/* Nombre del equipo más grande y prominente */}
        <div className={`text-2xl md:text-3xl font-bold mb-1 ${coloresEquipos[equipo].text} text-center`}>
          {equipo.toUpperCase()}
        </div>
        
        <select 
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          className={`text-xs md:text-sm bg-slate-700 rounded px-1 py-0.5 ${coloresEquipos[equipo].text} focus:outline-none w-full max-w-[120px]`}
        >
          {Object.keys(coloresEquipos).map(color => (
            <option 
              key={color} 
              value={color}
              className={`${coloresEquipos[color].bg} ${coloresEquipos[color].text}`}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Contenedor principal para la puntuación */}
      <div className="flex-grow flex items-center justify-center p-1">
        <div className="text-8xl md:text-9xl lg:text-[10rem] font-mono font-bold text-white">
          {puntos}
        </div>
      </div>

      {/* Botones compactos */}
      <div className="flex justify-center gap-1 p-1 bg-slate-800/50 rounded-b-lg">
        <button
          onClick={() => handlePuntos('restar')}
          className="p-1 bg-white text-black rounded-lg shadow
                    text-xs font-bold w-10 md:w-12 flex items-center justify-center
                    transition-all duration-200 transform hover:scale-105"
        >
          ➖
        </button>

        <button
          onClick={() => handlePuntos('sumar')}
          className="p-1 bg-white text-black rounded-lg shadow
                    text-xs font-bold w-10 md:w-12 flex items-center justify-center
                    transition-all duration-200 transform hover:scale-105"
        >
          ➕
        </button>
      </div>
    </div>
  );
};

export default ScoreLocal;
