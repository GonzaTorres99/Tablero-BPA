import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import sounds from "../soundsList";

const ModalAudios = () => {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Cierra el modal al pulsar Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Ref para la instancia de Audio actual y estado para mostrar indicador
  const currentAudioRef = useRef(null);
  const [playingName, setPlayingName] = useState(null);

  // Limpieza al desmontar: detener cualquier audio
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        try {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0;
        } catch (e) {}
        currentAudioRef.current = null;
      }
    };
  }, []);

  // Función para detener el audio en reproducción
  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch (e) {
        console.error('Error al detener audio:', e);
      }
      currentAudioRef.current = null;
    }
    setPlayingName(null);
  };

  return (
    <>
      {/* BOTÓN PARA ABRIR EL MODAL */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-slate-800 text-white rounded-lg shadow-lg 
                   font-semibold hover:scale-105 transition-transform"
      >
        Abrir audios
      </button>

      {/* Renderizamos el overlay como portal en document.body para evitar que
          quede restringido por contenedores padres (por ejemplo, header con
          backdrop-filter) */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onMouseDown={(e) => {
            // Si el click fue en el overlay (no en el panel), cerramos
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* Contenedor del modal */}
          <div className="bg-slate-900 border-2 border-slate-700 rounded-xl shadow-2xl p-5 w-full max-w-md mx-4">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Seleccionar Audio</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-white text-xl font-bold hover:scale-110 transition"
              >
                ✖
              </button>
            </div>

            {/* GRID DE BOTONES A PARTIR DE la lista `soundsList` */}
            <div className="grid grid-cols-4 gap-3">
              {sounds.map((s, i) => (
                <button
                  key={s.file + i}
                  onClick={() => {
                    try {
                      // Si hay un audio reproduciéndose, lo detenemos
                      if (currentAudioRef.current) {
                        try {
                          currentAudioRef.current.pause();
                          currentAudioRef.current.currentTime = 0;
                        } catch (e) {}
                        currentAudioRef.current = null;
                        setPlayingName(null);
                      }

                      const audio = new Audio(`/sounds/${s.file}`);
                      audio.currentTime = 0;
                      audio.onended = () => {
                        currentAudioRef.current = null;
                        setPlayingName(null);
                      };

                      const playPromise = audio.play();
                      if (playPromise !== undefined) {
                        playPromise
                          .then(() => {
                            // Guardamos la referencia y mostramos indicador
                            currentAudioRef.current = audio;
                            setPlayingName(s.name);
                            setOpen(false);
                          })
                          .catch(e => {
                            console.error('Error al reproducir audio:', e);
                          });
                      } else {
                        // Fallback: asumimos que inició y procedemos
                        currentAudioRef.current = audio;
                        setPlayingName(s.name);
                        setOpen(false);
                      }
                    } catch (err) {
                      console.error('No se pudo reproducir:', err);
                    }
                  }}
                  className="min-w-0 bg-slate-800 text-white border border-slate-600 
                             rounded-lg p-3 text-left font-semibold
                             hover:bg-slate-700 hover:scale-105 transition overflow-hidden"
                  aria-label={`Reproducir ${s.name}`}
                  title={s.name}
                >
                  <span className="block truncate w-full">{s.name}</span>
                </button>
              ))}
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Indicador fijo del audio en reproducción (pill) */}
      {playingName && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex items-center gap-3 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg">
            <div className="max-w-xs truncate font-semibold" title={playingName}>{playingName}</div>
            <button
              onClick={stopCurrentAudio}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
              aria-label="Detener audio"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAudios;
