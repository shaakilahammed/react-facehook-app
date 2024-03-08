import { FETCH_DATA } from '../actions';
export const initialState = {
    isLoading: false,
    data: {},
    isError: false,
    error: '',
};
const fetchDataReducer = (state, action) => {
    switch (action.type) {
        case FETCH_DATA.LOADING: {
            return { ...state, isLoading: true, isError: false };
        }
        case FETCH_DATA.SUCCESS: {
            return { ...state, isLoading: false, data: action.data };
        }
        case FETCH_DATA.ERROR: {
            return {
                isLoading: false,
                data: {},
                isError: true,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
};

export default fetchDataReducer;
