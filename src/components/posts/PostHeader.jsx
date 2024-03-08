import { useState } from 'react';
import { actions } from '../../actions';
import threeDot from '../../assets/icons/3dots.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import timeIcon from '../../assets/icons/time.svg';
import useAuth from '../../hooks/useAuth';
import { useAvatar } from '../../hooks/useAvatar';
import useAxios from '../../hooks/useAxios';
import usePost from '../../hooks/usePost';
import { getDateDifferenceFromNow } from '../../utils';
const PostHeader = ({ post }) => {
    const avatarURL = useAvatar(post);
    const [showAction, setShowAction] = useState(false);
    const { dispatch } = usePost();
    const { authorizedApi } = useAxios();
    const { auth } = useAuth();
    const isMe = post?.author?.id == auth?.user?.id;
    const toggleAction = () => {
        setShowAction(!showAction);
    };

    const handleDeletePost = async () => {
        if (confirm('Do you really want to delete this?')) {
            dispatch({ type: actions.post.DATA_FETCHING });

            try {
                const response = await authorizedApi.delete(
                    `/posts/${post.id}`
                );

                if (response.status === 200) {
                    dispatch({
                        type: actions.post.POST_DELETED,
                        data: post.id,
                    });
                }
            } catch (error) {
                dispatch({
                    type: actions.post.DATA_FETCH_ERROR,
                    error: error?.message,
                });
            }
        }
    };

    return (
        <header className="flex items-center justify-between gap-4">
            {/* <!-- author info --> */}
            <div className="flex items-center gap-3">
                <img
                    className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                    src={avatarURL}
                    alt="avatar"
                />
                <div>
                    <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
                    <div className="flex items-center gap-1.5">
                        <img src={timeIcon} alt="time" />
                        <span className="text-sm text-gray-400 lg:text-base">
                            {`${getDateDifferenceFromNow(post?.createAt)} ago`}
                        </span>
                    </div>
                </div>
            </div>
            {/* <!-- author info ends --> */}

            {/* <!-- action dot --> */}
            {isMe && (
                <div className="relative">
                    <button onClick={toggleAction}>
                        <img src={threeDot} alt="3dots of Action" />
                    </button>

                    {/* <!-- Action Menus Popup --> */}
                    {showAction && (
                        <div className="action-modal-container">
                            <button className="action-menu-item hover:text-lwsGreen">
                                <img src={editIcon} alt="Edit" />
                                Edit
                            </button>
                            <button
                                className="action-menu-item hover:text-red-500"
                                onClick={handleDeletePost}
                            >
                                <img src={deleteIcon} alt="Delete" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* <!-- action dot ends --> */}
        </header>
    );
};

export default PostHeader;
