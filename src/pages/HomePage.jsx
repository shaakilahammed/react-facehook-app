import { useEffect, useReducer } from 'react';
import { actions } from '../actions';
import avatarImage from '../assets/images/avatars/avatar_1.png';
import PostList from '../components/posts/PostList';
import useAxios from '../hooks/useAxios';
import { initialState, postReducer } from '../reducers/postReducer';

const HomePage = () => {
    const [state, dispatch] = useReducer(postReducer, initialState);
    const { authorizedApi } = useAxios();
    useEffect(() => {
        dispatch({ type: actions.post.DATA_FETCHING });

        const fetchPost = async () => {
            try {
                const response = await authorizedApi.get(
                    `${import.meta.env.VITE_BASE_URL}/posts`
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.post.DATA_FETCHED,
                        data: response.data,
                    });
                }
            } catch (error) {
                dispatch({
                    type: actions.post.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchPost();
    }, [authorizedApi]);
    let content = null;
    if (state?.loading) {
        content = <div> fetching posts...</div>;
    }

    if (!state?.loading && state?.error) {
        content = <div> Error in fatching posts {state?.error}</div>;
    }
    if (!state?.loading && !state?.error) {
        content = <PostList posts={state?.posts} />;
    }
    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <div className="card">
                    <div className="flex-center mb-3 gap-2 lg:gap-4">
                        <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={avatarImage}
                            alt="A"
                        />

                        <div className="flex-1">
                            <textarea
                                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                                name="post"
                                id="post"
                                placeholder="What's on your mind?"
                            ></textarea>
                        </div>
                    </div>
                </div>
                {content}
            </div>
        </main>
    );
};

export default HomePage;
