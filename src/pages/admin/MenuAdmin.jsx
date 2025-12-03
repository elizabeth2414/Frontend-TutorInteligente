// src/pages/admin/MenuAdmin.jsx
import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdSchool,
  MdPeople,
  MdLogout,
} from "react-icons/md";

import { getUsuarioActual } from "../../services/authService";

export default function MenuAdmin() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [admin, setAdmin] = useState(null);

  const opciones = [
    {
      titulo: "Dashboard",
      icono: <MdDashboard size={24} />,
      ruta: "/admin/menu/dashboard",
    },
    {
      titulo: "Docentes",
      icono: <MdSchool size={24} />,
      ruta: "/admin/menu/docentes",
    },
    {
      titulo: "Estudiantes",
      icono: <MdPeople size={24} />,
      ruta: "/admin/menu/estudiantes",
    },
  ];  

  useEffect(() => {
    getUsuarioActual()
      .then((data) => {
        if (!data.roles?.includes("admin")) {
          navigate("/login");
          return;
        }
        setAdmin(data);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* MENU LATERAL */}
      <div
        className={`${open ? "w-64" : "w-20"} bg-white shadow-xl transition-all duration-300 p-5 relative`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-6 bg-purple-600 text-white rounded-full p-1"
        >
          {open ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>

        {/* Info Admin */}
        <div className="flex items-center mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="w-12"
          />
          {open && (
            <div className="ml-3">
              <h2 className="text-xl font-bold text-purple-600">
                {admin ? admin.nombre : "Admin"}
              </h2>
              <p className="text-gray-500 text-sm">
                {admin ? admin.apellido : ""}
              </p>
            </div>
          )}
        </div>

        {/* Opciones */}
        <ul className="space-y-4">
          {opciones.map((opc, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-100 cursor-pointer transition"
              onClick={() => navigate(opc.ruta)}
            >
              <span className="text-purple-600">{opc.icono}</span>
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

      {/* CONTENIDO DINÁMICO */}
      <div className="flex-1 p-8">
        <Outlet />
        
      </div>
    </div>
  );
}
