import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLecturasHijo } from "../../services/padresService";

export default function VerLecturasHijo() {
  const { hijoId } = useParams(); // 👈 CLAVE
  const [lecturas, setLecturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hijoId) return; // seguridad extra

    const cargarLecturas = async () => {
      try {
        const data = await getLecturasHijo(hijoId);
        setLecturas(data);
      } catch (error) {
        console.error("❌ Error cargando lecturas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarLecturas();
  }, [hijoId]);

  if (loading) return <p>Cargando lecturas...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        📚 Lecturas del hijo
      </h1>

      {lecturas.length === 0 && (
        <p className="text-gray-500">
          No hay lecturas asignadas.
        </p>
      )}

      {lecturas.map((l) => (
        <div
          key={l.id}
          className="bg-white p-4 rounded-xl shadow"
        >
          <h2 className="font-semibold">{l.titulo}</h2>
          <p className="text-sm text-gray-600">
            Nivel: {l.nivel_dificultad}
          </p>
        </div>
      ))}
    </div>
  );
}
