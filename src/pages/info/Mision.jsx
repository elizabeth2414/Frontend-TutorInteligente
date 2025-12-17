import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Mision() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      <Navbar />

      <main className="pt-24 flex flex-1 justify-center items-start p-4 md:p-6">
        <div className="bg-white/90 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50 max-w-6xl w-full relative overflow-hidden">

          {/* Elementos decorativos de fondo */}
          <div className="absolute -top-10 right-10 w-40 h-40 bg-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-300/15 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Encabezado */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 flex items-center justify-center shadow-xl">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135780.png"
                      alt="Nuestra misión"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Objetivo"
                      className="w-7 h-7"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Nuestra Misión
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Revolucionar la educación infantil a través de la tecnología personalizada
              </p>
            </div>

            {/* Declaración de misión principal */}
            <div className="bg-gradient-to-r from-green-50/60 to-blue-50/60 rounded-2xl p-8 mb-10 border border-gray-100 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestro Propósito Fundamental</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    <span className="font-semibold text-green-600">Facilitar el aprendizaje infantil</span> mediante 
                    Inteligencia Artificial, ofreciendo experiencias personalizadas, seguras y motivadoras 
                    tanto para estudiantes como para docentes.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Buscamos eliminar las barreras en el aprendizaje de la lectura y crear un entorno 
                    donde cada niño pueda desarrollar sus habilidades al máximo potencial.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135756.png"
                      alt="Educación personalizada"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pilares de nuestra misión */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Los Tres Pilares de Nuestra Misión</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135800.png"
                      alt="Personalización"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Aprendizaje Personalizado</h3>
                  <p className="text-gray-600 text-sm">
                    Adaptamos cada lección al ritmo, estilo y necesidades individuales de cada niño
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135812.png"
                      alt="Seguridad"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Entorno Seguro</h3>
                  <p className="text-gray-600 text-sm">
                    Creamos espacios digitales protegidos donde los niños pueden aprender sin riesgos
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135774.png"
                      alt="Motivación"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Motivación Constante</h3>
                  <p className="text-gray-600 text-sm">
                    Diseñamos experiencias que mantienen el interés y la curiosidad por aprender
                  </p>
                </div>
              </div>
            </div>

            {/* Impacto y alcance */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135790.png"
                    alt="Impacto"
                    className="w-6 h-6"
                  />
                  Nuestro Impacto
                </h3>
                <p className="text-gray-600 mb-4">
                  Transformamos la manera en que los niños interactúan con el aprendizaje, 
                  haciendo que cada logro sea reconocido y celebrado.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                        alt="Check"
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Mejora en la confianza lectora</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                        alt="Check"
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Progreso académico medible</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                        alt="Check"
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Amor por el aprendizaje</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                    alt="Alcance"
                    className="w-6 h-6"
                  />
                  Nuestro Alcance
                </h3>
                <p className="text-gray-600 mb-4">
                  Llegamos a estudiantes, padres y educadores con herramientas diseñadas 
                  específicamente para cada uno de ellos.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-green-600 mb-1">Para Niños</div>
                    <p className="text-sm text-gray-600">Experiencias de aprendizaje divertidas</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 mb-1">Para Padres</div>
                    <p className="text-sm text-gray-600">Seguimiento del progreso</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-purple-600 mb-1">Para Docentes</div>
                    <p className="text-sm text-gray-600">Herramientas de evaluación</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-green-600 mb-1">Para Escuelas</div>
                    <p className="text-sm text-gray-600">Plataformas institucionales</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compromiso final */}
            <div className="bg-gradient-to-r from-green-50/50 via-blue-50/50 to-purple-50/50 rounded-2xl p-8 border border-gray-100">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Promesa</h2>
                <p className="text-gray-700 text-lg mb-6 max-w-3xl mx-auto">
                  Nos comprometemos a seguir innovando, mejorando y adaptando nuestras soluciones 
                  para garantizar que cada niño, sin importar sus circunstancias, tenga acceso a 
                  las mejores herramientas para desarrollar su potencial lector y amor por el aprendizaje.
                </p>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg inline-flex items-center gap-3 hover:from-green-600 hover:to-blue-600 transition-all duration-300">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
                      alt="Compromiso"
                      className="w-5 h-5"
                    />
                    <span className="font-medium">Comprometidos con la educación del futuro</span>
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
