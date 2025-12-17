import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        w-full fixed top-0 left-0 z-50
        bg-white/80 backdrop-blur-xl shadow-lg
        px-6 md:px-10 py-4 flex justify-between items-center
      "
    >
      {/* LOGO */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/9079/9079882.png"
          alt="Logo"
          className="w-9 h-9 drop-shadow"
        />
        <h1 className="text-2xl font-extrabold text-blue-700">
          ReadSmartIA
        </h1>
      </div>

      {/* MENU DESKTOP */}
      <div className="hidden md:flex items-center gap-8 text-lg font-semibold">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/553/553416.png" className="w-5" />
          Inicio
        </button>

        <button
          onClick={() => navigate("/sobre-nosotros")}
          className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition"
        >
          Sobre Nosotros
        </button>

        <button
          onClick={() => navigate("/mision")}
          className="flex items-center gap-2 text-green-700 hover:text-green-900 transition"
        >
          Misión
        </button>

        <button
          onClick={() => navigate("/objetivo")}
          className="flex items-center gap-2 text-pink-700 hover:text-pink-900 transition"
        >
          Objetivo
        </button>

        <button
          onClick={() => navigate("/contacto")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
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
          onClick={() => navigate("/register-padre")}
          className="px-5 py-2 rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition hover:scale-105"
        >
          Registrarse
        </button>
      </div>

      {/* ÍCONO MENÚ MÓVIL */}
      <button
        className="md:hidden text-3xl text-blue-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <MdClose /> : <MdMenu />}
      </button>

      {/* MENU MÓVIL */}
      {open && (
        <div
          className="
            absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl
            flex flex-col items-center py-6 gap-6 animate-fadeIn
          "
        >
          {/* Links con íconos */}
          <button onClick={() => navigate("/")} className="flex items-center gap-3 text-blue-700 text-xl">
            <img src="https://cdn-icons-png.flaticon.com/512/553/553416.png" className="w-6" />
            Inicio
          </button>

          <button onClick={() => navigate("/sobre-nosotros")} className="flex items-center gap-3 text-purple-700 text-xl">


            Sobre Nosotros
          </button>

          <button onClick={() => navigate("/mision")} className="flex items-center gap-3 text-green-700 text-xl">
            
            Misión
          </button>

          <button onClick={() => navigate("/objetivo")} className="flex items-center gap-3 text-pink-700 text-xl">
            
            Objetivo
          </button>

          <button onClick={() => navigate("/contacto")} className="flex items-center gap-3 text-blue-600 text-xl">
            
            Contacto
          </button>

          {/* Botones Auth Mobile */}
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 w-3/4"
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => navigate("/register-padre")}
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 w-3/4"
          >
            Registrarse
          </button>
        </div>
      )}
    </nav>
  );
}
