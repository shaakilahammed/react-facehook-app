import Comment from './Comment';

const CommentList = ({ post }) => {
    return (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
            {/* <!-- single comment --> */}
            {post?.comments?.length === 0 ? (
                <div>No comments yet!</div>
            ) : (
                post?.comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))
            )}

            {/* <!-- single comment ends --> */}
        </div>
    );
};

export default CommentList;
