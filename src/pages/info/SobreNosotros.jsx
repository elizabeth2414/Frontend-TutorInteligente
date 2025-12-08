import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex flex-1 justify-center items-center p-6">
        <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 max-w-3xl w-full relative overflow-hidden">

          <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-300/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 -right-8 w-28 h-28 bg-blue-300/40 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/smart-kid-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--child-genius-boy-student-education-pack-people-illustrations-6671477.png"
              alt="Niño inteligente"
              className="w-40 mx-auto drop-shadow-xl mb-4 animate-bounce-slow"
            />

            <h1 className="text-4xl font-extrabold text-purple-800 text-center drop-shadow-md">
              Sobre Nosotros 💡
            </h1>

            <p className="text-gray-700 mt-6 text-lg leading-relaxed">
              TutorIA Kids es un proyecto diseñado para mejorar la lectura infantil mediante IA,
              combinando tecnología, pedagogía y diseño infantil.
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
