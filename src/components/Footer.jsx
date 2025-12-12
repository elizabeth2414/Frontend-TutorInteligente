import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        mt-20 w-full py-10 
        bg-white/70 backdrop-blur-lg 
        border-t border-white/40 
        shadow-xl
      "
    >
      {/* CONTENEDOR */}
      <div
        className="
          max-w-6xl mx-auto px-6 
          flex flex-col md:flex-row 
          justify-between items-center 
          gap-8
        "
      >

        {/* INFO DEL PROYECTO */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-extrabold text-blue-700 drop-shadow-sm">
            TutorIA Kids
          </h2>

          <p className="text-gray-700 mt-2 text-sm max-w-xs">
            Plataforma educativa inteligente diseñada para apoyar el aprendizaje lector
            de niños entre 7 y 10 años.
          </p>

          <p className="text-gray-600 text-sm mt-1">
            © 2025 – Todos los derechos reservados.
          </p>
        </div>

        {/* REDES SOCIALES */}
        <div className="flex gap-6 text-2xl text-blue-700">
          <a
            href="#"
            className="hover:text-blue-900 transition hover:scale-125"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="hover:text-pink-700 transition hover:scale-125"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="hover:text-red-600 transition hover:scale-125"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>

          <a
            href="#"
            className="hover:text-black transition hover:scale-125"
            aria-label="TikTok"
          >
            <FaTiktok />
          </a>
        </div>

        {/* INFORMACIÓN INSTITUCIONAL */}
        <div className="text-center md:text-right text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold text-purple-800 drop-shadow-sm">
            Instituto Superior Tecnológico del Azuay
          </p>
          <p>Desarrollo de Software – Proyecto Integrador</p>
          <p>N6A</p>
        </div>
      </div>
    </footer>
  );
}
