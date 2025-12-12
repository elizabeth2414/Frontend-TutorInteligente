import { useEffect, useState } from "react";
import {
  getResumenDashboard,
  getEstudiantesDocente,
} from "../../services/docentesService";

import { getUsuarioActual } from "../../services/authService";

import {
  MdPeople,
  MdLibraryBooks,
  MdCheckCircle,
} from "react-icons/md";

export default function DashboardDocente() {
  const [resumen, setResumen] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const usuario = await getUsuarioActual();
      setDocente(usuario);

      const res = await getResumenDashboard();
      const ests = await getEstudiantesDocente();

      setResumen(res ?? {});
      setEstudiantes(ests ?? []);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !resumen) {
    return (
      <div className="p-10 text-center text-xl font-semibold text-blue-700">
        Cargando información del docente...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ============================ SALUDO ============================ */}
      <div className="bg-white p-7 rounded-2xl shadow mb-6 border">
        <h1 className="text-3xl font-bold text-blue-700">
          ¡Bienvenido, {docente?.nombre} {docente?.apellido}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Resumen general de tus estudiantes registrados
        </p>
      </div>

      {/* ============================ TARJETAS ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card
          color="bg-blue-100"
          icon={<MdPeople size={32} className="text-blue-700" />}
          titulo="Total Estudiantes"
          valor={resumen.total_estudiantes}
        />

        <Card
          color="bg-purple-100"
          icon={<MdLibraryBooks size={32} className="text-purple-700" />}
          titulo="Lecturas Realizadas"
          valor={resumen.total_lecturas}
        />

        <Card
          color="bg-green-100"
          icon={<MdCheckCircle size={32} className="text-green-700" />}
          titulo="Actividades Completadas"
          valor={resumen.actividades_completadas}
        />
      </div>

      {/* ============================ TABLA ESTUDIANTES ============================ */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          Estudiantes Registrados 📋
        </h2>

        {estudiantes.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2 text-left">Nombre</th>
                <th className="text-left">Curso</th>
                <th className="text-left">Nivel</th>
                <th className="text-left">Progreso</th>
                <th className="text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e) => (
                <tr key={e.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-medium">
                    {e.nombre} {e.apellido}
                  </td>
                  <td>{e.curso_nombre ?? "—"}</td>
                  <td>{e.nivel_educativo ?? "—"}</td>
                  <td>0%</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Activo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay estudiantes registrados.</p>
        )}
      </div>

    </div>
  );
}

/* ----------------------------------------
    COMPONENTE CARD MINI
---------------------------------------- */
function Card({ color, icon, titulo, valor }) {
  return (
    <div className="bg-white p-5 shadow-md rounded-2xl border flex gap-4 items-center">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm">{titulo}</p>
        <p className="text-3xl font-bold text-gray-900">{valor}</p>
      </div>
    </div>
  );
}
