import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUsuarioActual } from "../../services/authService"; // ⬅️ AGREGADO
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // 1️⃣ Login
      const res = await login(form.email, form.password);

      // Guardar token (por si login no lo guarda internamente)
      localStorage.setItem("token", res.access_token);

      // 2️⃣ Obtener datos del usuario con sus roles
      const me = await getUsuarioActual();
      console.log("Usuario actual:", me);

      const roles = me.roles || [];

      // 3️⃣ Redirigir según el rol
      if (roles.includes("admin")) {
        navigate("/admin/menu");
      } else if (roles.includes("docente")) {
        navigate("/docente/menu");
      } else if (roles.includes("estudiante")) {
        // Por si luego haces menú de estudiante
        navigate("/estudiante/menu");
      } else {
        // Si no tiene rol conocido, lo mando al home
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-md w-full">

          {/* Imagen */}
          <div className="flex justify-center mb-4">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/reading-boy-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--kid-book-education-child-pack-illustrations-5517160.png"
              alt="Niño leyendo"
              className="w-32 drop-shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
            ¡Bienvenido!
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Ingresa para continuar aprendiendo 📚✨
          </p>

          {/* Error */}
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 text-center">
              {errorMsg}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-700 font-semibold">Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-semibold">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-bold text-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg"
              }`}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión 🔑"}
            </button>
          </form>

          {/* Enlaces */}
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              ¿No tienes una cuenta?
              <span
                onClick={() => navigate("/register")}
                className="text-purple-600 font-bold hover:underline cursor-pointer ml-1"
              >
                Regístrate aquí
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
