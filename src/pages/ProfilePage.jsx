import { useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const ProfilePage = () => {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const { authorizedApi } = useAxios();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authorizedApi.get(
                    `/profile/${auth?.user?.id}`
                );
                setUser(response?.data?.user);
                setPosts(response?.data?.posts);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [authorizedApi, auth?.user?.id]);

    if (loading) {
        return <div> Fetching your Profile data...</div>;
    }
    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }
    return (
        <div>
            Welcome, {user?.firstName} {user?.lastName}
            <p>You have {posts.length} posts.</p>
        </div>
    );
};

export default ProfilePage;
