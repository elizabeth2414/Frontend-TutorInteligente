import { useEffect, useState } from "react";
import {
  getResumenDashboard,
  getProgresoMensual,
  getRendimientoCursos,
  getNiveles,
} from "../../services/docentesService";

import { getUsuarioActual } from "../../services/authService";
import Footer from "../../components/Footer";

import {
  MdPeople,
  MdLibraryBooks,
  MdEmojiEvents,
  MdCheckCircle,
} from "react-icons/md";

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

      setResumen(res1 ?? {});
      setProgresoMensual(res2 ?? []);
      setRendimientoCursos(res3 ?? []);
      setNiveles(res4 ?? []);
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
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">

      {/* ============================ SALUDO ============================ */}
      <div className="bg-white p-7 rounded-2xl shadow-lg mb-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700">
          ¡Bienvenido, {docente?.nombre} {docente?.apellido}! 👋
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Aquí puedes revisar el avance y desempeño de tus estudiantes.
        </p>
      </div>

      {/* ============================ TARJETAS ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        {/* Tarjeta */}
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

      {/* ============================ PROGRESO MENSUAL ============================ */}
      <SectionCard titulo="Progreso Mensual 📈" color="text-blue-700">
        {progresoMensual.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progresoMensual}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip wrapperStyle={{ background: "white", borderRadius: "10px", padding: "10px" }} />
              <Line type="monotone" dataKey="progreso" stroke="#2563eb" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyMessage />
        )}
      </SectionCard>

      {/* ============================ RENDIMIENTO CURSOS ============================ */}
      <SectionCard titulo="Rendimiento por Curso 🏫" color="text-purple-700">
        {rendimientoCursos.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rendimientoCursos}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="curso" />
              <YAxis />
              <Tooltip wrapperStyle={{ background: "white", borderRadius: "10px", padding: "10px" }} />
              <Bar dataKey="promedio" fill="#9333ea" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyMessage />
        )}
      </SectionCard>

      {/* ============================ DISTRIBUCIÓN NIVELES ============================ */}
      <SectionCard titulo="Distribución por Nivel 📚" color="text-green-700">
        {niveles.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={niveles}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="nivel" />
              <YAxis />
              <Tooltip wrapperStyle={{ background: "white", borderRadius: "10px", padding: "10px" }} />
              <Bar dataKey="cantidad" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyMessage />
        )}
      </SectionCard>

    </div>
  );
}

/* ----------------------------------------
    COMPONENTE CARD MINI
---------------------------------------- */
function Card({ color, icon, titulo, valor }) {
  return (
    <div className="bg-white p-5 shadow-md rounded-2xl border border-gray-200 flex gap-4 items-center hover:shadow-lg transition">
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

/* ----------------------------------------
    COMPONENTE TARJETA SECCIÓN
---------------------------------------- */
function SectionCard({ titulo, color, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
      <h2 className={`text-xl font-bold mb-4 ${color}`}>{titulo}</h2>
      {children}
    </div>
  );
}

/* ----------------------------------------
    COMPONENTE MENSAJE VACÍO
---------------------------------------- */
function EmptyMessage() {
  return <p className="text-gray-500">No hay datos para mostrar.</p>;
}
