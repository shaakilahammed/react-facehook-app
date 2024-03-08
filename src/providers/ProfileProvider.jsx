import { ProfileContext } from '../contexts';
import useAuth from '../hooks/useAuth';
import useProfileQuery from '../hooks/useProfileQuery';

const ProfileProvider = ({ children }) => {
    const { auth } = useAuth();
    const profileQueryState = useProfileQuery(auth?.user?.id);

    return (
        <ProfileContext.Provider value={{ profileQueryState }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
