import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoutes  = () => {
    const { logIn } = useSelector((state) => state.logIn);
    const { userRole } = useSelector((state) => state.userInfo);
    const { appLoading } = useSelector((state) => state.appStatus);
    
    if(!appLoading){
        return (logIn && userRole === "appAdmin") ? <Outlet /> : <Navigate to="/auth/login" />;
    }
};

export default AdminRoutes ;