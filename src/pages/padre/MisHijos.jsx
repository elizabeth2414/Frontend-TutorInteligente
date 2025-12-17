import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHijosPadre } from "../../services/padresService";

export default function MisHijos() {
  const navigate = useNavigate();
  const [hijos, setHijos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarHijos();
  }, []);

  const cargarHijos = async () => {
    try {
      const data = await getHijosPadre();
      setHijos(data ?? []);
    } catch (error) {
      console.error("❌ Error obteniendo hijos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24 max-w-7xl mx-auto p-6 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              Mis Hijos
            </h1>
            <p className="text-sm text-gray-500">
              {hijos.length > 0
                ? `Tienes ${hijos.length} hijo${hijos.length > 1 ? "s" : ""} vinculado${hijos.length > 1 ? "s" : ""}`
                : "Aún no tienes hijos vinculados"}
            </p>
          </div>

          <button
            onClick={() => navigate("/padre/menu/hijos/vincular")}
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            ➕ Vincular Hijo
          </button>
        </div>

        {/* ESTADOS */}
        {loading ? (
          <p className="text-center text-gray-600">
            Cargando hijos...
          </p>
        ) : hijos.length === 0 ? (
          <div className="bg-white border rounded-xl p-10 text-center text-gray-600">
            Aún no tienes hijos vinculados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {hijos.map((item, index) => {
              const estudiante = item.estudiante;
              const cursos = item.cursos || [];
              const tieneCurso = cursos.length > 0;

              if (!estudiante) return null;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200
                             shadow-sm hover:shadow-md hover:-translate-y-0.5
                             transition p-6 flex flex-col"
                >

                  {/* AVATAR */}
                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white
                                    flex items-center justify-center text-xl font-bold shadow">
                      {estudiante.nombre.charAt(0)}
                    </div>
                  </div>

                  {/* NOMBRE */}
                  <h2 className="mt-3 text-xl font-bold text-gray-800 text-center">
                    {estudiante.nombre} {estudiante.apellido}
                  </h2>

                  {/* CURSO */}
                  <div className="flex justify-center mt-2">
                    {tieneCurso ? (
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
                        {cursos[0].nombre}
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-500">
                        Curso no asignado
                      </span>
                    )}
                  </div>

                  {/* BOTONES */}
                  <div className="mt-6 space-y-3">
                    <button
                      disabled={!tieneCurso}
                      onClick={() =>
                        navigate(`/padre/menu/hijos/${estudiante.id}/lecturas`)
                      }
                      className={`w-full py-2.5 rounded-xl font-semibold transition
                        ${
                          tieneCurso
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      📘 Ver Lecturas
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/padre/menu/hijos/${estudiante.id}/practica-ia`)
                      }
                      className="w-full py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      🧠 Práctica de Pronunciación
                    </button>

                    <button
                      onClick={() =>
                      navigate(`/padre/menu/hijos/${estudiante.id}/juego`)
                      }
                      className="w-full py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                      >
                      🎮 Mi aventura
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}
      </main>
    </div>
  );
}
