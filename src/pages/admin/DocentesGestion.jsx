import { useEffect, useState } from "react";
import {
  listarDocentesAdmin,
  eliminarDocenteAdmin,
} from "../../services/adminService";

import Swal from "sweetalert2";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

import ModalCrearDocente from "../../components/admin/ModalCrearDocente";
import ModalEditarDocente from "../../components/admin/ModalEditarDocente";

export default function DocentesGestion() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [docenteEditar, setDocenteEditar] = useState(null);

  const cargarDocentes = async () => {
    setLoading(true);
    try {
      const data = await listarDocentesAdmin();
      setDocentes(data);
    } catch (error) {
      console.error("Error cargando docentes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarDocentes();
  }, []);

  const eliminarDocente = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar Docente?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      await eliminarDocenteAdmin(id);
      Swal.fire("Eliminado", "Docente eliminado correctamente", "success");
      cargarDocentes();
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Docentes</h1>

        <button onClick={() => setModalCrear(true)}
          className="btn-primary flex items-center gap-2">
          <MdAdd size={20} /> Crear Docente
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Especialidad</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {docentes.map((d) => (
              <tr key={d.id}>
                <td className="border p-2">
                  {d.usuario.nombre} {d.usuario.apellido}
                </td>
                <td className="border p-2">{d.usuario.email}</td>
                <td className="border p-2">{d.especialidad}</td>

                <td className="border p-2 flex gap-2">
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setDocenteEditar(d);
                      setModalEditar(true);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => eliminarDocente(d.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modales */}
      <ModalCrearDocente
        open={modalCrear}
        onClose={() => setModalCrear(false)}
        onCreated={cargarDocentes}
      />

      <ModalEditarDocente
        open={modalEditar}
        docente={docenteEditar}
        onClose={() => setModalEditar(false)}
        onUpdated={cargarDocentes}
      />
    </div>
  );
}
