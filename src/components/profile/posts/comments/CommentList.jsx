import Comment from './Comment';

const CommentList = () => {
    return (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
            {/* <!-- single comment --> */}
            <Comment />
            {/* <!-- single comment ends --> */}
        </div>
    );
};

export default CommentList;
