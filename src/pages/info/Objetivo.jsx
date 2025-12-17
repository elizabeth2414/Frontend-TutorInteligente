import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Objetivo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="pt-24 flex flex-1 justify-center items-start p-4 md:p-6">
        <div className="bg-white/90 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50 max-w-6xl w-full relative overflow-hidden">

          {/* Elementos decorativos de fondo */}
          <div className="absolute -top-10 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-300/15 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Encabezado */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-200 to-blue-200 flex items-center justify-center shadow-lg">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
                      alt="Objetivo educativo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-md">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Meta"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Nuestro Objetivo
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Transformar la forma en que los niños aprenden a leer y pronunciar
              </p>
            </div>

            {/* Sección de Misión Principal */}
            <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 mb-10 border border-gray-100 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2883/2883987.png"
                      alt="Lectura interactiva"
                      className="w-28 h-28"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Misión Principal</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-pink-600">Mejorar la lectura</span> y <span className="font-semibold text-blue-600">pronunciación infantil</span> mediante herramientas interactivas, retroalimentación automática y actividades guiadas por Inteligencia Artificial.
                  </p>
                  <div className="mt-4 flex items-center text-gray-600">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                      alt="Check"
                      className="w-5 h-5 mr-2"
                    />
                    <span>Diseñado para niños de 7 a 10 años</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Características clave */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Cómo lo Logramos</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
                      alt="Interactivo"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Interactividad</h3>
                  <p className="text-gray-600 text-sm">
                    Juegos y actividades que mantienen el interés del niño
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                      alt="IA"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Inteligencia Artificial</h3>
                  <p className="text-gray-600 text-sm">
                    Retroalimentación automática y personalizada
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135759.png"
                      alt="Guía"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Actividades Guiadas</h3>
                  <p className="text-gray-600 text-sm">
                    Ejercicios paso a paso adaptados al nivel de cada niño
                  </p>
                </div>
              </div>
            </div>

            {/* Beneficios adicionales */}
            <div className="bg-gradient-to-r from-pink-50/50 to-blue-50/50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Beneficios Clave</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135812.png"
                      alt="Confianza"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Confianza</h4>
                    <p className="text-gray-600 text-sm">Los niños ganan seguridad al leer en voz alta</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135774.png"
                      alt="Diversión"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Diversión</h4>
                    <p className="text-gray-600 text-sm">Aprendizaje a través del juego y la exploración</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135782.png"
                      alt="Progreso"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Progreso Medible</h4>
                    <p className="text-gray-600 text-sm">Seguimiento del desarrollo de habilidades</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                      alt="Accesibilidad"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Accesibilidad</h4>
                    <p className="text-gray-600 text-sm">Disponible en cualquier momento y lugar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
