import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Contacto() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-purple-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex flex-1 justify-center items-center p-6">
        <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 max-w-3xl w-full relative overflow-hidden">

          <div className="absolute top-0 left-0 w-24 h-24 bg-blue-300/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-purple-300/40 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/girl-holding-phone-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--contact-customer-support-female-pack-people-illustrations-6836500.png"
              alt="Contacto"
              className="w-40 mx-auto drop-shadow-xl mb-4 animate-bounce-slow"
            />

            <h1 className="text-4xl font-extrabold text-blue-700 text-center drop-shadow-md">
              Contáctanos 📞
            </h1>

            <p className="text-gray-700 mt-6 text-lg text-center">
              Si tienes consultas o sugerencias, estamos aquí para ayudarte:
            </p>

            <p className="text-blue-700 mt-4 text-center font-bold text-xl">
              ✉ contacto@tutoriakids.com
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
