import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage';
import ProtectedRoutes from './ProtectedRouter';
import AdminLayout from '../layouts/AdminLayout';
import { HomePage } from '../pages/HomePage';
import { EmpresasList } from '../pages/empresas/EmpresasList';
import { DetalleEmpresa } from '../pages/empresas/DetalleEmpresa';
import { PerfilPage } from '../pages/PerfilPage';
import { SucursalesPage } from '../pages/admin/SucursalesPage';
import { UsuariosPage } from '../pages/admin/UsuariosPage';
import { TasasPage } from '../pages/admin/TasasPage';
import { CofigPage } from '../pages/admin/CofigPage';
import { PaquetesPage } from '../pages/admin/PaquetesPage';
import { GuiasPage } from '../pages/admin/GuiasPage';
import { ListaClientes } from '../pages/clientes/ListaClientes';
import { Ticket } from '../pages/documents/Ticket';
import { Etiqueta } from '../pages/documents/Etiqueta';
import { Guia } from '../pages/documents/Guia';
import { Manifiestos } from '../pages/admin/Manifiestos';
import { NuevaGuia } from '../pages/guias/NuevaGuia';
import { PPaises } from '../pages/admin/PPaises';

export const MyRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route exact path='/' element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="empresas" element={<EmpresasList />} />
            <Route path="paises" element={<PPaises />} />
            <Route path="clientes" element={<ListaClientes />} />
            <Route path="empresas/detalle/:empresaId" element={<DetalleEmpresa />} />
            <Route path="profile" element={<PerfilPage />} />
            <Route path="admin/sucursales" element={<SucursalesPage />} />
            <Route path="admin/usuarios" element={<UsuariosPage />} />
            <Route path="admin/tasas" element={<TasasPage />} />
            <Route path="admin/empresa/configurar" element={<CofigPage />} />
            <Route path="/admin/paquetes" element={<PaquetesPage />} />
            <Route path="/admin/manifiestos" element={<PaquetesPage />} />
            <Route path="/guias" element={<GuiasPage />} />
            <Route path="/manifiestos" element={<Manifiestos />} />
            <Route path="/guias/generar" element={<NuevaGuia />} />



            <Route path="/documents/ticket/:guiaId" element={<Ticket />} />
            <Route path="/documents/etiqueta/:guiaId" element={<Etiqueta />} />
            <Route path="/documents/guia/:guiaId" element={<Guia />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
