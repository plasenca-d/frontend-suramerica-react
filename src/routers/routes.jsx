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

export const MyRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route exact path='/' element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="empresas" element={<EmpresasList />} />
            <Route path="empresas/detalle/:empresaId" element={<DetalleEmpresa />} />
            <Route path="profile" element={<PerfilPage />} />
            <Route path="admin/sucursales" element={<SucursalesPage />} />
            <Route path="admin/usuarios" element={<UsuariosPage />} />
            <Route path="admin/tasas" element={<TasasPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
