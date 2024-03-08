import CommentSection from './comments/CommentSection';
import PostAction from './PostAction';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

const Post = ({ post }) => {
    return (
        <article className="card mt-6 lg:mt-8">
            {/* <!-- post header --> */}
            <PostHeader post={post} />
            {/* <!-- post header ends --> */}

            {/* <!-- post body --> */}
            <PostBody poster={post?.image} content={post?.content} />
            {/* <!-- post body ends --> */}

            {/* <!-- post actions --> */}
            <PostAction
                postId={post?.id}
                commentCount={post?.comments?.length}
            />
            {/* <!-- post actions  --> */}

            {/* <!-- comment section --> */}
            <CommentSection post={post} />
            {/* <!-- comment section ends --> */}
        </article>
    );
};

export default Post;
