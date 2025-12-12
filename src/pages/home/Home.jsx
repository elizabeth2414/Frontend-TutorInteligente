import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      {/* NAVBAR FIJO */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="pt-28 flex-1 flex flex-col items-center px-4 pb-10">

        {/* HERO PRINCIPAL */}
        <section className="max-w-5xl w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-8 md:p-10 relative overflow-hidden">

          {/* Burbuja decorativas */}
          <div className="absolute -top-8 -left-10 w-28 h-28 bg-blue-300/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 -right-10 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">

            {/* Imagen principal */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8370/8370847.png"
                alt="Niños leyendo"
                className="w-60 md:w-72 drop-shadow-2xl"
              />
            </div>

            {/* Texto principal */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 drop-shadow-md mb-3">
                ReadSmartIA
              </h1>

              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Una plataforma para aprender a leer mejor mediante práctica guiada y retroalimentación con Inteligencia Artificial.
              </p>

              <ul className="text-gray-700 text-sm md:text-base space-y-2 mb-6 leading-relaxed">
                <li>• Escucha primero la lectura narrada.</li>
                <li>• Lee en voz alta y recibe correcciones automáticas.</li>
                <li>• Practica las partes donde tuviste errores.</li>
                <li>• El docente puede ver tu progreso en tiempo real.</li>
              </ul>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-7 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition"
                >
                  Iniciar Sesión
                </button>

                <button
                  onClick={() => navigate("/register-padre")}
                  className="px-7 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 hover:scale-105 transition"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE ROLES */}
        <section className="mt-12 max-w-5xl w-full grid md:grid-cols-3 gap-6">

          {/* Estudiante */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/40 hover:scale-[1.02] transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3097/3097144.png"
              alt="Estudiante icon"
              className="w-14 mb-3 opacity-90"
            />
            <h3 className="text-xl font-bold text-blue-700 mb-2">Soy Estudiante</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Practico lecturas interactivas y la IA me ayuda a mejorar mi pronunciación.
            </p>
          </div>

          {/* Docente */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/40 hover:scale-[1.02] transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png"
              alt="Docente icon"
              className="w-14 mb-3 opacity-90"
            />
            <h3 className="text-xl font-bold text-purple-700 mb-2">Soy Docente</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Asigno lecturas, analizo reportes y doy seguimiento al progreso de mis estudiantes.
            </p>
          </div>

          {/* Representante */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/40 hover:scale-[1.02] transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/456/456283.png"
              alt="Representante icon"
              className="w-14 mb-3 opacity-90"
            />
            <h3 className="text-xl font-bold text-pink-700 mb-2">Soy Representante</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Acompaño a mi hijo en su proceso de aprendizaje y reviso su avance.
            </p>
          </div>

        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
