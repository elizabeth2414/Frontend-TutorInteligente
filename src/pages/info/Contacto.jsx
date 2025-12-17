import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Contacto() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex flex-1 justify-center items-center p-6">
        <div className="bg-white/80 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl border border-white/40 max-w-4xl w-full relative overflow-hidden">

          {/* Elementos decorativos */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Encabezado */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center shadow-lg">
                    {/* Icono de contacto de Flaticon - alternativa gratuita */}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3069/3069172.png"
                      alt="Contacto"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                      alt="Teléfono"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm mb-4">
                Contáctanos
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                Estamos aquí para responder tus preguntas y escuchar tus sugerencias
              </p>
            </div>

            {/* Información de contacto */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Email */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-4 rounded-xl">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                      alt="Email"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Correo Electrónico</h3>
                    <p className="text-gray-600 mb-3">Escríbenos a nuestra dirección principal</p>
                    <a 
                      href="mailto:calmasoporte2025@gmail.com" 
                      className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors inline-flex items-center gap-2"
                    >
                      calmasoporte2025@gmail.com
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2989/2989981.png"
                        alt="Enlace"
                        className="w-4 h-4"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Soporte */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-4 rounded-xl">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3082/3082383.png"
                      alt="Soporte"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Soporte</h3>
                    <p className="text-gray-600 mb-3">Respondemos en menos de 24 horas</p>
                    <p className="text-gray-700 font-medium">Horario: Lunes a Viernes 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto (opcional) */}
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1034/1034146.png"
                  alt="Mensaje"
                  className="w-7 h-7"
                />
                ¿Prefieres escribirnos directamente?
              </h2>
              
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Tu nombre</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Tu correo</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Tu mensaje</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none h-32"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/542/542638.png"
                    alt="Enviar"
                    className="w-5 h-5"
                  />
                  Enviar Mensaje
                </button>
              </div>
            </div>

            {/* Nota */}
            <p className="text-center text-gray-500 mt-8 text-sm flex items-center justify-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3756/3756687.png"
                alt="Información"
                className="w-4 h-4"
              />
              Nos comprometemos a responderte en el menor tiempo posible
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
