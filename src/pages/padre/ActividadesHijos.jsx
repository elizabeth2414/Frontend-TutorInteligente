import { useEffect, useState } from "react";
import { getMisHijos } from "../../services/padresService";
import { useNavigate } from "react-router-dom";
import { MdMenuBook, MdChildCare } from "react-icons/md";

export default function ActividadesHijos() {
  const [hijos, setHijos] = useState([]);
  const navigate = useNavigate();

  // ==========================
  // Cargar hijos (CORREGIDO)
  // ==========================
  useEffect(() => {
    getMisHijos().then((data) => {
      const lista = Array.isArray(data) ? data : [];

      const estudiantes = lista
        .map((item) => item.estudiante)
        .filter(Boolean);

      setHijos(estudiantes);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24 max-w-6xl mx-auto p-6 space-y-8">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow">
            <MdMenuBook size={26} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600">
              Actividades por hijo
            </h1>
            <p className="text-sm text-slate-600">
              Accede a las lecturas y actividades asignadas a cada hijo
            </p>
          </div>
        </div>

        {/* LISTA */}
        {hijos.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600 shadow-sm">
            No hay hijos disponibles.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {hijos.map((h) => (
              <div
                key={h.id}
                className="bg-white border border-blue-100 rounded-2xl
                           shadow-sm hover:shadow-md transition p-6
                           flex flex-col"
              >
                {/* AVATAR + NOMBRE */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-full bg-gradient-to-br
                               from-blue-500 to-indigo-500 text-white
                               flex items-center justify-center
                               text-2xl font-bold shadow"
                  >
                    {h.nombre?.charAt(0)}
                  </div>

                  <h2 className="mt-3 text-xl font-bold text-slate-800">
                    {h.nombre} {h.apellido}
                  </h2>

                  <span className="mt-1 text-sm text-slate-500">
                    Nivel {h.nivel_educativo}
                  </span>
                </div>

                {/* DESCRIPCIÓN */}
                <p className="mt-4 text-sm text-slate-600 text-center">
                  Consulta las lecturas asignadas y el estado de avance.
                </p>

                {/* BOTÓN */}
                <button
                  onClick={() =>
                    navigate(`/padre/menu/hijos/${h.id}/lecturas`)
                  }
                  className="mt-6 w-full inline-flex items-center justify-center gap-2
                             py-2.5 rounded-xl font-semibold
                             bg-blue-600 text-white hover:bg-blue-700
                             transition shadow"
                >
                  <MdChildCare />
                  Ver lecturas
                </button>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}
