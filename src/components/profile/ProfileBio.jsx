import { useState } from 'react';
import { actions } from '../../actions';
import checkIcon from '../../assets/icons/check.svg';
import closeIcon from '../../assets/icons/close.svg';
import editIcon from '../../assets/icons/edit.svg';
import useAxios from '../../hooks/useAxios';
import { useProfile } from '../../hooks/useProfile';
const ProfileBio = () => {
    const {
        state: { user },
        dispatch,
    } = useProfile();
    const { authorizedApi } = useAxios();
    const [editMode, setEditMode] = useState(false);
    const [bio, setBio] = useState(user?.bio);
    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        try {
            const response = await authorizedApi.patch(`/profile/${user?.id}`, {
                bio,
            });

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data,
                });
            }
            setEditMode(false);
        } catch (err) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: err.message,
            });
        }
    };
    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {!editMode ? (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {user?.bio}
                    </p>
                ) : (
                    <textarea
                        className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
                        value={bio}
                        rows={4}
                        cols={55}
                        onChange={(e) => setBio(e.target.value)}
                    />
                )}
            </div>
            {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
            {!editMode ? (
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    onClick={() => setEditMode(true)}
                >
                    <img src={editIcon} alt="Edit" />
                </button>
            ) : (
                <div className="flex flex-col justify-between">
                    <button
                        className="flex-center h-7 w-7 rounded-full"
                        onClick={handleBioEdit}
                    >
                        <img src={checkIcon} alt="Check" />
                    </button>
                    <button
                        className="flex-center h-7 w-7 rounded-full"
                        onClick={() => setEditMode(false)}
                    >
                        <img src={closeIcon} alt="Check" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileBio;
