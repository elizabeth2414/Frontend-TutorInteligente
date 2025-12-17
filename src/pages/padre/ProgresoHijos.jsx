import { useEffect, useState } from "react";
import {
  getHistorialPronunciacionHijo,
  getPracticasPronunciacionHijo,
} from "../../services/historialService";
import { getMisHijos } from "../../services/padresService";

import PronunciacionChart from "../../components/charts/PronunciacionChart";
import PracticasChart from "../../components/charts/PracticasChart";

import { MdInsights, MdTrendingUp, MdFlag } from "react-icons/md";

export default function ProgresoHijos() {
  const [hijos, setHijos] = useState([]);
  const [activo, setActivo] = useState(null);
  const [pron, setPron] = useState([]);
  const [prac, setPrac] = useState([]);

  // ==========================
  // Cargar hijos (CORREGIDO)
  // ==========================
  useEffect(() => {
    getMisHijos().then((data) => {
      const lista = Array.isArray(data) ? data : [];

      // extraemos SOLO el estudiante
      const estudiantes = lista
        .map((item) => item.estudiante)
        .filter(Boolean);

      setHijos(estudiantes);
    });
  }, []);

  // ==========================
  // Cargar progreso del hijo
  // ==========================
  const cargar = async (id) => {
    setActivo(id);
    setPron(await getHistorialPronunciacionHijo(id));
    setPrac(await getPracticasPronunciacionHijo(id));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 max-w-6xl mx-auto p-6 space-y-8">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow">
            <MdInsights size={26} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600">
              Progreso académico
            </h1>
            <p className="text-sm text-slate-600">
              Seguimiento del avance en pronunciación y prácticas
            </p>
          </div>
        </div>

        {/* SELECTOR DE HIJOS */}
        <section className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Selecciona un hijo
          </p>

          {hijos.length === 0 ? (
            <p className="text-sm text-slate-500">
              No hay hijos disponibles.
            </p>
          ) : (
            <div className="flex gap-3 flex-wrap">
              {hijos.map((h) => (
                <button
                  key={h.id}
                  onClick={() => cargar(h.id)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition
                    ${
                      activo === h.id
                        ? "bg-blue-600 text-white shadow"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                >
                  {h.nombre}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* CONTENIDO */}
        {activo ? (
          <div className="space-y-6">

            {/* PRONUNCIACIÓN */}
            <section className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <MdTrendingUp size={22} />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Evolución de pronunciación
                </h2>
              </div>

              <PronunciacionChart data={pron} />
            </section>

            {/* PRÁCTICAS */}
            <section className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <MdFlag size={22} />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Prácticas de pronunciación
                </h2>
              </div>

              <PracticasChart data={prac} />
            </section>

          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600 shadow-sm">
            Selecciona un hijo para visualizar su progreso académico.
          </div>
        )}

      </div>
    </div>
  );
}
