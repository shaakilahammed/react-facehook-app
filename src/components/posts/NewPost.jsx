import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import PostEntry from './PostEntry';

const NewPost = () => {
    const [showPostEntry, setShowPostEntry] = useState(false);
    const { auth } = useAuth();
    const {
        state: { profile },
    } = useProfile();
    const user = profile?.user ?? auth?.user;

    return (
        <>
            {showPostEntry ? (
                <PostEntry onCreated={() => setShowPostEntry(false)} />
            ) : (
                <div className="card">
                    <div className="flex-center mb-3 gap-2 lg:gap-4">
                        <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_BASE_URL}/${
                                user?.avatar
                            }`}
                            alt="A"
                        />

                        <div className="flex-1">
                            <textarea
                                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                                name="post"
                                id="post"
                                placeholder="What's on your mind?"
                                onClick={() => setShowPostEntry(true)}
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewPost;
