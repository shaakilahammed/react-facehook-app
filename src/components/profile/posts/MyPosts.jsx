import Post from './Post';

const MyPosts = () => {
    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

            {/* <!-- post  --> */}
            <Post />
            {/* <!-- post ends --> */}
        </>
    );
};

export default MyPosts;
