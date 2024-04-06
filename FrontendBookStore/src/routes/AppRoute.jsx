import { createBrowserRouter } from "react-router-dom";
import { lazy } from 'react';
import PrivateRoutes from './PrivateRoutes.jsx';
import RestrictedRoutes from './RestrictedRoutes.jsx';
import AdminRoutes from './AdminRoutes.jsx';

import Loadable from '../components/Loader/Loadable.jsx';
const Mainlayout = Loadable(lazy(() => import('../components/Mainlayout/Mainlayout')));
const Signup = Loadable(lazy(() => import('../pages/Auth/Signup/Signup')));
const LogIn = Loadable(lazy(() => import('../pages/Auth/LogIn/LogIn.jsx')));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));
const IndividualBook = Loadable(lazy(() => import('../pages/InividualBook/IndividualBook.jsx')));
const ShowAllBooks = Loadable(lazy(() => import('../pages/Admin/ShowAllBooks')));
const Cart = Loadable(lazy(() => import('../pages/Cart/Cart')));

const AppRoutes = createBrowserRouter([
    {
        path: '/auth',
        element: <RestrictedRoutes />,
        children: [
            {
                path: '/auth',
                element: <Mainlayout />,
                children: [
                    {
                        path: '/auth/login',
                        element: <LogIn />
                    },
                    {
                        path: '/auth/signup',
                        element: <Signup />
                    },
                ]
            }
        ]
    },
    {
        path: '/',
        element: <PrivateRoutes />,
        children: [
            {
                path: '/',
                element: <Mainlayout />,
                children: [
                    {
                        path: '/',
                        element: <Dashboard />
                    },
                    {
                        path: '/bookDetail/:id',
                        element: <IndividualBook />
                    },
                    {
                        path: '/cart',
                        element: <Cart />
                    },
                ]
            }
        ]
    },
    {
        path: '/admin',
        element: <PrivateRoutes />,
        children: [
            {
                path: '/admin',
                element: <Mainlayout />,
                children: [
                    {
                        path: '/admin/managebooks',
                        element: <ShowAllBooks />
                    },
                ]
            }
        ]
    }
    
]);

export default AppRoutes;