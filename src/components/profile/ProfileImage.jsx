import { useRef } from 'react';
import { actions } from '../../actions';
import editIcon from '../../assets/icons/edit.svg';
import useAxios from '../../hooks/useAxios';
import { useProfile } from '../../hooks/useProfile';
const ProfileImage = () => {
    const {
        state: { user },
        dispatch,
    } = useProfile();
    const { authorizedApi } = useAxios();

    const fileUploaderRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();

        fileUploaderRef.current.addEventListener('change', updateImageDisplay);
        fileUploaderRef.current.click();
    };

    const updateImageDisplay = async () => {
        try {
            const formData = new FormData();
            for (const file of fileUploaderRef.current.files) {
                formData.append('avatar', file);
            }

            const response = await authorizedApi.post(
                `/profile/${user?.id}/avatar`,
                formData
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };
    return (
        <div className="relative overflow-hidden mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img
                className="w-full h-full rounded-full"
                src={`${import.meta.env.VITE_BASE_URL}/${user?.avatar}`}
                alt={user?.firstName}
            />
            <form
                id="form"
                onSubmit={handleImageUpload}
                encType="multipart/form-data"
            >
                <button
                    type="submit"
                    className="flex-center absolute bottom-7 right-7 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
                >
                    <img src={editIcon} alt="Edit" />
                </button>
                <input id="file" type="file" ref={fileUploaderRef} hidden />
            </form>
        </div>
    );
};

export default ProfileImage;
