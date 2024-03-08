import CommentSection from './comments/CommentSection';
import PostAction from './PostAction';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

const Post = () => {
    return (
        <article className="card mt-6 lg:mt-8">
            {/* <!-- post header --> */}
            <PostHeader />
            {/* <!-- post header ends --> */}

            {/* <!-- post body --> */}
            <PostBody />
            {/* <!-- post body ends --> */}

            {/* <!-- post actions --> */}
            <PostAction />
            {/* <!-- post actions  --> */}

            {/* <!-- comment section --> */}
            <CommentSection />
            {/* <!-- comment section ends --> */}
        </article>
    );
};

export default Post;
