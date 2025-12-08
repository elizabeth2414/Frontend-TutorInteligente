import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Objetivo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex flex-1 justify-center items-center p-6">
        <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 max-w-3xl w-full relative overflow-hidden">

          <div className="absolute -top-6 right-0 w-28 h-28 bg-red-300/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 -left-8 w-32 h-32 bg-purple-300/40 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-doing-homework-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--child-study-school-student-pack-people-illustrations-6524026.png"
              alt="Boy studying"
              className="w-40 mx-auto drop-shadow-xl mb-4 animate-bounce-slow"
            />

            <h1 className="text-4xl font-extrabold text-pink-700 text-center drop-shadow-md">
              Nuestro Objetivo 🎯
            </h1>

            <p className="text-gray-700 mt-6 text-lg leading-relaxed">
              Mejorar la lectura y pronunciación infantil mediante herramientas interactivas, retroalimentación automática y actividades guiadas por IA.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
