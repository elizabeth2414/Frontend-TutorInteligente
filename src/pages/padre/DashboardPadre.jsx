import { useEffect, useState } from "react";
import { getMisHijos } from "../../services/padresService";

export default function DashboardPadre() {
  const [stats, setStats] = useState({
    hijos: 0,
    cursos: 0,
    lecturas: 0,
    seguimiento: "Activo",
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      const data = await getMisHijos();

      let totalCursos = 0;
      let totalLecturas = 0;

      data.forEach((hijo) => {
        hijo.cursos?.forEach((curso) => {
          totalCursos++;
          totalLecturas += curso.lecturas?.length || 0;
        });
      });

      setStats({
        hijos: data.length,
        cursos: totalCursos,
        lecturas: totalLecturas,
        seguimiento: "Activo",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("No se pudo cargar la información del panel familiar.");
    } finally {
      setLoading(false);
    }
  };

  // Tarjeta reutilizable (igual que Admin)
  const Card = ({ icon, title, value, bgColor }) => (
    <div className="bg-white/80 backdrop-blur-lg border border-white/40 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-4 rounded-2xl`}>
          <img src={icon} alt={title} className="w-10 h-10" />
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade">
      <h1 className="text-4xl font-extrabold text-blue-600 drop-shadow-sm mb-6">
        Panel Familiar
      </h1>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-xl shadow-md mb-6">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="text-xl text-gray-700 animate-pulse">
          Cargando información...
        </div>
      ) : (
        <>
          {/* TARJETAS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              title="Hijos vinculados"
              value={stats.hijos}
              bgColor="bg-blue-200"
              icon="https://cdn-icons-png.flaticon.com/512/3048/3048122.png"
            />

            <Card
              title="Cursos activos"
              value={stats.cursos}
              bgColor="bg-purple-200"
              icon="https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
            />

            <Card
              title="Lecturas disponibles"
              value={stats.lecturas}
              bgColor="bg-pink-200"
              icon="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            />

            <Card
              title="Seguimiento IA"
              value={stats.seguimiento}
              bgColor="bg-green-200"
              icon="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            />
          </div>

          {/* SECCIÓN INFORMATIVA */}
          <div
            className="
              mt-10 bg-white/80 backdrop-blur-md border border-white/40
              p-6 rounded-3xl shadow-xl
            "
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Resumen del aprendizaje familiar
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Desde este panel puedes supervisar el progreso académico de tus
              hijos, acceder a sus lecturas asignadas y revisar el seguimiento
              inteligente generado por el sistema.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
