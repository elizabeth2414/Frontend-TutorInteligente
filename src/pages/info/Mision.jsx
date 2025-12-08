import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Mision() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex flex-1 justify-center items-center p-6">
        <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 max-w-3xl w-full relative overflow-hidden">

          <div className="absolute top-0 -right-6 w-28 h-28 bg-green-300/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 -left-6 w-24 h-24 bg-blue-300/40 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/school-girl-answering-question-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--child-raise-hand-classroom-student-pack-people-illustrations-6308629.png"
              alt="Niña estudiando"
              className="w-40 mx-auto drop-shadow-2xl mb-4 animate-bounce-slow"
            />

            <h1 className="text-4xl font-extrabold text-green-700 text-center drop-shadow-md">
              Nuestra Misión 🚀
            </h1>

            <p className="text-gray-700 mt-6 text-lg leading-relaxed">
              Facilitar el aprendizaje infantil mediante IA, ofreciendo experiencias personalizadas,
              seguras y motivadoras para estudiantes y docentes.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
