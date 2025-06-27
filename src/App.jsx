import { useRef, useState } from "react";
import Cronometro from './components/Cronometro';
import Puntuacion from './components/Puntuacion';
import Cuarto from './components/Cuarto';
import Faltas from './components/Faltas';
import ScoreLocal from "./components/scoreLocal";
import ScoreVisitor from "./components/scoreVisita";
import ShotClock from "./components/shotClock";
import MainTimer from "./components/mainTimer";
import './App.css';

const App = () => {
  // Referencia para el audio de la bocina
  const hornAudioRef = useRef(null);

  // Estado para la animación de pulsación
  const [isPressed, setIsPressed] = useState(false);

  // Función para reproducir la bocina
  const playHorn = () => {
    if (hornAudioRef.current) {
      // Reiniciamos el audio antes de reproducir
      hornAudioRef.current.currentTime = 0;

      // Reproducimos con manejo de errores
      hornAudioRef.current.play().catch(e => {
        console.error("Error al reproducir bocina:", e);
      });

      // Animación de pulsación
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 300);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Elemento de audio oculto */}
      <audio ref={hornAudioRef} src="/sounds/horn.mp3" preload="auto" />

      {/* Contenedor principal con título */}
      <div className="h-full flex flex-col pt-24"> {/* Máximo recomendado */}
  <div className="absolute top-0 left-0 right-0 z-10 bg-slate-900/80 backdrop-blur-sm w-full py-5">
    <h1 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
      TABLERO <span className="text-amber-400">BPA</span>
    </h1>
    <div className="h-1.5 w-20 md:w-28 mx-auto bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mt-3"></div>
  </div>

        {/* Grid principal con la estructura original de 7x6 */}
        <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full p-4">
          {/* Div1 - Tablero local (1/1 - 4/4) */}
          <div className="row-start-1 row-end-4 col-start-1 col-end-4">
            <ScoreLocal />
          </div>

         {/* Div2 - Logo central (1/4 - 2/5) */}
<div className="row-start-1 row-end-2 col-start-4 col-end-5 p-1">
  <div className="w-full h-full flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-sm p-1 shadow-lg hover:shadow-xl transition-all">
    <button 
  onClick={playHorn}
  className={`w-full h-full bg-transparent border-0 p-0 focus:outline-none ${isPressed ? 'scale-90' : ''}`}
  style={{ transition: 'transform 0.3s ease' }}
>
  <img
    src="./logoBPA.png"
    alt="Logo BPA"
    className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
    style={{ background: 'transparent' }}
  />
</button>
  </div>
</div>

          {/* Div3 - Tablero visitante (1/5 - 4/8) */}
          <div className="row-start-1 row-end-4 col-start-5 col-end-8">
            <ScoreLocal />
          </div>

          {/* Div4 - Cronómetro principal (4/3 - 7/6) */}
          <div className="row-start-4 row-end-7 col-start-3 col-end-6">
            <MainTimer />
          </div>

          {/* Div5 - Cuarto (2/4 - 4/5) */}
          <div className="row-start-2 row-end-4 col-start-4 col-end-5 flex flex-col gap-1">
            <Cuarto />
          </div>

          {/* Div6 - Faltas (4/1 - 7/3) */}
          <div className="row-start-4 row-end-7 col-start-1 col-end-3">
            <Faltas />
          </div>

          {/* Div7 - ShotClock (4/6 - 7/8) */}
          <div className="row-start-4 row-end-7 col-start-6 col-end-8">
            <ShotClock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;