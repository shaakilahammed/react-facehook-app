import { useContext } from 'react';
import { PostContext } from '../contexts';

const usePost = () => {
    return useContext(PostContext);
};

export default usePost;
