import { useState } from 'react';
import commentIcon from '../../assets/icons/comment.svg';
import likeFilledIcon from '../../assets/icons/like-filled.svg';
import likeIcon from '../../assets/icons/like.svg';
import shareIcon from '../../assets/icons/share.svg';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
const PostAction = ({ postId, likes, commentCount }) => {
    const { auth } = useAuth();
    const [liked, setLiked] = useState(likes?.includes(auth?.user?.id));
    const [likeCount, setLikeCount] = useState(likes.length);
    const { authorizedApi } = useAxios();
    const hnadleLike = async () => {
        try {
            const response = await authorizedApi.patch(`/posts/${postId}/like`);
            if (response.status === 200) {
                setLiked((prev) => !prev);
                setLikeCount(response?.data?.likeCount);
            }
        } catch (error) {
            console.log(error.mesaage);
        }
    };
    return (
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
            {/* <!-- Like Button --> */}
            <button
                onClick={hnadleLike}
                className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
            >
                <img
                    className="w-6"
                    src={liked ? likeFilledIcon : likeIcon}
                    alt="Like"
                />
                <span>{likeCount}</span>
            </button>

            {/* <!-- Comment Button --> */}
            <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
                <img src={commentIcon} alt="Comment" />
                <span>Comment({commentCount ?? 0})</span>
            </button>
            {/* <!-- Share Button --> */}

            {/* <!-- Like Button --> */}
            <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
                <img src={shareIcon} alt="Share" />
                <span>Share</span>
            </button>
        </div>
    );
};

export default PostAction;
