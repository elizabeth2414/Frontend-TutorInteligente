import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { actualizarDocenteAdmin } from "../../services/adminService";

export default function ModalEditarDocente({ open, onClose, docente, onUpdated }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (docente) {
      setForm({
        especialidad: docente.especialidad,
        grado_academico: docente.grado_academico,
        institucion: docente.institucion,
        activo: docente.activo,
      });
    }
  }, [docente]);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await actualizarDocenteAdmin(docente.id, form);
      Swal.fire("Actualizado", "Docente actualizado correctamente", "success");
      onUpdated();
      onClose();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el docente", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Editar Docente</h2>

        <div className="grid gap-4">
          <input className="input" name="especialidad" value={form.especialidad || ""} onChange={handleChange} />
          <input className="input" name="grado_academico" value={form.grado_academico || ""} onChange={handleChange} />
          <input className="input" name="institucion" value={form.institucion || ""} onChange={handleChange} />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>Actualizar</button>
        </div>
      </div>
    </div>
  );
}
