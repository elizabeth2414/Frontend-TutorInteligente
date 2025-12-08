import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import RegisterDocente from "./pages/auth/RegisterDocente.jsx";
import SobreNosotros from "./pages/info/SobreNosotros.jsx";
import Mision from "./pages/info/Mision.jsx";
import Objetivo from "./pages/info/Objetivo.jsx";
import Contacto from "./pages/info/Contacto.jsx";

import MenuDocente from "./pages/docente/MenuDocente.jsx";
import DashboardDocente from "./pages/docente/DashboardDocente.jsx";
import CursosGestion from "./pages/docente/CursosGestion.jsx";
import EstudiantesDocente from "./pages/docente/EstudiantesDocente.jsx";
import CategoriasDocente from "./pages/docente/CategoriasDocente.jsx";
import LecturasDocente from "./pages/docente/LecturasDocente.jsx";

import ActividadesGeneradas from "./pages/docente/ActividadesGeneradas.jsx";
import VerActividadIA from "./pages/docente/VerActividadIA.jsx";

// ADMIN
import MenuAdmin from "./pages/admin/MenuAdmin.jsx";
import DashboardAdmin from "./pages/admin/DashboardAdmin.jsx";
import DocentesGestion from "./pages/admin/DocentesGestion.jsx";
import EstudiantesAdminGestion from "./pages/admin/EstudiantesAdminGestion.jsx";

function App() {
  return (
    <Routes>

      {/* ===================== PÚBLICAS ===================== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterDocente />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/mision" element={<Mision />} />
      <Route path="/objetivo" element={<Objetivo />} />
      <Route path="/contacto" element={<Contacto />} />


      {/* ===================== PRIVADAS - DOCENTE ===================== */}
      <Route path="/docente/menu" element={<MenuDocente />}>
        <Route index element={<DashboardDocente />} />

        <Route path="dashboard" element={<DashboardDocente />} />
        <Route path="cursos" element={<CursosGestion />} />
        <Route path="estudiantes" element={<EstudiantesDocente />} />
        <Route path="categorias" element={<CategoriasDocente />} />
        <Route path="lecturas" element={<LecturasDocente />} />

        {/* LISTAR ACTIVIDADES GENERADAS POR IA */}
        <Route
          path="lecturas/:contenidoId/actividades"
          element={<ActividadesGeneradas />}
        />

        {/* VER UNA ACTIVIDAD ESPECÍFICA */}
        <Route
          path="lecturas/:contenidoId/actividades/:actividadId"
          element={<VerActividadIA />}
        />
      </Route>


      {/* ===================== PRIVADAS - ADMIN ===================== */}
      <Route path="/admin/menu" element={<MenuAdmin />}>
        <Route index element={<DashboardAdmin />} />

        <Route path="docentes" element={<DocentesGestion />} />
        <Route path="estudiantes" element={<EstudiantesAdminGestion />} />
      </Route>

    </Routes>
  );
}

export default App;
