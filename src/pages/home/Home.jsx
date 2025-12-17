import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* NAVBAR FIJO */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL - Comienza después del Navbar fijo */}
      <main className="flex-1 pt-20 flex flex-col items-center px-4 pb-10 md:px-6">

        {/* HERO SECTION */}
        <section className="w-full max-w-6xl mt-8 md:mt-12">
          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-8 md:p-12 relative overflow-hidden">
            
            {/* Elementos decorativos de fondo */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              
              {/* Texto principal */}
              <div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Aprende a leer de manera
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    inteligente y divertida
                  </span>
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  <span className="font-semibold text-blue-600">ReadSmartIA</span> es la plataforma que transforma el aprendizaje de la lectura. Con retroalimentación automática, ejercicios interactivos y seguimiento personalizado para cada estudiante.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828811.png" alt="Login" className="w-5 h-5" />
                    Comenzar Ahora
                  </button>
                  <button
                    onClick={() => navigate("/register-padre")}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-lg hover:from-emerald-600 hover:to-green-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Crear Cuenta Gratis
                  </button>
                </div>
              </div>

              {/* Imagen hero */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135765.png"
                      alt="Niños aprendiendo con tecnología"
                      className="w-48 h-48 md:w-60 md:h-60"
                    />
                  </div>
                  {/* Elementos flotantes decorativos */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Meta" className="w-10 h-10" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <img src="https://cdn-icons-png.flaticon.com/512/3069/3069945.png" alt="Estrella" className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="w-full max-w-6xl mt-16 md:mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Así funciona <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ReadSmartIA</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Un proceso simple de cuatro pasos diseñado para maximizar el aprendizaje
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "https://cdn-icons-png.flaticon.com/512/3135/3135803.png", title: "Escucha", desc: "Oye la lectura narrada correctamente" },
              { icon: "https://cdn-icons-png.flaticon.com/512/3097/3097986.png", title: "Lee", desc: "Practica tu lectura en voz alta" },
              { icon: "https://cdn-icons-png.flaticon.com/512/3135/3135773.png", title: "Recibe Feedback", desc: "Correcciones automáticas de la IA" },
              { icon: "https://cdn-icons-png.flaticon.com/512/3135/3135812.png", title: "Mejora", desc: "Practica áreas de oportunidad" }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <img src={step.icon} alt={step.title} className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 font-bold rounded-full mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN DE ROLES */}
        <section className="w-full max-w-6xl mt-16 md:mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Quién usa ReadSmartIA?</h2>
            <p className="text-gray-600">Diseñado para cada parte del proceso educativo</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: "https://cdn-icons-png.flaticon.com/512/3097/3097144.png", 
                title: "Estudiante", 
                desc: "Practico lecturas interactivas y la IA me ayuda a mejorar mi pronunciación con ejercicios personalizados.",
                color: "from-blue-500 to-blue-600",
                bg: "blue"
              },
              { 
                icon: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png", 
                title: "Docente", 
                desc: "Asigno lecturas, analizo reportes detallados y doy seguimiento al progreso de cada estudiante en tiempo real.",
                color: "from-purple-500 to-purple-600",
                bg: "purple"
              },
              { 
                icon: "https://cdn-icons-png.flaticon.com/512/456/456283.png", 
                title: "Representante", 
                desc: "Acompaño el aprendizaje de mi hijo, reviso sus avances y me mantengo informado de su progreso.",
                color: "from-pink-500 to-pink-600",
                bg: "pink"
              }
            ].map((role, idx) => (
              <div key={idx} className={`group bg-white rounded-2xl p-7 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${role.bg}-100 to-${role.bg}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <img src={role.icon} alt={role.title} className="w-10 h-10" />
                </div>
                <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${role.color} mb-3`}>
                  {role.title}
                </h3>
                <p className="text-gray-700 mb-6">{role.desc}</p>
                <button
                  onClick={() => navigate(`/register-${role.title.toLowerCase()}`)}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${role.color} text-white font-semibold shadow-md hover:shadow-lg transition-all`}
                >
                  Registro para {role.title}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="w-full max-w-6xl mt-16 md:mt-20">
          <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl p-8 md:p-12 border border-white/60">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Beneficios de aprender con <span className="text-blue-600">Inteligencia Artificial</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: "https://cdn-icons-png.flaticon.com/512/3135/3135756.png", text: "Aprendizaje personalizado que se adapta al ritmo de cada niño" },
                    { icon: "https://cdn-icons-png.flaticon.com/512/3135/3135782.png", text: "Retroalimentación inmediata y constructiva" },
                    { icon: "https://cdn-icons-png.flaticon.com/512/3135/3135774.png", text: "Métodos interactivos que mantienen la motivación" },
                    { icon: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png", text: "Accesible desde cualquier dispositivo, en cualquier momento" }
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                        <img src={benefit.icon} alt="Beneficio" className="w-6 h-6" />
                      </div>
                      <p className="text-gray-700 text-lg">{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8370/8370847.png"
                    alt="Beneficios de la educación con IA"
                    className="w-64 h-64 md:w-80 md:h-80"
                  />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-xl">
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-gray-900">+95%</div>
                      <div className="text-gray-600">Mejora en pronunciación</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LLAMADO A LA ACCIÓN FINAL */}
        <section className="w-full max-w-4xl mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 md:p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para transformar la experiencia de aprendizaje?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Únete a miles de estudiantes, docentes y padres que ya están usando ReadSmartIA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register-padre")}
                className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
              >
                Comenzar Gratis
              </button>
              <button
                onClick={() => navigate("/sobre-nosotros")}
                className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:scale-105 transition-all"
              >
                Conocer Más
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-6">Sin tarjeta de crédito requerida • Plan gratuito disponible</p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
