import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUsuarioActual } from "../../services/authService";
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
  const [showPassword, setShowPassword] = useState(false);

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
      await login(form.email, form.password);

      // 2️⃣ Obtener usuario autenticado
      const me = await getUsuarioActual();

      const roles = Array.isArray(me.roles)
        ? me.roles
        : me.rol
        ? [me.rol]
        : [];

      // 3️⃣ Redirección por rol
      if (roles.includes("admin")) navigate("/admin/menu");
      else if (roles.includes("docente")) navigate("/docente/menu");
      else if (roles.includes("padre")) navigate("/padre/menu");
      else navigate("/");
    } catch (error) {
      // 🔥 FIX REAL: mostrar el error correctamente
      const status = error?.response?.status;
      const data = error?.response?.data;

      console.error("❌ LOGIN STATUS:", status);
      console.error("❌ LOGIN DATA:", data);

      if (status === 401) {
        setErrorMsg("Correo o contraseña incorrectos.");
      } else if (status === 422) {
        setErrorMsg("Datos inválidos enviados al servidor.");
      } else {
        setErrorMsg("Error al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex-1 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full border border-white/40 relative animate-fadeIn overflow-hidden">
          <h2 className="text-4xl font-extrabold text-center text-blue-700 drop-shadow-md">
            Bienvenido
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Ingresa para continuar aprendiendo y mejorando tu lectura.
          </p>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 text-center shadow-md">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-gray-700 font-semibold">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-4 focus:ring-blue-400/40 outline-none shadow-inner"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <label className="text-gray-700 font-semibold">Contraseña</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-4 focus:ring-purple-400/40 outline-none shadow-inner pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-3 cursor-pointer opacity-80 hover:opacity-100 transition"
              >
                <img
                  src={
                    showPassword
                      ? "https://cdn-icons-png.flaticon.com/512/709/709606.png"
                      : "https://cdn-icons-png.flaticon.com/512/709/709612.png"
                  }
                  alt="Mostrar contraseña"
                  className="w-6"
                />
              </button>
            </div>

            {/* Botón Login */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-bold text-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-xl"
              }`}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              ¿No tienes una cuenta?
              <span
                onClick={() => navigate("/register-padre")}
                className="text-purple-600 font-bold hover:underline cursor-pointer ml-1"
              >
                Regístrate aquí
              </span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
