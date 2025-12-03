import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import RegisterDocente from "./pages/auth/RegisterDocente.jsx";

import MenuDocente from "./pages/docente/MenuDocente.jsx";
import DashboardDocente from "./pages/docente/DashboardDocente.jsx";
import CursosGestion from "./pages/docente/CursosGestion.jsx";

// ==== ADMIN ====
import MenuAdmin from "./pages/admin/MenuAdmin.jsx";
import DashboardAdmin from "./pages/admin/DashboardAdmin.jsx";
import DocentesGestion from "./pages/admin/DocentesGestion.jsx";
import EstudiantesAdminGestion from "./pages/admin/EstudiantesAdminGestion.jsx";
// (si usas más pantallas de admin, las importas igual aquí)

function App() {
  return (
    <Routes>

      {/* PÚBLICAS */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterDocente />} />

      {/* PRIVADAS - DOCENTE */}
      <Route path="/docente/menu" element={<MenuDocente />}>
        {/* Vista principal → bienvenida del dashboard */}
        <Route index element={<DashboardDocente />} />

        {/* Otras rutas */}
        <Route path="dashboard" element={<DashboardDocente />} />
        <Route path="cursos" element={<CursosGestion />} />
      </Route>

      {/* PRIVADAS - ADMIN */}
      <Route path="/admin/menu" element={<MenuAdmin />}>
        {/* Vista principal del admin */}
        <Route index element={<DashboardAdmin />} />

        {/* Gestión de docentes */}
        <Route path="docentes" element={<DocentesGestion />} />

        {/* Gestión de estudiantes */}
        <Route path="estudiantes" element={<EstudiantesAdminGestion />} />

        {/* Aquí puedes ir agregando más rutas admin:
            <Route path="cursos" element={<CursosAdminGestion />} />
            <Route path="reportes" element={<ReportesAdmin />} />
        */}
      </Route>

    </Routes>
  );
}

export default App;
