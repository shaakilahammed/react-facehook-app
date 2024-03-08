import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import useAuth from '../hooks/useAuth';
import PostProvider from '../providers/PostProvider';
import ProfileProvider from '../providers/ProfileProvider';

const PrivateRoute = () => {
    const { auth } = useAuth();
    if (auth.user) {
        return (
            <PostProvider>
                <ProfileProvider>
                    <Navbar />
                    <Outlet />
                </ProfileProvider>
            </PostProvider>
        );
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
