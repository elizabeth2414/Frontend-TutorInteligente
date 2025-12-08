import { useState } from "react";
import Swal from "sweetalert2";
import { crearDocenteAdmin } from "../../services/adminService";

export default function ModalCrearDocente({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    especialidad: "",
    grado_academico: "",
    institucion: "",
  });

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await crearDocenteAdmin(form);
      Swal.fire("Éxito", "Docente creado correctamente", "success");
      onCreated();
      onClose();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.detail || "No se pudo crear", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Crear Docente</h2>

        <div className="grid grid-cols-2 gap-4">
          <input className="input" name="nombre" placeholder="Nombre" onChange={handleChange} />
          <input className="input" name="apellido" placeholder="Apellido" onChange={handleChange} />
          <input className="input col-span-2" name="email" placeholder="Email" onChange={handleChange} />
          <input className="input col-span-2" name="password" placeholder="Contraseña" type="password" onChange={handleChange} />

          <input className="input col-span-2" name="especialidad" placeholder="Especialidad" onChange={handleChange} />
          <input className="input col-span-2" name="grado_academico" placeholder="Grado Académico" onChange={handleChange} />
          <input className="input col-span-2" name="institucion" placeholder="Institución" onChange={handleChange} />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
