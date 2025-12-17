import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLecturasHijo } from "../../services/padresService";
import { MdArrowBack, MdMenuBook } from "react-icons/md";

export default function VerLecturasHijo() {
  const { hijoId } = useParams();
  const navigate = useNavigate();

  const [lecturas, setLecturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hijoId) return;

    const cargarLecturas = async () => {
      try {
        const data = await getLecturasHijo(hijoId);
        setLecturas(data);
      } catch (error) {
        console.error("❌ Error cargando lecturas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarLecturas();
  }, [hijoId]);

  if (loading) {
    return (
      <p className="text-center text-slate-500 mt-10">
        Cargando lecturas...
      </p>
    );
  }

  // 🔹 Agrupar lecturas por nivel
  const lecturasPorNivel = lecturas.reduce((acc, lectura) => {
    const nivel = lectura.nivel_dificultad;
    if (!acc[nivel]) acc[nivel] = [];
    acc[nivel].push(lectura);
    return acc;
  }, {});

  // 🔹 Determinar niveles desbloqueados
  const niveles = Object.keys(lecturasPorNivel)
    .map(Number)
    .sort((a, b) => a - b);

  const nivelesDesbloqueados = {};
  let nivelAnteriorCompleto = true;

  niveles.forEach((nivel) => {
    const todasCompletas = lecturasPorNivel[nivel].every(
      (l) => l.completada
    );
    nivelesDesbloqueados[nivel] = nivelAnteriorCompleto;
    nivelAnteriorCompleto = todasCompletas;
  });

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4">

        {/* VOLVER */}
        <button
          onClick={() => navigate(-1)}
          className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-blue-50 text-blue-700 font-medium
                     hover:bg-blue-100 transition"
        >
          <MdArrowBack size={18} />
          Volver
        </button>

        {/* TÍTULO */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white
                          flex items-center justify-center shadow">
            <MdMenuBook size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600">
              Lecturas del hijo
            </h1>
            <p className="text-sm text-slate-500">
              Selecciona una lectura para iniciar la práctica de pronunciación
            </p>
          </div>
        </div>
      </div>

      {/* LISTA POR NIVELES */}
      {niveles.map((nivel) => {
        const bloqueado = !nivelesDesbloqueados[nivel];

        return (
          <div key={nivel} className="space-y-3">

            {/* NIVEL */}
            <h2
              className={`text-lg font-bold ${
                bloqueado ? "text-slate-400" : "text-blue-500"
              }`}
            >
              Nivel {nivel} {bloqueado && "🔒"}
            </h2>

            {/* TARJETAS */}
            <div className="space-y-4">
              {lecturasPorNivel[nivel].map((l) => (
                <div
                  key={l.id}
                  className={`rounded-2xl border p-5 flex justify-between items-center
                    transition shadow-sm ${
                      bloqueado
                        ? "bg-slate-50 border-slate-200 opacity-60"
                        : "bg-white border-blue-100 hover:shadow-md"
                    }`}
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {l.titulo}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {l.completada
                        ? "✅ Lectura completada"
                        : "⏳ Pendiente"}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/padre/menu/hijos/${hijoId}/practica-ia`, {
                        state: {
                          estudianteId: hijoId,
                          lecturaId: l.id,
                        },
                      })
                    }
                    disabled={bloqueado}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm
                      transition ${
                        bloqueado
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                  >
                    🧠 Iniciar práctica
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
