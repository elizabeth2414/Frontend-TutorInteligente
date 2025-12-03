import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

// Importaciones correctas según tu carpeta
import ModalCrearDocente from "../../components/admin/ModalCrearDocente";
import ModalEditarDocente from "../../components/admin/ModalEditarDocente";

export default function DocentesGestion() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);

  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);

  const cargarDocentes = async () => {
    try {
      const res = await axiosClient.get("/admin/docentes");
      setDocentes(res.data);
    } catch (error) {
      console.error("Error cargando docentes", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarDocentes();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Gestión de Docentes
      </h1>

      <button
        onClick={() => setCrearVisible(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-xl mb-5"
      >
        + Nuevo Docente
      </button>

      {/* Modales */}
      <ModalCrearDocente
        visible={crearVisible}
        onClose={() => setCrearVisible(false)}
        onSuccess={cargarDocentes}
      />

      <ModalEditarDocente
        visible={editarVisible}
        docente={docenteSeleccionado}
        onClose={() => setEditarVisible(false)}
        onSuccess={cargarDocentes}
      />

      {/* Loading */}
      {loading ? (
        <p className="text-gray-500">Cargando docentes...</p>
      ) : docentes.length === 0 ? (
        <p className="text-gray-500">No hay docentes registrados.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-purple-100">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Especialidad</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {docentes.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.nombre} {d.apellido}</td>
                <td className="p-3">{d.email}</td>
                <td className="p-3">{d.especialidad}</td>

                <td className="p-3 text-center space-x-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => {
                      setDocenteSeleccionado(d);
                      setEditarVisible(true);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg"
                    onClick={async () => {
                      await axiosClient.delete(`/admin/docentes/${d.id}`);
                      cargarDocentes();
                    }}
                  >
                    Eliminar
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}
