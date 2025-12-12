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
      console.log("🚸 Hijos recibidos:", data);
      setHijos(data ?? []);
    } catch (error) {
      console.error("❌ Error obteniendo hijos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 max-w-7xl mx-auto p-6">

        {/* TÍTULO */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Mis Hijos
          </h1>

          <button
            onClick={() => navigate("/padre/menu/hijos/vincular")}
            className="mt-4 md:mt-0 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
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

              if (!estudiante) return null;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6 flex flex-col"
                >

                  {/* NOMBRE */}
                  <h2 className="text-xl font-bold text-gray-800 text-center">
                    {estudiante.nombre} {estudiante.apellido}
                  </h2>

                  {/* CURSO */}
                  <div className="flex justify-center mt-3">
                    {cursos.length > 0 ? (
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
                      onClick={() =>
                        navigate(
                          `/padre/menu/hijos/${estudiante.id}/lecturas`
                        )
                      }
                      className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      📘 Ver Lecturas
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/padre/menu/hijos/${estudiante.id}/practica-ia`
                        )
                      }
                      className="w-full py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      🧠 Práctica de Pronunciación
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
