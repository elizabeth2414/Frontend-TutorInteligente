import { useEffect, useState } from "react";
import {
  getHistorialPronunciacionHijo,
  getPracticasPronunciacionHijo,
} from "../../services/historialService";
import { getMisHijos } from "../../services/padresService";

import PronunciacionChart from "../../components/charts/PronunciacionChart";
import PracticasChart from "../../components/charts/PracticasChart";

export default function ProgresoHijos() {
  const [hijos, setHijos] = useState([]);
  const [activo, setActivo] = useState(null);
  const [pron, setPron] = useState([]);
  const [prac, setPrac] = useState([]);

  useEffect(() => {
    getMisHijos().then(setHijos);
  }, []);

  const cargar = async (id) => {
    setActivo(id);
    setPron(await getHistorialPronunciacionHijo(id));
    setPrac(await getPracticasPronunciacionHijo(id));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        📊 Progreso académico del hijo
      </h1>

      {/* SELECTOR HIJO */}
      <div className="flex gap-3 flex-wrap">
        {hijos.map((h) => (
          <button
            key={h.id}
            onClick={() => cargar(h.id)}
            className={`px-4 py-2 rounded-lg ${
              activo === h.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {h.nombre}
          </button>
        ))}
      </div>

      {activo && (
        <>
          {/* ===== GRÁFICA PRONUNCIACIÓN ===== */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">
              📈 Evolución de pronunciación
            </h2>
            <PronunciacionChart data={pron} />
          </div>

          {/* ===== GRÁFICA PRÁCTICAS ===== */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">
              🎯 Prácticas de pronunciación
            </h2>
            <PracticasChart data={prac} />
          </div>
        </>
      )}
    </div>
  );
}
