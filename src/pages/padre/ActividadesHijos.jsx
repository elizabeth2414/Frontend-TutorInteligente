import { useEffect, useState } from "react";
import { getMisHijos } from "../../services/padresService";
import { useNavigate } from "react-router-dom";

export default function ActividadesHijos() {
  const [hijos, setHijos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMisHijos().then(setHijos);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        📘 Actividades por hijo
      </h1>

      {hijos.map((h) => (
        <div
          key={h.id}
          className="bg-white p-4 rounded-xl shadow mb-3 flex justify-between"
        >
          <div>
            <p className="font-semibold">
              {h.nombre} {h.apellido}
            </p>
            <p className="text-sm text-gray-500">
              Nivel {h.nivel_educativo}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(`/padre/menu/hijos/${h.id}/lecturas`)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Ver lecturas
          </button>
        </div>
      ))}
    </div>
  );
}
