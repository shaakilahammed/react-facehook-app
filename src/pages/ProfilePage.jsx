import { useContext } from 'react';
import ProfileInfo from '../components/profile/ProfileInfo';
import MyPosts from '../components/profile/posts/MyPosts';
import { ProfileContext } from '../contexts';

const ProfilePage = () => {
    const {
        profileQueryState: { isLoading, data, error, isError },
    } = useContext(ProfileContext);

    if (isLoading) {
        return <div> Fetching Profile data...</div>;
    }
    if (isError) {
        return <div>{JSON.stringify(error)}</div>;
    }
    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                {/* <!-- profile info --> */}
                <ProfileInfo user={data?.user} />
                {/* <!-- end profile info --> */}

                <MyPosts posts={data?.posts} />
            </div>
        </main>
    );
};

export default ProfilePage;
