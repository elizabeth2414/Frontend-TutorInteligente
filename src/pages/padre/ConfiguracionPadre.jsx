import { useState } from "react";
import {
  MdNotificationsActive,
  MdPerson,
  MdSecurity,
} from "react-icons/md";

export default function ConfiguracionPadre() {
  // ==========================
  // Estados de configuración (UI)
  // ==========================
  const [notifLecturas, setNotifLecturas] = useState(true);
  const [notifPracticas, setNotifPracticas] = useState(true);
  const [notifRecordatorios, setNotifRecordatorios] = useState(false);

  const [permitirIA, setPermitirIA] = useState(true);
  const [permitirAudio, setPermitirAudio] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-100">
      <main className="pt-24 max-w-5xl mx-auto p-6 space-y-8">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow">
            <MdSecurity size={26} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600">
              Configuración
            </h1>
            <p className="text-sm text-slate-600">
              Controla notificaciones, privacidad y preferencias
            </p>
          </div>
        </div>

        {/* NOTIFICACIONES */}
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl
                            border border-indigo-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100
                            text-indigo-600 flex items-center justify-center">
              <MdNotificationsActive size={22} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
              Notificaciones
            </h2>
          </div>

          <Toggle
            label="Lecturas pendientes"
            description="Recibir alertas cuando un hijo tenga lecturas sin completar."
            enabled={notifLecturas}
            setEnabled={setNotifLecturas}
          />

          <Toggle
            label="Prácticas de pronunciación"
            description="Notificar cuando no se haya realizado la práctica con IA."
            enabled={notifPracticas}
            setEnabled={setNotifPracticas}
          />

          <Toggle
            label="Recordatorios periódicos"
            description="Enviar recordatorios diarios o semanales."
            enabled={notifRecordatorios}
            setEnabled={setNotifRecordatorios}
          />
        </section>

        {/* PRIVACIDAD */}
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl
                            border border-emerald-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100
                            text-emerald-600 flex items-center justify-center">
              <MdSecurity size={22} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
              Privacidad y control
            </h2>
          </div>

          <Toggle
            label="Permitir análisis con IA"
            description="Autorizar el uso de inteligencia artificial para evaluar la lectura."
            enabled={permitirIA}
            setEnabled={setPermitirIA}
          />

          <Toggle
            label="Permitir grabación de audio"
            description="Autorizar el uso del micrófono para prácticas de lectura."
            enabled={permitirAudio}
            setEnabled={setPermitirAudio}
          />
        </section>

        {/* CUENTA (informativo por ahora) */}
        <section className="bg-white/80 border border-slate-100 rounded-2xl
                            p-5 text-sm text-slate-600 shadow-sm flex items-center gap-3">
          <MdPerson className="text-slate-400" size={22} />
          Las opciones de cuenta estarán disponibles próximamente.
        </section>

      </main>
    </div>
  );
}

/* ======================================================
   COMPONENTE TOGGLE (REUTILIZABLE)
====================================================== */
function Toggle({ label, description, enabled, setEnabled }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-medium text-slate-800">
          {label}
        </p>
        <p className="text-sm text-slate-500">
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full
                    transition ${
                      enabled ? "bg-indigo-600" : "bg-slate-300"
                    }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white
                      transition ${
                        enabled ? "translate-x-5" : "translate-x-1"
                      }`}
        />
      </button>
    </div>
  );
}
