// src/pages/padre/VerLecturasHijo.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLecturasHijo } from "../../services/padresService";

export default function VerLecturasHijo() {
  const { hijoId } = useParams();
  const navigate = useNavigate();

  const [lecturas, setLecturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarLecturas();
  }, []);

  const cargarLecturas = async () => {
    try {
      const data = await getLecturasHijo(hijoId);

      const limpias = data.map((lec) => ({
        id: lec.id,
        titulo: lec.titulo,
        descripcion: lec.descripcion,
        contenido: lec.contenido,
        curso: lec.curso || "Sin curso",
        actividades: Array.isArray(lec.actividades) ? lec.actividades : [],
      }));

      setLecturas(limpias);
    } catch (error) {
      console.error("❌ Error cargando lecturas:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex flex-col">

      <div className="pt-24 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-md">
          📚 Lecturas del Hijo
        </h1>
        <p className="text-gray-700 mt-2">Selecciona una lectura para ver sus actividades</p>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition shadow-md"
        >
          ⬅ Volver
        </button>
      </div>

      <main className="flex-1 p-8">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Cargando lecturas...</p>
        ) : lecturas.length === 0 ? (
          <p className="text-center text-gray-600 text-xl font-medium">
            No hay lecturas asignadas.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lecturas.map((lec) => (
              <div
                key={lec.id}
                className="bg-white/90 p-6 rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition"
              >
                <h2 className="text-xl font-bold text-blue-700">{lec.titulo}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {lec.descripcion || "Sin descripción"}
                </p>

                <p className="text-sm text-purple-700 mt-2">
                  Curso: {lec.curso}
                </p>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-green-600 mb-2">📌 Actividades</h3>
                  {lec.actividades.length === 0 ? (
                    <p className="text-gray-500 text-sm">No hay actividades.</p>
                  ) : (
                    <ul className="list-disc ml-5">
                      {lec.actividades.map((a) => (
                        <li key={a.id}>{a.titulo || `Actividad ${a.id}`}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/padre/menu/hijos/${hijoId}/lecturas/${lec.id}`)}
                  className="w-full mt-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 transition"
                >
                  📖 Leer contenido
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
