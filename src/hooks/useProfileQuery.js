import { useEffect, useReducer } from 'react';
import { FETCH_DATA } from '../actions';
import fetchDataReducer, { initialState } from '../reducers/fetchDataReducer';
import useAxios from './useAxios';

const useProfileQuery = (userId) => {
    const [state, dispatch] = useReducer(fetchDataReducer, initialState);
    const { authorizedApi } = useAxios();

    useEffect(() => {
        dispatch({ type: FETCH_DATA.LOADING });
        const fetchProfile = async () => {
            try {
                const response = await authorizedApi.get(`/profile/${userId}`);

                dispatch({ type: FETCH_DATA.SUCCESS, data: response?.data });
            } catch (error) {
                dispatch({ type: FETCH_DATA.ERROR, error: error?.message });
            }
        };
        fetchProfile();
    }, [authorizedApi, userId]);

    return state;
};

export default useProfileQuery;
