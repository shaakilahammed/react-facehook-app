import { useReducer } from 'react';
import { ProfileContext } from '../contexts';
import profileReducer, { initialState } from '../reducers/profileReducer';

const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initialState);

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
