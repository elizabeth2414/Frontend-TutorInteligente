import { useState, useEffect } from "react";
import { MdPeople, MdSchool, MdAutoStories, MdAssessment } from "react-icons/md";

export default function DashboardAdmin() {
  // 📌 Datos simulados (luego los conectas al backend)
  const [stats, setStats] = useState({
    docentes: 12,
    estudiantes: 180,
    lecturas: 45,
    actividades: 90,
  });

  return (
    <div className="animate-fade">

      {/* TÍTULO */}
      <h1 className="text-4xl font-extrabold text-blue-600 drop-shadow-sm mb-6">
        🏫 Panel Administrativo
      </h1>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* CARD DOCENTES */}
        <div className="
          bg-white/80 backdrop-blur-lg border border-white/40 
          p-6 rounded-3xl shadow-lg hover:shadow-2xl transition
        ">
          <div className="flex items-center gap-4">
            <div className="bg-blue-200 p-4 rounded-2xl">
              <MdSchool className="text-blue-600" size={36} />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Docentes</p>
              <p className="text-3xl font-bold text-blue-700">{stats.docentes}</p>
            </div>
          </div>
        </div>

        {/* CARD ESTUDIANTES */}
        <div className="
          bg-white/80 backdrop-blur-lg border border-white/40 
          p-6 rounded-3xl shadow-lg hover:shadow-2xl transition
        ">
          <div className="flex items-center gap-4">
            <div className="bg-purple-200 p-4 rounded-2xl">
              <MdPeople className="text-purple-600" size={36} />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Estudiantes</p>
              <p className="text-3xl font-bold text-purple-700">{stats.estudiantes}</p>
            </div>
          </div>
        </div>

        {/* CARD LECTURAS */}
        <div className="
          bg-white/80 backdrop-blur-lg border border-white/40 
          p-6 rounded-3xl shadow-lg hover:shadow-2xl transition
        ">
          <div className="flex items-center gap-4">
            <div className="bg-pink-200 p-4 rounded-2xl">
              <MdAutoStories className="text-pink-600" size={36} />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Lecturas</p>
              <p className="text-3xl font-bold text-pink-700">{stats.lecturas}</p>
            </div>
          </div>
        </div>

        {/* CARD ACTIVIDADES */}
        <div className="
          bg-white/80 backdrop-blur-lg border border-white/40 
          p-6 rounded-3xl shadow-lg hover:shadow-2xl transition
        ">
          <div className="flex items-center gap-4">
            <div className="bg-green-200 p-4 rounded-2xl">
              <MdAssessment className="text-green-600" size={36} />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Actividades</p>
              <p className="text-3xl font-bold text-green-700">{stats.actividades}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE GRÁFICO */}
      <div className="
        mt-10 bg-white/80 backdrop-blur-md border border-white/40 
        p-6 rounded-3xl shadow-xl
      ">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          📊 Actividad reciente del sistema
        </h2>

        <p className="text-gray-600">
          Aquí puedes agregar un gráfico (ej: Chart.js, Recharts, Nivo…).  
          Para ahora te dejo un placeholder visual.
        </p>

        <div className="mt-6 h-64 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl animate-pulse"></div>
      </div>

    </div>
  );
}
