import { useEffect, useState } from "react";
import { getMisHijos } from "../../services/padresService";

export default function DashboardPadre() {
  const [hijos, setHijos] = useState([]);

  useEffect(() => {
    getMisHijos().then(setHijos);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        👨‍👩‍👧 Bienvenido al panel familiar
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Hijos vinculados</p>
          <p className="text-3xl font-bold">{hijos.length}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl shadow">
          <p className="text-gray-500">Lecturas disponibles</p>
          <p className="text-3xl font-bold">📚</p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl shadow">
          <p className="text-gray-500">Seguimiento IA</p>
          <p className="text-3xl font-bold">🤖</p>
        </div>
      </div>
    </div>
  );
}
