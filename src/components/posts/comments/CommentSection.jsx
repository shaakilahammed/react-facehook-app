import { useState } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentSection = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    return (
        <div>
            {/* <!-- comment input box --> */}
            <CommentInput post={post} />
            {/* <!-- comment filter button --> */}
            <div className="mt-4">
                <button
                    className="text-gray-300 max-md:text-sm"
                    onClick={() => setShowComments((prev) => !prev)}
                >
                    {showComments ? 'Hide comments ▲' : 'All Comments ▼'}
                </button>
            </div>
            {/* <!-- comments --> */}
            {showComments && <CommentList post={post} />}

            {/* <!-- comments ends --> */}
        </div>
    );
};

export default CommentSection;
