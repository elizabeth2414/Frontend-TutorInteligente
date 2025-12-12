// src/pages/padres/LecturaIAHijo.jsx
import { useState, useEffect } from "react";
import {
  analizarLecturaIA,
  obtenerTextoLectura,
  obtenerAudioLectura,
  practicarEjercicioIA,
} from "../../services/iaService";
import { getMisHijos, getLecturasHijo } from "../../services/padresService";
import {
  MdMic,
  MdStop,
  MdUpload,
  MdSend,
  MdPlayArrow,
  MdMenuBook,
  MdAutoGraph,
  MdReplay,
} from "react-icons/md";
import ZonaPracticaIA from "../../components/lectura/ZonaPracticaIA";


export default function LecturaIAHijo() {
  // ==========================
  // Estado general (padre, hijo, lecturas)
  // ==========================
  const [hijos, setHijos] = useState([]);
  const [hijoSeleccionado, setHijoSeleccionado] = useState(null);

  const [lecturas, setLecturas] = useState([]);
  const [lecturaSeleccionada, setLecturaSeleccionada] = useState(null);
  const [lectura, setLectura] = useState(null); // {id, titulo, contenido}

  // ==========================
  // Estado de audio de lectura
  // ==========================
  const [audioArchivo, setAudioArchivo] = useState(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
  const [grabando, setGrabando] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // ==========================
  // Resultado IA lectura
  // ==========================
  const [resultado, setResultado] = useState(null);
  const [evaluacionId, setEvaluacionId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ==========================
  // Estado práctica de ejercicios
  // ==========================
  const [ejercicioActivo, setEjercicioActivo] = useState(null);
  const [audioPractica, setAudioPractica] = useState(null);
  const [previewPractica, setPreviewPractica] = useState(null);
  const [grabandoPractica, setGrabandoPractica] = useState(false);
  const [mediaPractica, setMediaPractica] = useState(null);
  const [resultadoPractica, setResultadoPractica] = useState(null);
  const [cargandoPractica, setCargandoPractica] = useState(false);

  // ==========================
  // Cargar hijos del padre
  // ==========================
  useEffect(() => {
  const cargarHijos = async () => {
    try {
      const data = await getMisHijos();
      // data = lista de EstudianteConCursosResponse

      const lista = Array.isArray(data) ? data : data.hijos || [];

      // Lo convertimos a objetos simples {id, nombre, apellido}
      const hijosPlano = lista.map((item) => {
        const est = item.estudiante || item; // por si en algún momento devuelves plano
        return {
          id: est.id,
          nombre: est.nombre,
          apellido: est.apellido,
        };
      });

      setHijos(hijosPlano);
    } catch (error) {
      console.error(error);
      setErrorMsg("No se pudieron cargar los hijos del padre.");
    }
  };
  cargarHijos();
}, []);


  // ==========================
  // Limpiar resultados de IA
  // ==========================
  const limpiarResultados = () => {
    setResultado(null);
    setEvaluacionId(null);
    setAudioArchivo(null);
    setAudioPreviewUrl(null);

    setEjercicioActivo(null);
    setAudioPractica(null);
    setPreviewPractica(null);
    setResultadoPractica(null);
  };

  // ==========================
  // Selección de hijo
  // ==========================
  const manejarSeleccionHijo = async (e) => {
    const id = Number(e.target.value) || null;

    setHijoSeleccionado(null);
    setLecturas([]);
    setLecturaSeleccionada(null);
    setLectura(null);
    limpiarResultados();
    setErrorMsg("");

    if (!id) return;

    const hijo = hijos.find((h) => h.id === id);
    setHijoSeleccionado(hijo);

    try {
      const data = await getLecturasHijo(id);
      // adapta si tu backend envía { lecturas: [...] }
      setLecturas(Array.isArray(data) ? data : data.lecturas || []);
    } catch (error) {
      console.error(error);
      setErrorMsg("No se pudieron cargar las lecturas del estudiante.");
    }
  };

  // ==========================
  // Selección de lectura
  // ==========================
  const manejarSeleccionLectura = async (e) => {
    const id = Number(e.target.value) || null;

    setLecturaSeleccionada(null);
    setLectura(null);
    limpiarResultados();
    setErrorMsg("");

    if (!id) return;

    const lecturaInfo = lecturas.find((l) => l.id === id);
    setLecturaSeleccionada(lecturaInfo);

    try {
      const data = await obtenerTextoLectura(id);
      setLectura(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("No se pudo cargar el texto de la lectura.");
    }
  };

  // ==========================
  // Escuchar lectura (audio backend)
  // ==========================
 // ==========================
// Escuchar lectura (TTS del navegador)
// ==========================
const manejarEscucharLectura = async () => {
  if (!lecturaSeleccionada) {
    setErrorMsg("Selecciona una lectura para poder escucharla.");
    return;
  }

  setErrorMsg("");

  try {
    // 1) Asegurarnos de tener el texto de la lectura
    let texto = lectura?.contenido;

    if (!texto) {
      // por si acaso aún no se cargó en estado
      const data = await obtenerTextoLectura(lecturaSeleccionada.id);
      setLectura(data);
      texto = data.contenido;
    }

    if (!texto) {
      setErrorMsg("La lectura no tiene contenido para leer.");
      return;
    }

    // 2) Verificar soporte de TTS
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setErrorMsg("Tu navegador no soporta lectura en voz alta.");
      return;
    }

    // 3) Leer en voz alta con la API del navegador
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "es-ES";
    utterance.rate = 1;   // velocidad normal
    utterance.pitch = 1;  // tono normal

    // Cancelar cualquier lectura anterior
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error(err);
    setErrorMsg("Ocurrió un error al intentar leer la lectura en voz alta.");
  }
};


  // ==========================
  // Grabación principal (lectura completa)
  // ==========================
  const iniciarGrabacion = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMsg("Tu navegador no soporta grabación de audio.");
        return;
      }
      setErrorMsg("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioArchivo(blob);
        const url = URL.createObjectURL(blob);
        setAudioPreviewUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setGrabando(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo acceder al micrófono.");
    }
  };

  const detenerGrabacion = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setGrabando(false);
    }
  };

 const manejarArchivo = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) {
    console.log("No se seleccionó ningún archivo");
    return;
  }

  console.log("Archivo de lectura seleccionado:", file);
  setAudioArchivo(file);

  try {
    const url = URL.createObjectURL(file);
    setAudioPreviewUrl(url);
  } catch (err) {
    console.error("Error creando URL de previsualización:", err);
    setErrorMsg("No se pudo previsualizar el audio seleccionado.");
  }

  // Opcional: limpiar el input para poder volver a seleccionar el mismo archivo
  e.target.value = "";
};


  // ==========================
  // Enviar lectura completa a la IA
  // ==========================
  const manejarEnviar = async () => {
    if (!hijoSeleccionado || !lecturaSeleccionada) {
      setErrorMsg("Selecciona un estudiante y una lectura antes de analizar.");
      return;
    }
    if (!audioArchivo) {
      setErrorMsg("Debes grabar o subir un audio antes de enviar.");
      return;
    }

    setErrorMsg("");
    setCargando(true);
    setResultado(null);

    try {
      const data = await analizarLecturaIA({
        estudianteId: hijoSeleccionado.id,
        contenidoId: lecturaSeleccionada.id,
        archivoAudio: audioArchivo,
        evaluacionId,
      });

      setResultado(data);
      if (data.evaluacion_id) {
        setEvaluacionId(data.evaluacion_id);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Ocurrió un error al analizar la lectura.");
    } finally {
      setCargando(false);
    }
  };

  // ==========================
  // Grabación práctica de ejercicios
  // ==========================
  const iniciarGrabacionPractica = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMsg("Tu navegador no soporta grabación de audio.");
        return;
      }
      setErrorMsg("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioPractica(blob);
        const url = URL.createObjectURL(blob);
        setPreviewPractica(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setMediaPractica(recorder);
      setGrabandoPractica(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo acceder al micrófono para la práctica.");
    }
  };

  const detenerGrabacionPractica = () => {
    if (mediaPractica) {
      mediaPractica.stop();
      setGrabandoPractica(false);
    }
  };

  const manejarArchivoPractica = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) {
    console.log("No se seleccionó audio de práctica");
    return;
  }

  console.log("Archivo de práctica seleccionado:", file);
  setAudioPractica(file);

  try {
    const url = URL.createObjectURL(file);
    setPreviewPractica(url);
  } catch (err) {
    console.error("Error creando URL de previsualización (práctica):", err);
    setErrorMsg("No se pudo previsualizar el audio de práctica.");
  }

  e.target.value = "";
};


  const enviarPracticaEjercicio = async () => {
    if (!ejercicioActivo) {
      setErrorMsg("Selecciona un ejercicio para practicar.");
      return;
    }
    if (!hijoSeleccionado) {
      setErrorMsg("Falta el estudiante para registrar la práctica.");
      return;
    }
    if (!audioPractica) {
      setErrorMsg("Graba o sube un audio para la práctica.");
      return;
    }

    setErrorMsg("");
    setCargandoPractica(true);
    setResultadoPractica(null);

    try {
      const data = await practicarEjercicioIA({
        estudianteId: hijoSeleccionado.id,
        ejercicioId: ejercicioActivo.id,
        archivoAudio: audioPractica,
      });
      setResultadoPractica(data);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "Ocurrió un error al analizar la práctica del ejercicio."
      );
    } finally {
      setCargandoPractica(false);
    }
  };

  // ==========================
  // Voz: análisis general
  // ==========================
  const speakAnalisisGeneral = (data) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const partes = [];

    if (data.precision_global != null) {
      partes.push(
        `Tu precisión global fue de ${data.precision_global.toFixed(
          1
        )} por ciento.`
      );
    }

    if (data.palabras_por_minuto != null) {
      partes.push(
        `Leíste aproximadamente ${data.palabras_por_minuto.toFixed(
          0
        )} palabras por minuto.`
      );
    }

    if (data.retroalimentacion) {
      partes.push(data.retroalimentacion);
    }

    if (data.errores && data.errores.length > 0) {
      partes.push("Algunos de los errores que encontramos fueron:");
      const primeros = data.errores.slice(0, 3);
      primeros.forEach((err, idx) => {
        const num = idx + 1;
        if (err.tipo_error === "puntuacion") {
          partes.push(
            `Error ${num}: tuvimos un problema de puntuación cerca de la posición ${
              err.posicion ?? ""
            }.`
          );
        } else {
          partes.push(
            `Error ${num}: la palabra correcta es "${err.palabra_original}", pero se escuchó "${err.palabra_leida}".`
          );
        }
      });
    } else {
      partes.push("No encontramos errores importantes. ¡Excelente trabajo!");
    }

    const utterance = new SpeechSynthesisUtterance(partes.join(" "));
    utterance.lang = "es-ES";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (resultado) {
      speakAnalisisGeneral(resultado);
    }
  }, [resultado]);

  // ==========================
  // Voz: práctica de ejercicios
  // ==========================
  const speakPractica = (data) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const partes = [];

    if (data.mejora_lograda) {
      partes.push(
        "¡Muy bien! La inteligencia artificial detecta que has mejorado en este ejercicio."
      );
    } else {
      partes.push(
        "Todavía podemos mejorar un poco más en este ejercicio. Vamos a intentarlo de nuevo con calma."
      );
    }

    if (data.precision_global != null) {
      partes.push(
        `En esta práctica tu precisión fue de ${data.precision_global.toFixed(
          1
        )} por ciento.`
      );
    }

    if (data.mensaje_practica) {
      partes.push(data.mensaje_practica);
    }

    const utterance = new SpeechSynthesisUtterance(partes.join(" "));
    utterance.lang = "es-ES";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (resultadoPractica) {
      speakPractica(resultadoPractica);
    }
  }, [resultadoPractica]);

  // ==========================
  // Render
  // ==========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6 md:space-y-8">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-md">
                <MdAutoGraph size={22} />
              </span>
              TutorIA Kids – Lectura con IA
            </h1>
            <p className="mt-1 text-sm md:text-base text-slate-600 max-w-2xl">
              El padre inicia sesión, elige al estudiante y una lectura, y la IA
              guía la práctica de pronunciación con retroalimentación visual y
              auditiva.
            </p>
          </div>

          {resultado && (
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Intento actual
                </span>
                <span className="text-lg font-semibold text-indigo-600">
                  #{resultado.numero_intento ?? "1"}
                </span>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Precisión
                </span>
                <span className="text-lg font-semibold text-emerald-600">
                  {resultado.precision_global != null
                    ? `${resultado.precision_global.toFixed(1)}%`
                    : "—"}
                </span>
              </div>
              <button
                onClick={limpiarResultados}
                className="ml-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                <MdReplay />
                Reiniciar
              </button>
            </div>
          )}
        </header>

        {/* PASOS */}
        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/80 border border-sky-100 rounded-2xl p-4 shadow-sm flex gap-3">
            <div className="h-8 w-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <p className="text-xs font-semibold text-sky-600 uppercase tracking-wide">
                Elegir estudiante y lectura
              </p>
              <p className="text-xs text-slate-600">
                Selecciona al hijo y la lectura que va a practicar.
              </p>
            </div>
          </div>
          <div className="bg-white/80 border border-emerald-100 rounded-2xl p-4 shadow-sm flex gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                Leer en voz alta
              </p>
              <p className="text-xs text-slate-600">
                El estudiante escucha la lectura y luego graba su lectura.
              </p>
            </div>
          </div>
          <div className="bg-white/80 border border-indigo-100 rounded-2xl p-4 shadow-sm flex gap-3">
            <div className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Analizar y practicar
              </p>
              <p className="text-xs text-slate-600">
                La IA detecta errores y genera ejercicios para reforzar.
              </p>
            </div>
          </div>
        </section>

        {/* SELECCIÓN ESTUDIANTE + LECTURA */}
        <section className="bg-white/90 border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Estudiante
              </label>
              <select
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50"
                value={hijoSeleccionado?.id || ""}
                onChange={manejarSeleccionHijo}
              >
                <option value="">Selecciona un estudiante</option>
                {hijos.map((estudiante) => (
  <option key={estudiante.id} value={estudiante.id}>
    {estudiante.nombre} {estudiante.apellido}
  </option>
))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Lectura asignada
              </label>
              <select
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50"
                value={lecturaSeleccionada?.id || ""}
                onChange={manejarSeleccionLectura}
                disabled={!hijoSeleccionado}
              >
                <option value="">
                  {hijoSeleccionado
                    ? "Selecciona una lectura"
                    : "Primero selecciona un estudiante"}
                </option>
                {lecturas.map((lec) => (
  <option key={lec.id} value={lec.id}>
    {lec.titulo}
  </option>
))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={manejarEscucharLectura}
                disabled={!lecturaSeleccionada}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:brightness-105 disabled:opacity-60"
              >
                <MdPlayArrow />
                Escuchar lectura
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="mt-2 text-xs text-red-600 font-medium bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {errorMsg}
            </p>
          )}
        </section>

        {/* TEXTO DE LA LECTURA */}
        <section className="bg-white/90 border border-indigo-100 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <MdMenuBook />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Texto de la lectura
              </h2>
              <p className="text-xs text-slate-500">
                El estudiante debe leer este texto en voz alta después de
                escucharlo.
              </p>
            </div>
          </div>

          {lectura ? (
            <>
              <h3 className="text-base font-semibold text-indigo-700">
                {lectura.titulo}
              </h3>
              <div className="border border-indigo-50 rounded-2xl p-3 bg-indigo-50/40 max-h-64 overflow-y-auto text-sm leading-relaxed text-slate-800">
                {lectura.contenido}
              </div>
            </>
          ) : (
            <div className="border border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/60 text-sm text-slate-500">
              Selecciona un estudiante y una lectura para visualizar el texto.
            </div>
          )}
        </section>

        {/* AUDIO DE LECTURA */}
        <section className="bg-white/90 border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">
            Lectura del estudiante (audio)
          </h2>
          <p className="text-xs text-slate-500">
            Graba la lectura o sube un audio para que la IA analice la
            pronunciación.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            {!grabando ? (
              <button
                type="button"
                onClick={iniciarGrabacion}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-400 bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 shadow-sm"
              >
                <MdMic />
                Grabar con micrófono
              </button>
            ) : (
              <button
                type="button"
                onClick={detenerGrabacion}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-400 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 shadow-sm"
              >
                <MdStop />
                Detener grabación
              </button>
            )}

            <label
  htmlFor="archivo-lectura"
  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-sm cursor-pointer hover:bg-slate-100 shadow-sm"
>
  <MdUpload />
  <span>Subir archivo de audio</span>
</label>
<input
  id="archivo-lectura"
  type="file"
  accept="audio/*"
  className="hidden"
  onChange={manejarArchivo}
/>

            <button
              type="button"
              onClick={manejarEnviar}
              disabled={cargando}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:brightness-105 disabled:opacity-60"
            >
              <MdSend />
              {cargando ? "Analizando..." : "Enviar a la IA"}
            </button>
          </div>

          {audioPreviewUrl && (
            <div className="mt-3">
              <p className="text-xs text-slate-500 mb-1">
                Previsualización del audio:
              </p>
              <div className="border border-slate-200 rounded-2xl px-3 py-2 bg-slate-50">
                <audio controls src={audioPreviewUrl} className="w-full" />
              </div>
            </div>
          )}
        </section>

        {/* RESULTADOS DE LA IA */}
        {resultado && (
          <section className="space-y-5">
            {/* Métricas principales */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/90 border border-emerald-100 rounded-2xl p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-emerald-500 font-semibold">
                  Precisión global
                </p>
                <p className="mt-2 text-3xl font-extrabold text-emerald-600">
                  {resultado.precision_global != null
                    ? `${resultado.precision_global.toFixed(1)}%`
                    : "—"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Porcentaje de palabras y signos de puntuación correctos.
                </p>
              </div>

              <div className="bg-white/90 border border-indigo-100 rounded-2xl p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">
                  Velocidad lectora
                </p>
                <p className="mt-2 text-3xl font-extrabold text-indigo-600">
                  {resultado.palabras_por_minuto != null
                    ? resultado.palabras_por_minuto.toFixed(1)
                    : "—"}
                  <span className="text-base font-medium text-slate-500 ml-1">
                    ppm
                  </span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Palabras por minuto leídas por el estudiante.
                </p>
              </div>

              <div className="bg-white/90 border border-sky-100 rounded-2xl p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-sky-500 font-semibold">
                  Intento
                </p>
                <p className="mt-2 text-3xl font-extrabold text-sky-600">
                  #{resultado.numero_intento ?? "1"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Cada nuevo audio genera un intento para comparar mejoras.
                </p>
              </div>
            </div>

            {/* Feedback */}
            {resultado.retroalimentacion && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm text-sm text-emerald-900">
                <p className="font-semibold mb-1">
                  Retroalimentación de la IA:
                </p>
                <p>{resultado.retroalimentacion}</p>
              </div>
            )}

            {/* Errores detectados */}
            <div className="bg-white/90 border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-slate-800">
                Errores detectados (palabras y puntuación)
              </h3>
              {resultado.errores && resultado.errores.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs border border-slate-100 rounded-xl overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-2 py-1 border border-slate-100 text-left">
                          Tipo
                        </th>
                        <th className="px-2 py-1 border border-slate-100 text-left">
                          Original
                        </th>
                        <th className="px-2 py-1 border border-slate-100 text-left">
                          Leída
                        </th>
                        <th className="px-2 py-1 border border-slate-100 text-left">
                          Posición
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.errores.map((err, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          <td className="px-2 py-1 border border-slate-100">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                err.tipo_error === "puntuacion"
                                  ? "bg-purple-50 text-purple-600"
                                  : "bg-sky-50 text-sky-600"
                              }`}
                            >
                              {err.tipo_error ?? "—"}
                            </span>
                          </td>
                          <td className="px-2 py-1 border border-slate-100">
                            {err.palabra_original ?? "—"}
                          </td>
                          <td className="px-2 py-1 border border-slate-100">
                            {err.palabra_leida ?? "—"}
                          </td>
                          <td className="px-2 py-1 border border-slate-100">
                            {err.posicion ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No se detectaron errores (¡lectura excelente! 🎉).
                </p>
              )}
            </div>

           {resultado && (
  <section className="space-y-5">
    ...
    <ZonaPracticaIA
      ejercicios={resultado.ejercicios_recomendados}
      ejercicioActivo={ejercicioActivo}
      grabandoPractica={grabandoPractica}
      previewPractica={previewPractica}
      cargandoPractica={cargandoPractica}
      resultadoPractica={resultadoPractica}
      onSelectEjercicio={(ej) => {
        setEjercicioActivo(ej);
        setAudioPractica(null);
        setPreviewPractica(null);
        setResultadoPractica(null);
      }}
      onStartGrabacionPractica={iniciarGrabacionPractica}
      onStopGrabacionPractica={detenerGrabacionPractica}
      onArchivoPractica={manejarArchivoPractica}
      onEnviarPractica={enviarPracticaEjercicio}
    />
  </section>
)}


            
          </section>
        )}
      </div>
    </div>
  );
}
