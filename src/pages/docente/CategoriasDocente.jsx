import { useEffect, useState } from "react";
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../../services/categoriasService";

import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdClose,
  MdColorLens,
  MdCategory,
} from "react-icons/md";

export default function CategoriasDocente() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const [error, setError] = useState("");
  const [mensajeOK, setMensajeOK] = useState("");

  const [categoriaEdit, setCategoriaEdit] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    edad_minima: 5,
    edad_maxima: 12,
    color: "#3498db",
    icono: "",
  });

  // ============================================
  // Cargar categorías
  // ============================================
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await listarCategorias();
      setCategorias(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando categorías");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Manejo de formulario
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const abrirModalCrear = () => {
    setForm({
      nombre: "",
      descripcion: "",
      edad_minima: 5,
      edad_maxima: 12,
      color: "#3498db",
      icono: "",
    });
    setError("");
    setMensajeOK("");
    setMostrarModalCrear(true);
  };

  const abrirModalEditar = (categoria) => {
    setCategoriaEdit(categoria);
    setForm({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      edad_minima: categoria.edad_minima,
      edad_maxima: categoria.edad_maxima,
      color: categoria.color,
      icono: categoria.icono || "",
    });
    setError("");
    setMensajeOK("");
    setMostrarModalEditar(true);
  };

  const cerrarModales = () => {
    setMostrarModalCrear(false);
    setMostrarModalEditar(false);
  };

  // ============================================
  // Crear categoría
  // ============================================
  const handleCrear = async (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      await crearCategoria(form);
      setMensajeOK("Categoría creada correctamente ✔");
      setMostrarModalCrear(false);
      cargarCategorias();
    } catch (err) {
      console.error(err);
      setError("Error al crear categoría");
    }
  };

  // ============================================
  // Editar categoría
  // ============================================
  const handleEditar = async (e) => {
    e.preventDefault();

    try {
      await actualizarCategoria(categoriaEdit.id, form);
      setMensajeOK("Categoría actualizada correctamente ✔");
      setMostrarModalEditar(false);
      cargarCategorias();
    } catch (err) {
      console.error(err);
      setError("Error al actualizar categoría");
    }
  };

  // ============================================
  // Eliminar categoría
  // ============================================
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro deseas eliminar esta categoría?")) return;

    try {
      await eliminarCategoria(id);
      cargarCategorias();
    } catch (err) {
      console.error(err);
      alert("Error eliminando categoría");
    }
  };

  // ============================================
  // COMPONENTE
  // ============================================
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
          <MdCategory size={32} />
          Categorías de Lectura
        </h1>

        <button
          onClick={abrirModalCrear}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <MdAdd size={22} />
          Nueva Categoría
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Lista de categorías registradas
        </h2>

        {loading ? (
          <p className="text-gray-500">Cargando categorías...</p>
        ) : categorias.length === 0 ? (
          <p className="text-gray-500 italic">No hay categorías aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Edad Min</th>
                  <th className="py-2">Edad Max</th>
                  <th className="py-2">Color</th>
                  <th className="py-2">Icono</th>
                  <th className="py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{c.nombre}</td>
                    <td className="py-2">{c.edad_minima}</td>
                    <td className="py-2">{c.edad_maxima}</td>
                    <td className="py-2">
                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: c.color }}
                      ></div>
                    </td>
                    <td className="py-2">{c.icono || "-"}</td>
                    <td className="py-2">
                      <div className="flex justify-center gap-3">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => abrirModalEditar(c)}
                        >
                          <MdEdit size={22} />
                        </button>

                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleEliminar(c.id)}
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

      {/* ======================================================
            MODAL CREAR CATEGORÍA
      ====================================================== */}
      {mostrarModalCrear && (
        <ModalCategoria
          title="Nueva Categoría"
          form={form}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleCrear}
          cerrarModales={cerrarModales}
        />
      )}

      {/* ======================================================
            MODAL EDITAR CATEGORÍA
      ====================================================== */}
      {mostrarModalEditar && (
        <ModalCategoria
          title="Editar Categoría"
          form={form}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleEditar}
          cerrarModales={cerrarModales}
        />
      )}

    </div>
  );
}

/* ================================================================
   COMPONENTE MODAL (REUTILIZABLE PARA CREAR Y EDITAR)
================================================================ */
function ModalCategoria({ title, form, handleChange, handleSubmit, cerrarModales, error }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-2xl shadow-xl relative">

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={cerrarModales}
        >
          <MdClose size={22} />
        </button>

        <h2 className="text-2xl font-bold text-purple-700 mb-4">{title}</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Nombre *</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              rows={2}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Edad mínima *</label>
              <input
                type="number"
                name="edad_minima"
                value={form.edad_minima}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                min={5}
                max={12}
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Edad máxima *</label>
              <input
                type="number"
                name="edad_maxima"
                value={form.edad_maxima}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                min={5}
                max={12}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <MdColorLens /> Color
            </label>
            <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-16 h-10 rounded-md cursor-pointer border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icono (texto)</label>
            <input
              name="icono"
              value={form.icono}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="Ej: 📚 🐱 ✨"
            />
          </div>

          <div className="flex justify-end mt-4 gap-3">
            <button
              type="button"
              onClick={cerrarModales}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
