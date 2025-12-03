import { useEffect, useState } from "react";
import {
  getResumenDashboard,
  getProgresoMensual,
  getRendimientoCursos,
  getNiveles,
} from "../../services/docentesService";

import { getUsuarioActual } from "../../services/authService";
import Footer from "../../components/Footer";

// Iconos
import {
  MdPeople,
  MdLibraryBooks,
  MdEmojiEvents,
  MdCheckCircle,
} from "react-icons/md";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function DashboardDocente() {
  const [resumen, setResumen] = useState(null);
  const [progresoMensual, setProgresoMensual] = useState([]);
  const [rendimientoCursos, setRendimientoCursos] = useState([]);
  const [niveles, setNiveles] = useState([]);
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

      const res1 = await getResumenDashboard();
      const res2 = await getProgresoMensual();
      const res3 = await getRendimientoCursos();
      const res4 = await getNiveles();

      setResumen(res1);
      setProgresoMensual(res2);
      setRendimientoCursos(res3);
      setNiveles(res4);
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
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">

      {/* ============================
          SALUDO PERSONALIZADO
      ============================ */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          ¡Bienvenido, {docente?.nombre} {docente?.apellido}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Aquí puedes revisar el avance y desempeño de tus estudiantes.
        </p>
      </div>

      {/* ============================
          TARJETAS PRINCIPALES
      ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        
        <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
          <MdPeople size={40} className="text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold">Total Estudiantes</h3>
            <p className="text-2xl font-bold">{resumen.total_estudiantes}</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
          <MdLibraryBooks size={40} className="text-purple-600" />
          <div>
            <h3 className="text-lg font-semibold">Lecturas Realizadas</h3>
            <p className="text-2xl font-bold">{resumen.total_lecturas}</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
          <MdCheckCircle size={40} className="text-green-600" />
          <div>
            <h3 className="text-lg font-semibold">Actividades Completadas</h3>
            <p className="text-2xl font-bold">{resumen.actividades_completadas}</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
          <MdEmojiEvents size={40} className="text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Promedio General</h3>
            <p className="text-2xl font-bold">{resumen.promedio_general}%</p>
          </div>
        </div>

      </div>

      {/* ============================
          PROGRESO MENSUAL - LINE CHART
      ============================ */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          Progreso Mensual 📈
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progresoMensual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="progreso" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ============================
          RENDIMIENTO POR CURSO - BAR CHART
      ============================ */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-bold text-purple-700 mb-4">
          Rendimiento por Curso 🏫
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rendimientoCursos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="curso" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="promedio" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ============================
          DISTRIBUCIÓN POR NIVELES
      ============================ */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Distribución por Nivel de Dificultad 📚
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={niveles}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nivel" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
}
