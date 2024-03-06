import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
    const { auth } = useAuth();
    if (auth.user) {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
