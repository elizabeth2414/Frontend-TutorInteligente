import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <Navbar />

      <main className="pt-24 flex flex-1 justify-center items-start p-4 md:p-6">
        <div className="bg-white/90 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50 max-w-6xl w-full relative overflow-hidden">

          {/* Elementos decorativos de fondo */}
          <div className="absolute -top-12 left-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-52 h-52 bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-purple-300/15 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Encabezado */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center shadow-xl">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135752.png"
                      alt="Acerca de nosotros"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Nuestra misión"
                      className="w-7 h-7"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Sobre Nosotros
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Transformando el aprendizaje infantil con tecnología innovadora
              </p>
            </div>

            {/* Sección de presentación */}
            <div className="bg-gradient-to-r from-blue-50/60 to-pink-50/60 rounded-2xl p-8 mb-10 border border-gray-100 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Historia</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    <span className="font-semibold text-purple-600">TutorIA Kids</span> nació de una visión simple pero poderosa: 
                    utilizar la tecnología para hacer el aprendizaje de la lectura más accesible, 
                    efectivo y divertido para todos los niños.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Combinamos lo mejor de la <span className="font-semibold text-blue-600">pedagogía moderna</span>, 
                    el <span className="font-semibold text-pink-600">diseño centrado en niños</span> y la 
                    <span className="font-semibold text-purple-600"> inteligencia artificial</span> para crear 
                    una experiencia de aprendizaje única.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135765.png"
                      alt="Innovación educativa"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Nuestros valores */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Nuestros Valores</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135800.png"
                      alt="Innovación"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Innovación Continua</h3>
                  <p className="text-gray-600 text-sm">
                    Siempre buscamos nuevas formas de mejorar la experiencia de aprendizaje
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png"
                      alt="Educación"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Educación Accesible</h3>
                  <p className="text-gray-600 text-sm">
                    Creemos que todos los niños merecen las mejores herramientas educativas
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-pink-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135774.png"
                      alt="Diversión"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Aprendizaje Divertido</h3>
                  <p className="text-gray-600 text-sm">
                    El juego es fundamental para el desarrollo y aprendizaje infantil
                  </p>
                </div>
              </div>
            </div>

            {/* Equipo y tecnología */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135794.png"
                    alt="Equipo"
                    className="w-6 h-6"
                  />
                  Nuestro Equipo
                </h3>
                <p className="text-gray-600 mb-4">
                  Un equipo multidisciplinario de educadores, diseñadores, desarrolladores 
                  y especialistas en IA trabajando juntos para crear la mejor experiencia.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                      alt="Check"
                      className="w-4 h-4 mr-2"
                    />
                    Pedagogos especializados
                  </li>
                  <li className="flex items-center text-gray-700">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                      alt="Check"
                      className="w-4 h-4 mr-2"
                    />
                    Expertos en desarrollo infantil
                  </li>
                  <li className="flex items-center text-gray-700">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                      alt="Check"
                      className="w-4 h-4 mr-2"
                    />
                    Ingenieros en IA y machine learning
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                    alt="Tecnología"
                    className="w-6 h-6"
                  />
                  Nuestra Tecnología
                </h3>
                <p className="text-gray-600 mb-4">
                  Utilizamos algoritmos de inteligencia artificial avanzados para 
                  personalizar el aprendizaje según las necesidades de cada niño.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                    <p className="font-semibold text-blue-600">Reconocimiento de Voz</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                    <p className="font-semibold text-purple-600">Análisis de Progreso</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                    <p className="font-semibold text-pink-600">Adaptación Dinámica</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                    <p className="font-semibold text-blue-600">Feedback en Tiempo Real</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compromiso */}
            <div className="bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 rounded-2xl p-8 border border-gray-100">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestro Compromiso</h2>
                <p className="text-gray-700 text-lg mb-6">
                  Estamos comprometidos a crear herramientas educativas que no solo enseñen, 
                  sino que inspiren el amor por el aprendizaje en cada niño.
                </p>
                <div className="flex justify-center">
                  <div className="bg-white px-6 py-3 rounded-full shadow-md inline-flex items-center gap-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
                      alt="Compromiso"
                      className="w-6 h-6"
                    />
                    <span className="font-medium text-gray-700">Educación de calidad para todos</span>
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
