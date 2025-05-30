import { useState } from "react";

const Faltas = () => {
  const [faltasLocal, setFaltasLocal] = useState(0);
  const [faltasVisitante, setFaltasVisitante] = useState(0);

  const handleFaltas = (equipo) => {
    const actualizador = (prev) => (prev === 5 ? 0 : prev + 1);
    equipo === 'local' 
      ? setFaltasLocal(actualizador)
      : setFaltasVisitante(actualizador);
  };

  const CasilleroFaltas = ({ cantidad, actual, color }) => {
    return (
      <div className={`flex-1 flex items-center justify-center rounded-lg transition-all ${
        actual >= cantidad 
          ? `bg-gradient-to-br ${color.from} ${color.to} border-2 ${color.border}`
          : 'bg-slate-800 border-2 border-slate-600'
      }`}>
        <span className={`text-3xl md:text-4xl font-bold ${
          actual >= cantidad ? 'text-slate-100' : 'text-slate-400'
        }`}>
          {cantidad}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Faltas Local - mitad superior */}
      <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border-2 border-blue-500 p-1">
        <div className="flex justify-center items-center gap-1 mb-1">
          <div className="text-xl md:text-2xl font-bold text-blue-400">
            FALTAS LOCAL
          </div>
          <button
            onClick={() => handleFaltas('local')}
            className="p-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded shadow
                      text-lg font-bold flex items-center justify-center
                      transition-all duration-200 transform hover:scale-105 w-10"
          >
            +
          </button>
        </div>
        
        <div className="flex-grow grid grid-cols-5 gap-1">
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
      </div>
      
      {/* Separador */}
      <div className="h-1"></div>
      
      {/* Faltas Visitante - mitad inferior */}
      <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border-2 border-red-500 p-1">
        <div className="flex justify-center items-center gap-1 mb-1">
          <div className="text-xl md:text-2xl font-bold text-red-400">
            FALTAS VISITANTE
          </div>
          <button
            onClick={() => handleFaltas('visitante')}
            className="p-1 bg-rose-600 hover:bg-rose-700 text-white rounded shadow
                      text-lg font-bold flex items-center justify-center
                      transition-all duration-200 transform hover:scale-105 w-10"
          >
            +
          </button>
        </div>
        
        <div className="flex-grow grid grid-cols-5 gap-1">
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
      </div>
    </div>
  );
};

export default Faltas;