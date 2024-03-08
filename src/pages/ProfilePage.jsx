import { useEffect } from 'react';
import { actions } from '../actions';
import MyPosts from '../components/profile/MyPosts';
import ProfileInfo from '../components/profile/ProfileInfo';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { useProfile } from '../hooks/useProfile';

const ProfilePage = () => {
    const {
        state: { loading, error },
        dispatch,
    } = useProfile();
    const { authorizedApi } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        const fetchProfile = async () => {
            try {
                const response = await authorizedApi.get(
                    `/profile/${auth?.user?.id}`
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.DATA_FETCHED,
                        data: response.data,
                    });
                }
            } catch (error) {
                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchProfile();
    }, [auth?.user?.id, authorizedApi, dispatch]);
    let content = null;
    if (loading) {
        content = <div> Fetching Profile data...</div>;
    }
    if (!loading && error) {
        content = <div>{JSON.stringify(error)}</div>;
    }

    if (!loading && !error) {
        content = (
            <>
                <ProfileInfo />

                <MyPosts />
            </>
        );
    }

    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">{content}</div>
        </main>
    );
};

export default ProfilePage;
