import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdSchool,
  MdPeople,
  MdLibraryBooks,
  MdAnalytics,
  MdLogout,
} from "react-icons/md";

import { getUsuarioActual } from "../../services/authService";

export default function MenuDocente() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [docente, setDocente] = useState(null);

  const opciones = [
    {
      titulo: "Dashboard",
      icono: <MdDashboard size={24} />,
      ruta: "dashboard",
    },
    {
      titulo: "Mis Cursos",
      icono: <MdSchool size={24} />,
      ruta: "cursos",
    },
    {
      titulo: "Estudiantes",
      icono: <MdPeople size={24} />,
      ruta: "estudiantes",
    },
    {
      titulo: "Lecturas / Actividades",
      icono: <MdLibraryBooks size={24} />,
      ruta: "actividades",
    },
    {
      titulo: "Estadísticas",
      icono: <MdAnalytics size={24} />,
      ruta: "estadisticas",
    },
  ];
  

  // Obtener datos del docente autenticado
  useEffect(() => {
    getUsuarioActual()
      .then((data) => setDocente(data))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* =======================
          MENU LATERAL
      ======================== */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-white shadow-xl transition-all duration-300 p-5 relative`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-6 bg-blue-600 text-white rounded-full p-1"
        >
          {open ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>

        {/* Info Docente */}
        <div className="flex items-center mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            className="w-12"
          />
          {open && (
            <div className="ml-3">
              <h2 className="text-xl font-bold text-blue-600">
                {docente ? docente.nombre : "Cargando..."}
              </h2>
              <p className="text-gray-500 text-sm">
                {docente ? docente.apellido : ""}
              </p>
            </div>
          )}
        </div>

        {/* Opciones */}
        <ul className="space-y-4">
          {opciones.map((opc, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-100 cursor-pointer transition"
              onClick={() => navigate(opc.ruta)}
            >
              <span className="text-blue-600">{opc.icono}</span>
              {open && <span className="font-medium">{opc.titulo}</span>}
            </li>
          ))}

          {/* Logout */}
          <li
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-100 cursor-pointer transition mt-6"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <MdLogout size={24} className="text-red-600" />
            {open && (
              <span className="font-medium text-red-600">Cerrar sesión</span>
            )}
          </li>
        </ul>
      </div>

      {/* =======================
          CONTENIDO DINÁMICO
      ======================== */}
      <div className="flex-1 p-8">
        {/* Aquí se renderizan las pantallas: Dashboard, Cursos, etc */}
        <Outlet />

      
      </div>
    </div>
  );
}
