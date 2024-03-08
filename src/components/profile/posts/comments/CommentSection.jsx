import CommentInput from './CommentInput';
import CommentList from './CommentList';
import CommentsFilter from './CommentsFilter';

const CommentSection = () => {
    return (
        <div>
            {/* <!-- comment input box --> */}
            <CommentInput />
            {/* <!-- comment filter button --> */}
            <CommentsFilter />
            {/* <!-- comments --> */}
            <CommentList />
            {/* <!-- comments ends --> */}
        </div>
    );
};

export default CommentSection;
