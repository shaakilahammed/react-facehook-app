import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { actions } from '../../actions';
import addPhotoIcon from '../../assets/icons/addPhoto.svg';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import usePost from '../../hooks/usePost';
import { useProfile } from '../../hooks/useProfile';
import Field from '../common/Field';

const PostEntry = ({ onCreated }) => {
    const { auth } = useAuth();
    const { dispatch } = usePost();
    const { authorizedApi } = useAxios();
    const { state: profile } = useProfile();
    const fileUploaderRef = useRef();

    const user = profile?.user ?? auth?.user;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (formData) => {
        dispatch({ type: actions.post.DATA_FETCHING });

        try {
            const response = await authorizedApi.post(`/posts`, { formData });

            if (response.status === 200) {
                dispatch({
                    type: actions.post.DATA_CREATED,
                    data: response.data,
                });
                // Close this UI
                onCreated();
            }
        } catch (error) {
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: error?.message,
            });
        }
    };

    const handleFileUpload = () => {
        // fileUploaderRef.current.addEventListener('change', updateImageDisplay);
        fileUploaderRef.current.click();
    };
    return (
        <div className="card relative">
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                Create Post
            </h6>

            <form
                onSubmit={handleSubmit(submitHandler)}
                encType="multipart/form-data"
            >
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_BASE_URL}/${
                                user?.avatar
                            }`}
                            alt="A"
                        />
                        <div>
                            <h6 className="text-lg lg:text-xl">
                                {user?.firstName} {user?.lastName}{' '}
                            </h6>

                            <span className="text-sm text-gray-400 lg:text-base">
                                Public
                            </span>
                        </div>
                    </div>

                    <label
                        className="btn-primary cursor-pointer !text-gray-100"
                        htmlFor="image"
                        onClick={handleFileUpload}
                    >
                        <img src={addPhotoIcon} alt="Add" />
                        Add Photo
                    </label>
                    <input
                        {...register('image')}
                        ref={fileUploaderRef}
                        type="file"
                        name="image"
                        id="image"
                        className="hidden"
                    />
                </div>
                {/* <!-- Post Text Input --> */}
                <Field label="" error={errors.content}>
                    <textarea
                        {...register('content', {
                            required: 'Adding some text is mandatory!',
                        })}
                        name="content"
                        id="content"
                        placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
                    ></textarea>
                </Field>

                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button
                        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEntry;
