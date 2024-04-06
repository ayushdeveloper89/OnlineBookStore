import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoutes = () => {
    const { logIn } = useSelector((state) => state.logIn);
    const { appLoading } = useSelector((state) => state.appStatus);

    if(!appLoading){
        return !logIn ? <Outlet /> : <Navigate to="/" />;
    }
};

export default RestrictedRoutes;