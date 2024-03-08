import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useProfile } from '../../../hooks/useProfile';

const CommentInput = ({ post, setComments }) => {
    const { auth } = useAuth();
    const { state } = useProfile();
    const { authorizedApi } = useAxios();
    const user = state?.user ?? auth?.user;
    const [comment, setComment] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authorizedApi.patch(
                `/posts/${post.id}/comment`,
                {
                    comment,
                }
            );

            if (response.status === 200) {
                setComments([...response.data.comments]);
                setComment('');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
                className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                src={`${import.meta.env.VITE_BASE_URL}/${user?.avatar}`}
                alt="avatar"
            />

            <div className="flex-1">
                <form onSubmit={handleSubmit}>
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                        name="post"
                        id="post"
                        placeholder="What's on your mind?"
                    />
                </form>
            </div>
        </div>
    );
};

export default CommentInput;
