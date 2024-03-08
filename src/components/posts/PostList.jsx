import Post from './Post';

const PostList = ({ posts }) => {
    if (posts.length === 0) {
        return <div>No post found!</div>;
    }

    return posts.map((post) => <Post key={post.id} post={post} />);
};

export default PostList;
