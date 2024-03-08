import { useState } from 'react';
import PostAction from './PostAction';
import PostBody from './PostBody';
import PostHeader from './PostHeader';
import CommentSection from './comments/CommentSection';

const Post = ({ post }) => {
    const [comments, setComments] = useState(post?.comments);
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
                likes={post?.likes}
                commentCount={comments?.length}
            />
            {/* <!-- post actions  --> */}

            {/* <!-- comment section --> */}
            <CommentSection
                post={post}
                comments={comments}
                setComments={setComments}
            />
            {/* <!-- comment section ends --> */}
        </article>
    );
};

export default Post;
