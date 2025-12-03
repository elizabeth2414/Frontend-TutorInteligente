import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center">
      <h1 
        className="text-2xl font-extrabold text-blue-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        🌟 TutorIA Kids
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 hover:scale-105 transition"
        >
          Iniciar Sesión
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-5 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 hover:scale-105 transition"
        >
          Registrarse
        </button>
      </div>
    </nav>
  );
}
