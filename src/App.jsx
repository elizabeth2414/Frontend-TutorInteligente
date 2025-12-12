import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import RegisterPadre from "./pages/auth/RegisterPadre.jsx";
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

import MenuPadre from "./pages/padre/MenuPadre.jsx";
import VincularHijo from "./pages/padre/VincularHijo.jsx";
import MisHijos from "./pages/padre/MisHijos.jsx";
import VerLecturasHijo from "./pages/padre/VerLecturasHijo.jsx";
import LeerLectura from "./pages/padre/LeerLectura.jsx";
import LecturaIA from "./pages/padre/LecturaIA.jsx";
import ProgresoHijos from "./pages/padre/ProgresoHijos.jsx";
import DashboardPadre from "./pages/padre/DashboardPadre.jsx";
import ActividadesHijos from "./pages/padre/ActividadesHijos.jsx";
import ConfiguracionPadre from "./pages/padre/ConfiguracionPadre.jsx";


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
      <Route path="/register-padre" element={<RegisterPadre />} />
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

     <Route path="/padre/menu" element={<MenuPadre />}>
  <Route index element={<DashboardPadre />} />

  <Route path="dashboard" element={<DashboardPadre />} />
  <Route path="hijos" element={<MisHijos />} />
  <Route path="hijos/vincular" element={<VincularHijo />} />

  <Route
    path="hijos/:hijoId/lecturas"
    element={<VerLecturasHijo />}
  />
  <Route
    path="hijos/:hijoId/lecturas/:lecturaId"
    element={<LeerLectura />}
  />
  <Route
    path="hijos/:hijoId/practica-ia"
    element={<LecturaIA />}
  />

  <Route path="actividades" element={<ActividadesHijos />} />
  <Route path="progreso" element={<ProgresoHijos />} />
  <Route path="configuracion" element={<ConfiguracionPadre />} />
</Route>

      {/* ===================== PRIVADAS - ADMIN ===================== */}
      <Route path="/admin/menu" element={<MenuAdmin />}>
        <Route index element={<DashboardAdmin />} />

        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="docentes" element={<DocentesGestion />} />
        <Route path="estudiantes" element={<EstudiantesAdminGestion />} />
      </Route>

    </Routes>
  );
}

export default App;
