// src/pages/padre/MisHijos.jsx

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
      setHijos(data);
    } catch (error) {
      console.error("❌ Error obteniendo hijos:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      <main className="pt-28 flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center drop-shadow-md">
          👧👦 Mis Hijos
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate("/padre/menu/hijos/vincular")}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition"
          >
            ➕ Vincular Nuevo Hijo
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-700">Cargando hijos...</p>
        ) : hijos.length === 0 ? (
          <p className="text-center text-gray-600 text-xl font-medium">
            Aún no tienes hijos vinculados.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hijos.map((item, index) => {
              const estudiante = item.estudiante;
              const cursos = item.cursos || [];

              return (
                <div
                  key={index}
                  className="bg-white/90 p-6 rounded-3xl shadow-xl backdrop-blur-lg border border-white/30 hover:shadow-2xl transition"
                >
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="Avatar niño"
                      className="w-24 h-24 rounded-full border-2 border-blue-300 shadow-md"
                    />
                  </div>

                  {/* Nombre */}
                  <h2 className="text-2xl font-bold text-center text-blue-700">
                    {estudiante.nombre} {estudiante.apellido}
                  </h2>

                  {/* Curso */}
                  <p className="text-center text-gray-600 mt-2">
                    {cursos.length > 0
                      ? `Curso: ${cursos[0].nombre}`
                      : "Curso no asignado"}
                  </p>

                  {/* Botones */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() =>
                        navigate(`/padre/menu/hijos/${estudiante.id}/lecturas`)
                      }
                      className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 transition font-semibold"
                    >
                      📘 Ver Lecturas
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/padre/menu/hijos/${estudiante.id}/actividades`)
                      }
                      className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:scale-105 transition font-semibold"
                    >
                      🎯 Ver Actividades
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/padre/menu/progreso/${estudiante.id}`)
                      }
                      className="w-full py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 hover:scale-105 transition font-semibold"
                    >
                      📊 Ver Progreso
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
