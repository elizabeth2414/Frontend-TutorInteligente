import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="
      w-full fixed top-0 left-0 z-50
      bg-white/80 backdrop-blur-lg shadow-md
      px-6 md:px-10 py-4 flex justify-between items-center
    ">

      {/* LOGO */}
      <h1
        className="text-2xl font-extrabold text-blue-700 cursor-pointer drop-shadow-sm"
        onClick={() => navigate("/")}
      >
        🌟 ReadSmartIA
      </h1>

      {/* MENU DESKTOP */}
      <div className="hidden md:flex gap-8 text-lg font-semibold">

        <button
          onClick={() => navigate("/")}
          className="text-blue-700 hover:text-blue-900 transition"
        >
          Inicio
        </button>

        <button
          onClick={() => navigate("/sobre-nosotros")}
          className="text-purple-700 hover:text-purple-900 transition"
        >
          Sobre Nosotros
        </button>

        <button
          onClick={() => navigate("/mision")}
          className="text-green-700 hover:text-green-900 transition"
        >
          Misión
        </button>

        <button
          onClick={() => navigate("/objetivo")}
          className="text-pink-700 hover:text-pink-900 transition"
        >
          Objetivo
        </button>

        <button
          onClick={() => navigate("/contacto")}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          Contacto
        </button>

        {/* Botones Auth */}
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition hover:scale-105"
        >
          Iniciar Sesión
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-5 py-2 rounded-lg bg-green-500 text-white shadow-md hover:bg-green-600 transition hover:scale-105"
        >
          Registrarse
        </button>
      </div>

      {/* MENÚ HAMBURGUESA (MÓVIL) */}
      <button
        className="md:hidden text-3xl text-blue-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <MdClose /> : <MdMenu />}
      </button>

      {/* MENU MÓVIL */}
      {open && (
        <div className="
          absolute top-full left-0 w-full bg-white/90 backdrop-blur-lg shadow-lg 
          flex flex-col items-center py-6 gap-6 animate-fadeIn
        ">
          <button onClick={() => navigate("/")} className="text-blue-700 text-xl">Inicio</button>
          <button onClick={() => navigate("/sobre-nosotros")} className="text-purple-700 text-xl">Sobre Nosotros</button>
          <button onClick={() => navigate("/mision")} className="text-green-700 text-xl">Misión</button>
          <button onClick={() => navigate("/objetivo")} className="text-pink-700 text-xl">Objetivo</button>
          <button onClick={() => navigate("/contacto")} className="text-blue-600 text-xl">Contacto</button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600"
          >
            Registrarse
          </button>
        </div>
      )}
    </nav>
  );
}
