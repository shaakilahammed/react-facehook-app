import Comment from './Comment';

const CommentList = ({ comments }) => {
    console.log(comments);
    return (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
            {/* <!-- single comment --> */}
            {comments?.length === 0 ? (
                <div>No comments yet!</div>
            ) : (
                comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))
            )}

            {/* <!-- single comment ends --> */}
        </div>
    );
};

export default CommentList;
