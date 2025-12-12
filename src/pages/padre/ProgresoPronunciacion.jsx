import { useEffect, useState } from "react";
import {
  getMiHistorialPronunciacion,
  getMisPracticasPronunciacion,
} from "../../services/historialService";

export default function ProgresoPronunciacion() {
  const [pronunciacion, setPronunciacion] = useState([]);
  const [practicas, setPracticas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const p = await getMiHistorialPronunciacion();
        const pr = await getMisPracticasPronunciacion();
        setPronunciacion(p);
        setPracticas(pr);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando progreso...</p>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        📈 Mi progreso de pronunciación
      </h1>

      {/* ================= PRONUNCIACIÓN ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Lecturas evaluadas
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {pronunciacion.map((h) => (
            <div
              key={h.id}
              className="bg-white shadow rounded-xl p-4"
            >
              <p className="font-semibold">
                Puntuación: {h.puntuacion_global ?? "-"}
              </p>
              <p>Fluidez: {h.fluidez ?? "-"}</p>
              <p>Velocidad: {h.velocidad ?? "-"}</p>
              <p className="text-sm text-gray-500">
                {new Date(h.fecha).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRÁCTICAS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Prácticas de pronunciación
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {practicas.map((p) => (
            <div
              key={p.id}
              className="bg-green-50 border rounded-xl p-4"
            >
              <p className="font-semibold">
                Puntuación: {p.puntuacion ?? "-"}
              </p>
              <p>Errores corregidos: {p.errores_corregidos ?? 0}</p>
              <p className="text-sm text-gray-500">
                {new Date(p.fecha).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
