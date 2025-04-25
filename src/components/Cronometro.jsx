import { useState, useEffect } from "react"

const Cronometro = () => {
    const [tiempoCuarto, setTiempoCuarto] = useState(600)
    const [corriendoCuarto, setCorriendoCuarto] = useState(false)

    const [tiempo24, setTiempo24] = useState(24)
    const [corriendo24, setCorriendo24] = useState(false)

    // Efecto para el cronómetro del cuarto
    useEffect(() => {
        let intervalo
        if (corriendoCuarto && tiempoCuarto > 0) {
            intervalo = setInterval(() => {
                setTiempoCuarto((t) => t - 1)
            }, 1000)
        }
        return () => clearInterval(intervalo)
    }, [corriendoCuarto, tiempoCuarto])

    // Efecto para el contador de 24 segundos
    useEffect(() => {
        let intervalo
        if (corriendo24 && tiempo24 > 0) {
            intervalo = setInterval(() => {
                setTiempo24((t) => t - 1)
            }, 1000)
        } else if (tiempo24 === 0) {
            setCorriendo24(false)
        }
        return () => clearInterval(intervalo)
    }, [corriendo24, tiempo24])

    const formatearTiempo = (segundos) => {
        const mins = Math.floor(segundos / 60)
        const secs = segundos % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Nuevas funciones para ajustar el tiempo
    const ajustarTiempoCuarto = (operacion) => {
        if (operacion === 'sumar') {
            setTiempoCuarto(prev => prev + 60)
        } else {
            setTiempoCuarto(prev => Math.max(0, prev - 60))
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-1 p-1">
            {/* Cronómetro Principal */}
            <div className="w-full md:w-1/2 bg-slate-900 p-2 rounded-xl shadow-2xl border-2 border-purple-500">
                <h2 className="text-base font-bold text-center mb-1 text-purple-400">CUARTO</h2>
                <div className="text-3xl md:text-4xl font-mono font-bold text-center mb-2 text-purple-500">
                    {formatearTiempo(tiempoCuarto)}
                </div>

                <div className="grid grid-cols-2 gap-1">
                    <button
                        onClick={() => ajustarTiempoCuarto('sumar')}
                        className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-black rounded-lg shadow-lg
                    text-base font-bold transition-all duration-200"
                    >
                        +
                    </button>
                    
                    <button
                        onClick={() => ajustarTiempoCuarto('restar')}
                        className="p-1.5 bg-rose-600 hover:bg-rose-700 text-black rounded-lg shadow-lg
                    text-base font-bold transition-all duration-200"
                    >
                        -
                    </button>

                    <button
                        onClick={() => setCorriendoCuarto(!corriendoCuarto)}
                        className={`p-1.5 text-white rounded-lg shadow-lg text-base font-bold
            transition-all duration-200 ${corriendoCuarto
                                ? 'bg-amber-600 hover:bg-amber-700'
                                : 'bg-emerald-600 hover:bg-emerald-700'}`}
                    >
                        {corriendoCuarto ? '⏸' : '▶️'}
                    </button>

                    <button
                        onClick={() => {
                            setCorriendoCuarto(false)
                            setTiempoCuarto(600)
                        }}
                        className="p-1.5 bg-rose-600 hover:bg-rose-700 text-black rounded-lg shadow-lg
                    text-base font-bold transition-all duration-200"
                    >
                        🔄
                    </button>
                </div>
            </div>

            {/* Contador 24 Segundos (se mantiene igual) */}
            <div className="w-full md:w-1/2 bg-slate-900 p-2 rounded-xl shadow-2xl border-2 border-cyan-500">
                <h2 className="text-base font-bold text-center mb-1 text-cyan-400">POSESIÓN</h2>
                <div className="text-3xl md:text-4xl font-mono font-bold text-center mb-2 text-cyan-500">
                    {tiempo24.toString().padStart(2, '0')}
                </div>

                <div className="grid grid-cols-2 gap-1">
                    <button
                        onClick={() => setCorriendo24(!corriendo24)}
                        className={`p-1.5 text-black rounded-lg shadow-lg text-base font-bold 
            transition-all duration-200 ${corriendo24
                                ? 'bg-amber-600 hover:bg-amber-700'
                                : 'bg-emerald-600 hover:bg-emerald-700'}`}
                    >
                        {corriendo24 ? '⏸' : '▶️'}
                    </button>

                    <button
                        onClick={() => {
                            setCorriendo24(false)
                            setTiempo24(24)
                        }}
                        className="p-1.5 bg-rose-600 hover:bg-rose-700 text-black rounded-lg shadow-lg
                    text-base font-bold transition-all duration-200"
                    >
                        24s
                    </button>

                    <button
                        onClick={() => {
                            setCorriendo24(false)
                            setTiempo24(14)
                        }}
                        className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-black rounded-lg shadow-lg
                    text-base font-bold transition-all duration-200 col-span-2"
                    >
                        14s
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cronometro