import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center">
      
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-4xl mt-10 bg-white/70 p-10 rounded-3xl shadow-xl backdrop-blur-md">
        
        {/* Sección de imagen */}
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/kids-reading-book-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--little-readers-group-students-education-pack-people-illustrations-5115416.png"
            alt="Niños leyendo"
            className="w-72 drop-shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-purple-700">
          Bienvenidos a TutorIA Kids 📚✨
        </h2>
        <p className="text-gray-700 mt-3 text-center text-lg">
          Una plataforma interactiva que ayuda a los niños a mejorar su lectura,
          comprensión y pronunciación usando Inteligencia Artificial.
        </p>

        {/* SECCIONES */}
        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-700">🎯 Objetivo</h3>
          <p className="text-gray-700 mt-2">
            Brindar a estudiantes de 7 a 10 años una herramienta moderna y divertida
            para fortalecer sus habilidades de lectura mediante evaluaciones,
            audios, actividades y retroalimentación automática.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-green-700">🚀 Misión</h3>
          <p className="text-gray-700 mt-2">
            Facilitar el aprendizaje de manera accesible, amigable y personalizada,
            apoyando a los docentes y acompañando a los niños en su progreso.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-pink-700">💡 Sobre Nosotros</h3>
          <p className="text-gray-700 mt-2">
            Somos un proyecto educativo creado con amor y tecnología, orientado a
            transformar el aprendizaje mediante herramientas inteligentes y seguras.
          </p>
        </section>

        {/* BOTONES */}
        <div className="mt-10 flex gap-6 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl bg-blue-600 text-white text-lg font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition"
          >
            🔑 Iniciar Sesión
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-xl bg-green-500 text-white text-lg font-bold shadow-lg hover:bg-green-600 hover:scale-105 transition"
          >
            📝 Registrarse
          </button>
        </div>

      </main>

      <Footer />

    </div>
  );
}
