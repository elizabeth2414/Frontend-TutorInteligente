import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { login, getUsuarioActual } from "../../services/authService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const isMobile = Capacitor.isNativePlatform();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSplash, setShowSplash] = useState(isMobile);

  // 🎬 Splash screen solo en primera carga móvil
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

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
      await login(form.email, form.password);
      const me = await getUsuarioActual();

      const roles = Array.isArray(me.roles)
        ? me.roles
        : me.rol
        ? [me.rol]
        : [];

      if (roles.includes("admin")) navigate("/admin/menu");
      else if (roles.includes("docente")) navigate("/docente/menu");
      else if (roles.includes("padre")) navigate("/padre/menu");
      else navigate("/");
    } catch (error) {
      const status = error?.response?.status;
      console.error("❌ LOGIN ERROR:", error);

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

  // 🎬 SPLASH SCREEN MÓVIL - Colores suaves
  if (isMobile && showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex items-center justify-center relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-52 h-52 bg-white rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-float-slow"></div>
        </div>

        {/* Contenido */}
        <div className="text-center animate-zoomIn z-10">
          <div className="w-28 h-28 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounceCustom">
            <svg
              className="w-14 h-14 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg tracking-tight">
            ReadSmartIA
          </h1>
          <p className="text-white/95 text-lg mb-8 px-4">
            Mejorando la lectura juntos
          </p>
          
          {/* Loader */}
          <div className="w-12 h-12 mx-auto border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-xs">
          v1.0.0 • © 2025
        </div>
      </div>
    );
  }

  // 📱 DISEÑO MÓVIL - Colores suaves
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex flex-col relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 py-8 relative z-10 safe-area">
          {/* Logo y título */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              ¡Bienvenido a ReadSmartIA!
            </h2>
            <p className="text-white/95 text-sm">
              Inicia sesión para continuar
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl animate-slideUp">
            {errorMsg && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-lg mb-4 flex items-start text-sm">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-gray-700 font-semibold text-sm block mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3.5 pl-11 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all text-base"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="text-gray-700 font-semibold text-sm block mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-purple-400 focus:bg-white outline-none transition-all text-base pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Botón Login - Colores suaves */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all mt-6 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 active:scale-95"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Ingresando...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿No tienes cuenta?{" "}
                <span
                  onClick={() => navigate("/register-padre")}
                  className="text-purple-500 font-bold hover:underline cursor-pointer"
                >
                  Regístrate
                </span>
              </p>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-center mt-6 text-white/80 text-xs">
            <p>v1.0.0 • ReadSmartIA © 2025</p>
          </div>
        </div>
      </div>
    );
  }

  // 🖥️ DISEÑO WEB (ORIGINAL)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex-1 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full border border-white/40 relative overflow-hidden">
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
                autoComplete="email"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-4 focus:ring-blue-400/40 outline-none shadow-inner"
              />
            </div>

            <div className="relative">
              <label className="text-gray-700 font-semibold">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
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