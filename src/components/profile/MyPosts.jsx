import { useProfile } from '../../hooks/useProfile';
import PostList from '../posts/PostList';

const MyPosts = () => {
    const {
        state: { posts },
    } = useProfile();
    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

            {/* <!-- post  --> */}
            <PostList posts={posts} />
            {/* <!-- post ends --> */}
        </>
    );
};

export default MyPosts;
