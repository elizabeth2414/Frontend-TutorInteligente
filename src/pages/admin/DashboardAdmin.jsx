import { useState, useEffect } from "react";
import {
  MdPeople,
  MdSchool,
  MdAutoStories,
  MdAssessment,
} from "react-icons/md";

import { obtenerDashboardAdmin } from "../../services/adminDashboardService";
import AdminBarChart from "../../components/admin/charts/AdminBarChart";
import AdminDonutChart from "../../components/admin/charts/AdminDonutChart";

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    docentes: 0,
    estudiantes: 0,
    lecturas: 0,
    actividades: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar datos reales del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDashboardAdmin();

        setStats({
          docentes: data.docentes,
          estudiantes: data.estudiantes,
          lecturas: data.lecturas,
          actividades: data.actividades,
        });
      } catch (error) {
        console.error("Error obteniendo estadísticas:", error);
        setErrorMsg("No se pudieron cargar los datos del sistema.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // componente de tarjeta
  const Card = ({ bgColor, icon: Icon, title, value, textColor }) => (
    <div className="bg-white/80 backdrop-blur-lg border border-white/40 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-4 rounded-2xl`}>
          <Icon className={textColor} size={36} />
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade">

      <h1 className="text-4xl font-extrabold text-blue-600 drop-shadow-sm mb-6">
        Panel Administrativo
      </h1>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-xl shadow-md mb-6">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="text-xl text-gray-700 animate-pulse">Cargando datos...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              bgColor="bg-blue-200"
              icon={MdSchool}
              title="Docentes"
              value={stats.docentes}
              textColor="text-blue-700"
            />

            <Card
              bgColor="bg-purple-200"
              icon={MdPeople}
              title="Estudiantes"
              value={stats.estudiantes}
              textColor="text-purple-700"
            />

            <Card
              bgColor="bg-pink-200"
              icon={MdAutoStories}
              title="Lecturas"
              value={stats.lecturas}
              textColor="text-pink-700"
            />

            <Card
              bgColor="bg-green-200"
              icon={MdAssessment}
              title="Actividades"
              value={stats.actividades}
              textColor="text-green-700"
            />
          </div>

          <div className="
            mt-10 bg-white/80 backdrop-blur-md border border-white/40 
            p-6 rounded-3xl shadow-xl
          ">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Actividad reciente del sistema
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
  <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl">
    <h2 className="text-xl font-bold text-blue-700 mb-4">
      Resumen general
    </h2>
    <AdminBarChart stats={stats} />
  </div>

  <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl">
    <h2 className="text-xl font-bold text-blue-700 mb-4">
      Distribución del sistema
    </h2>
    <AdminDonutChart stats={stats} />
  </div>
</div>

          </div>
        </>
      )}
    </div>
  );
}
