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
import { PCrearManifiesto } from '../pages/manifiestos/PCrearManifiesto';
import { ManifiestoPdf } from '../pages/documents/ManifiestoPdf';
import { PCargas } from '../pages/admin/PCargas';
import { PEditCarga } from '../pages/cargas/PEditCarga';
import { PCrearCarga } from '../pages/cargas/PCrearCarga';
import { PFacturas } from '../pages/admin/PFacturas';
import { Factura } from '../pages/documents/Factura';

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
            <Route path="admin/facturas" element={<PFacturas />} />
            <Route path="admin/empresa/configurar" element={<CofigPage />} />
            <Route path="/admin/paquetes" element={<PaquetesPage />} />
            <Route path="/admin/manifiestos" element={<PaquetesPage />} />
            <Route path="/guias" element={<GuiasPage />} />
            <Route path="/manifiestos" element={<Manifiestos />} />
            <Route path="/cargas" element={<PCargas />} />
            <Route path="/cargas/editar/:cargaId" element={<PEditCarga />} />
            <Route path="/cargas/crear" element={<PCrearCarga />} />
            <Route path="/guias/generar" element={<NuevaGuia />} />
            <Route path="/manifiestos/generar" element={<PCrearManifiesto />} />
            <Route path="/facturas/carga/:cargaId" element={<PFacturas />} />



            <Route path="/documents/ticket/:guiaId" element={<Ticket />} />
            <Route path="/documents/etiqueta/:guiaId" element={<Etiqueta />} />
            <Route path="/documents/guia/:guiaId" element={<Guia />} />
            <Route path="/documents/factura/:facturaId" element={<Factura />} />
            <Route path="/documents/manifiestos/pdf/:manifiestoId" element={<ManifiestoPdf />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
