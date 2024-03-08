import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import useAuth from '../hooks/useAuth';
import ProfileProvider from '../providers/ProfileProvider';

const PrivateRoute = () => {
    const { auth } = useAuth();
    if (auth.user) {
        return (
            <ProfileProvider>
                <Navbar />
                <Outlet />
            </ProfileProvider>
        );
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
