import { useEffect } from 'react';
import { actions } from '../actions';
import NewPost from '../components/posts/NewPost';
import PostList from '../components/posts/PostList';
import useAxios from '../hooks/useAxios';
import usePost from '../hooks/usePost';

const HomePage = () => {
    const { state, dispatch } = usePost();
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
    }, [authorizedApi, dispatch]);
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
                <NewPost />
                {content}
            </div>
        </main>
    );
};

export default HomePage;
