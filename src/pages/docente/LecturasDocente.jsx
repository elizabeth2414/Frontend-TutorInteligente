// src/pages/docente/LecturasDocente.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  listarLecturas,
  crearLectura,
  actualizarLectura,
  eliminarLectura,
} from "../../services/lecturasService";

import { listarCategorias } from "../../services/categoriasService";
import { getCursosDocente } from "../../services/docentesService";

import { generarActividadesIA } from "../../services/iaActividadesService";

import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdClose,
  MdLibraryBooks,
  MdAutoStories,
  MdSmartToy,
} from "react-icons/md";

export default function LecturasDocente() {
  const navigate = useNavigate();

  const [lecturas, setLecturas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [lecturaEdit, setLecturaEdit] = useState(null);

  const [generandoIA, setGenerandoIA] = useState(false); // 🔵 LOADER

  const [form, setForm] = useState({
    titulo: "",
    contenido: "",
    categoria_id: "",
    curso_id: "",
    nivel_dificultad: 1,
    edad_recomendada: 7,
    etiquetas: [],
    audio_url: "",
  });

  const [error, setError] = useState("");

  // ==========================================================
  // Cargar información
  // ==========================================================
  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      setLoading(true);
      const [lec, cat, crs] = await Promise.all([
        listarLecturas(),
        listarCategorias(),
        getCursosDocente(),
      ]);

      setLecturas(lec);
      setCategorias(cat);
      setCursos(crs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Modales
  // ==========================================================
  const abrirModalCrear = () => {
    setForm({
      titulo: "",
      contenido: "",
      categoria_id: "",
      curso_id: "",
      nivel_dificultad: 1,
      edad_recomendada: 7,
      etiquetas: [],
      audio_url: "",
    });
    setError("");
    setModalCrear(true);
  };

  const abrirModalEditar = (lec) => {
    setLecturaEdit(lec);
    setForm({ ...lec });
    setError("");
    setModalEditar(true);
  };

  const cerrarModales = () => {
    setModalCrear(false);
    setModalEditar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================================
  // Crear lectura
  // ==========================================================
  const handleCrear = async (e) => {
    e.preventDefault();

    if (!form.titulo.trim() || !form.contenido.trim()) {
      setError("Todos los campos obligatorios deben completarse.");
      return;
    }

    try {
      await crearLectura({
        ...form,
        categoria_id: Number(form.categoria_id),
        curso_id: Number(form.curso_id),
        nivel_dificultad: Number(form.nivel_dificultad),
        edad_recomendada: Number(form.edad_recomendada),
      });

      cerrarModales();
      cargarTodo();
    } catch (err) {
      console.error(err);
      setError("Error creando lectura");
    }
  };

  // ==========================================================
  // Editar lectura
  // ==========================================================
  const handleEditar = async (e) => {
    e.preventDefault();

    try {
      await actualizarLectura(lecturaEdit.id, {
        ...form,
        categoria_id: Number(form.categoria_id),
        curso_id: Number(form.curso_id),
        nivel_dificultad: Number(form.nivel_dificultad),
        edad_recomendada: Number(form.edad_recomendada),
      });

      cerrarModales();
      cargarTodo();
    } catch (err) {
      console.error(err);
      setError("Error editando lectura");
    }
  };

  // ==========================================================
  // Eliminar lectura
  // ==========================================================
  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar esta lectura?")) return;

    try {
      await eliminarLectura(id);
      cargarTodo();
    } catch (err) {
      console.error(err);
      alert("Error eliminando lectura");
    }
  };

  // ==========================================================
  // GENERAR ACTIVIDADES IA (corregido)
  // ==========================================================
  const handleGenerarIA = async (lectura) => {
    if (
      !confirm(
        `¿Deseas generar actividades IA para la lectura "${lectura.titulo}"?`
      )
    )
      return;

    try {
      setGenerandoIA(true);

      // 🔥 Enviar los campos correctos al backend
      await generarActividadesIA(lectura.id, {
        num_preguntas: 5,
        incluir_verdadero_falso: true,
        incluir_multiple_choice: true,
        dificultad: lectura.nivel_dificultad,
        idioma: "es",
      });
      

      alert("Actividades generadas correctamente 🎉");

      navigate(`/docente/menu/lecturas/${lectura.id}/actividades`);
    } catch (err) {
      console.error(err);
      alert("Error generando actividades con IA");
    } finally {
      setGenerandoIA(false);
    }
  };

  return (
    <div className="p-6">

      {/* LOADER MODERNO PARA IA */}
      {generandoIA && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-lg font-semibold text-blue-700">
              Generando actividades con IA...
            </p>
            <p className="text-gray-600 text-sm">Por favor espera unos segundos</p>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
          <MdLibraryBooks size={32} />
          Lecturas
        </h1>

        <button
          onClick={abrirModalCrear}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <MdAdd size={22} />
          Nueva Lectura
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <p className="text-gray-500">Cargando lecturas...</p>
        ) : lecturas.length === 0 ? (
          <p className="text-gray-500 italic">No hay lecturas aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2">Título</th>
                  <th className="py-2">Curso</th>
                  <th className="py-2">Categoría</th>
                  <th className="py-2">Edad</th>
                  <th className="py-2">Audio</th>
                  <th className="py-2 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {lecturas.map((l) => (
                  <tr key={l.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{l.titulo}</td>
                    <td className="py-2">{cursos.find(c => c.id === l.curso_id)?.nombre}</td>
                    <td className="py-2">{categorias.find(x => x.id === l.categoria_id)?.nombre}</td>
                    <td className="py-2">{l.edad_recomendada}</td>
                    <td className="py-2">{l.audio_url ? "Sí" : "No"}</td>

                    {/* ACCIONES */}
                    <td className="py-2">
                      <div className="flex justify-center gap-3">

                        {/* VER ACTIVIDADES */}
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1"
                          onClick={() =>
                            navigate(`/docente/menu/lecturas/${l.id}/actividades`)
                          }
                        >
                          <MdAutoStories size={18} />
                          IA
                        </button>

                        {/* GENERAR ACTIVIDADES IA */}
                        <button
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded flex items-center gap-1"
                          onClick={() => handleGenerarIA(l)}
                        >
                          <MdSmartToy size={18} />
                          Generar IA
                        </button>

                        {/* EDITAR */}
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => abrirModalEditar(l)}
                        >
                          <MdEdit size={22} />
                        </button>

                        {/* ELIMINAR */}
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleEliminar(l.id)}
                        >
                          <MdDelete size={22} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* MODALES */}
      {modalCrear && (
        <ModalLectura
          title="Nueva Lectura"
          form={form}
          categorias={categorias}
          cursos={cursos}
          error={error}
          cerrarModales={cerrarModales}
          handleChange={handleChange}
          handleSubmit={handleCrear}
        />
      )}

      {modalEditar && (
        <ModalLectura
          title="Editar Lectura"
          form={form}
          categorias={categorias}
          cursos={cursos}
          error={error}
          cerrarModales={cerrarModales}
          handleChange={handleChange}
          handleSubmit={handleEditar}
        />
      )}

    </div>
  );
}

/* ======================================================
   COMPONENTE DE MODAL DE CREAR / EDITAR LECTURAS
====================================================== */
function ModalLectura({
  title,
  form,
  categorias,
  cursos,
  error,
  cerrarModales,
  handleChange,
  handleSubmit
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl relative">

        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={cerrarModales}
        >
          <MdClose size={22} />
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-4">{title}</h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2">
            <label className="font-medium">Título *</label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Contenido *</label>
            <textarea
              name="contenido"
              value={form.contenido}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="font-medium">Categoría *</label>
            <select
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">Seleccione</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Curso *</label>
            <select
              name="curso_id"
              value={form.curso_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">Seleccione</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Edad Recomendada *</label>
            <input
              type="number"
              name="edad_recomendada"
              value={form.edad_recomendada}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              min={5}
              max={12}
              required
            />
          </div>

          <div>
            <label className="font-medium">Dificultad *</label>
            <select
              name="nivel_dificultad"
              value={form.nivel_dificultad}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="1">1 (Fácil)</option>
              <option value="2">2</option>
              <option value="3">3 (Medio)</option>
              <option value="4">4</option>
              <option value="5">5 (Difícil)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Audio URL (opcional)</label>
            <input
              name="audio_url"
              value={form.audio_url}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={cerrarModales}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Guardar
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
