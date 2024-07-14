import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
const ProtectedRoutes = () => {
    const user = Cookies.get("sesion")
    if (!user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;