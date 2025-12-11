import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdFamilyRestroom,
  MdLibraryBooks,
  MdAnalytics,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { getUsuarioActual } from "../../services/authService";

export default function MenuPadre() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(true);
  const [padre, setPadre] = useState(null);

  // Opciones del menú
  const opciones = [
    { titulo: "Dashboard", icono: <MdDashboard size={24} />, ruta: "dashboard" },
    { titulo: "Mis Hijos", icono: <MdFamilyRestroom size={24} />, ruta: "hijos" },
    { titulo: "Actividades Asignadas", icono: <MdLibraryBooks size={24} />, ruta: "actividades" },
    { titulo: "Progreso", icono: <MdAnalytics size={24} />, ruta: "progreso" },
    { titulo: "Configuración", icono: <MdSettings size={24} />, ruta: "configuracion" },
  ];

  // Obtener datos del padre autenticado
  useEffect(() => {
    getUsuarioActual()
      .then((data) => setPadre(data))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ======================= MENU LATERAL ======================= */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-white shadow-xl transition-all duration-300 p-5 relative border-r border-gray-200`}
      >
        {/* Botón Abrir/Cerrar */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-6 bg-blue-600 text-white rounded-full p-1 shadow-md hover:bg-blue-700 transition"
        >
          {open ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>

        {/* Información del Padre */}
        <div className="flex items-center mb-8 border-b pb-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
            className="w-12 h-12 rounded-full border"
          />
          {open && (
            <div className="ml-3">
              <h2 className="text-xl font-bold text-blue-700">
                {padre ? padre.nombre : "Cargando..."}
              </h2>
              <p className="text-gray-500 text-sm">{padre?.apellido}</p>
            </div>
          )}
        </div>

        {/* Opciones */}
        <ul className="space-y-3">
          {opciones.map((opc, index) => {
            const activo = location.pathname.includes(opc.ruta);

            return (
              <li
                key={index}
                onClick={() => navigate(opc.ruta)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                  ${activo ? "bg-blue-100 border-l-4 border-blue-600" : "hover:bg-gray-100"}
                `}
              >
                <span
                  className={`transition ${
                    activo ? "text-blue-700 scale-110" : "text-blue-600"
                  }`}
                >
                  {opc.icono}
                </span>

                {open && (
                  <span
                    className={`font-medium transition ${
                      activo ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {opc.titulo}
                  </span>
                )}
              </li>
            );
          })}

          {/* Logout */}
          <li
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("roles");
              navigate("/login");
            }}
            className="flex items-center gap-3 p-3 mt-6 rounded-xl cursor-pointer hover:bg-red-100 transition"
          >
            <MdLogout size={24} className="text-red-600" />
            {open && <span className="font-medium text-red-600">Cerrar sesión</span>}
          </li>
        </ul>
      </div>

      {/* ======================= CONTENIDO ======================= */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
}
