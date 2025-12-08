import { useEffect, useState } from "react";
import {
  getEstudiantesDocente,
  getCursosDocente,
  crearEstudianteDocente,
} from "../../services/docentesService";

import {
  MdPersonAdd,
  MdVisibility,
  MdEdit,
  MdClose,
} from "react-icons/md";

export default function EstudiantesDocente() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState("");
  const [mensajeOK, setMensajeOK] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    nivel_educativo: "1",
    curso_id: "",
    necesidades_especiales: "",
  });

  // =========================
  // CARGAR DATOS INICIALES
  // =========================
  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      setLoading(true);
      const [estData, cursosData] = await Promise.all([
        getEstudiantesDocente(),
        getCursosDocente(),
      ]);

      setEstudiantes(estData || []);
      setCursos(cursosData || []);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError("Error cargando estudiantes o cursos");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // MANEJO DEL FORMULARIO
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const abrirModal = () => {
    setError("");
    setMensajeOK("");
    setForm({
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      nivel_educativo: "1",
      curso_id: "",
      necesidades_especiales: "",
    });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    if (saving) return;
    setMostrarModal(false);
  };

  const handleCrearEstudiante = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeOK("");
    setSaving(true);

    try {
      if (!form.nombre || !form.apellido || !form.fecha_nacimiento || !form.curso_id) {
        setError("Por favor, completa los campos obligatorios (*)");
        setSaving(false);
        return;
      }

      const payload = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        fecha_nacimiento: form.fecha_nacimiento,
        nivel_educativo: Number(form.nivel_educativo),
        necesidades_especiales: form.necesidades_especiales || null,
        curso_id: Number(form.curso_id),
      };

      await crearEstudianteDocente(payload);

      setMensajeOK("Estudiante creado correctamente ✅");

      const estData = await getEstudiantesDocente();
      setEstudiantes(estData);

      setMostrarModal(false);
    } catch (err) {
      console.error("Error creando estudiante:", err);
      setError("No se pudo crear el estudiante");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Estudiantes</h1>

        <button
          onClick={abrirModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <MdPersonAdd size={22} />
          Agregar Estudiante
        </button>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Lista de estudiantes registrados
        </h2>

        {loading ? (
          <p className="text-gray-500">Cargando estudiantes...</p>
        ) : estudiantes.length === 0 ? (
          <p className="text-gray-500 italic">
            No hay estudiantes registrados aún. ¡Agrega el primero! 😊
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Apellido</th>
                  <th className="py-2">Curso</th>
                  <th className="py-2">Nivel</th>
                  <th className="py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{e.nombre}</td>
                    <td className="py-2">{e.apellido}</td>
                    <td className="py-2">{e.curso_nombre}</td>
                    <td className="py-2">{e.nivel_educativo}</td>
                    <td className="py-2">
                      <div className="flex justify-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800" title="Ver detalle">
                          <MdVisibility size={22} />
                        </button>
                        <button className="text-green-600 hover:text-green-800" title="Editar">
                          <MdEdit size={22} />
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

      {/* ===================== MODAL AGREGAR ESTUDIANTE ===================== */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">

            {/* Botón cerrar */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={cerrarModal}
              disabled={saving}
            >
              <MdClose size={22} />
            </button>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Nuevo Estudiante
            </h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {mensajeOK && <p className="text-green-600 text-sm mb-2">{mensajeOK}</p>}

            <form onSubmit={handleCrearEstudiante}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-1">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fecha nacimiento *</label>
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    value={form.fecha_nacimiento}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nivel *</label>
                  <select
                    name="nivel_educativo"
                    value={form.nivel_educativo}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Curso *</label>
                  <select
                    name="curso_id"
                    value={form.curso_id}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre} — Nivel {c.nivel}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Necesidades especiales (opcional)
                  </label>
                  <textarea
                    name="necesidades_especiales"
                    value={form.necesidades_especiales}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    rows={2}
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                  disabled={saving}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                  disabled={saving}
                >
                  {saving ? "Guardando..." : "Guardar estudiante"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
