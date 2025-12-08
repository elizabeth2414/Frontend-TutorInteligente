import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      {/* NAVBAR FIJO */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL DEBAJO DEL NAVBAR → pt-28 */}
      <main className="pt-28 flex-1 flex flex-col items-center px-4 pb-10">
        
        {/* HERO PRINCIPAL */}
        <section className="max-w-5xl w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-8 md:p-10 relative overflow-hidden">

          {/* Burbujas decorativas */}
          <div className="absolute -top-8 -left-10 w-28 h-28 bg-blue-300/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 -right-10 w-32 h-32 bg-purple-300/40 rounded-full blur-xl"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">

            {/* Imagen principal */}
            <div className="flex justify-center">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/kids-reading-book-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--little-readers-group-students-education-pack-people-illustrations-5115416.png"
                alt="Niños leyendo"
                className="w-64 md:w-72 drop-shadow-2xl animate-bounce-slow"
              />
            </div>

            {/* Texto principal */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 drop-shadow-md mb-3">
                ReadSmartIA 📚✨
              </h1>

              <p className="text-gray-700 text-lg mb-4">
                Aprende a leer mejor escuchando, practicando y recibiendo ayuda de la Inteligencia Artificial 🧠✨
              </p>

              <ul className="text-gray-700 text-sm md:text-base space-y-2 mb-6">
                <li>💡 Escucha primero la lectura.</li>
                <li>🎧 Luego lee en voz alta y la IA te corrige.</li>
                <li>🔁 Practica solo las partes donde te equivocaste.</li>
                <li>📊 Tu docente puede ver tu progreso.</li>
              </ul>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-7 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition"
                >
                  🔑 Iniciar Sesión
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-7 py-3 rounded-xl bg-green-500 text-white font-bold shadow-lg hover:bg-green-600 hover:scale-105 transition"
                >
                  📝 Registrarse
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SECCIÓN DE ROLES */}
        <section className="mt-10 max-w-5xl w-full grid md:grid-cols-3 gap-6">

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white/40">
            <h3 className="text-xl font-bold text-blue-700 mb-2">👧 Soy Estudiante</h3>
            <p className="text-gray-700 text-sm">
              Practico lecturas divertidas y la IA me ayuda a mejorar mi pronunciación.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white/40">
            <h3 className="text-xl font-bold text-purple-700 mb-2">👩‍🏫 Soy Docente</h3>
            <p className="text-gray-700 text-sm">
              Asigno lecturas y reviso reportes automáticos del progreso de mis estudiantes.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white/40">
            <h3 className="text-xl font-bold text-pink-700 mb-2">👨‍👩‍👧 Soy Representante</h3>
            <p className="text-gray-700 text-sm">
              Acompaño a mi hijo en su aprendizaje y reviso su progreso.
            </p>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
