import editIcon from '../../assets/icons/edit.svg';
const ProfileImage = ({ firstName, avatar }) => {
    return (
        <div className="relative overflow-hidden mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img
                className="w-full h-full rounded-full"
                src={`${import.meta.env.VITE_BASE_URL}/${avatar}`}
                alt={firstName}
            />

            <button className="flex-center absolute bottom-7 right-7 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
                <img src={editIcon} alt="Edit" />
            </button>
        </div>
    );
};

export default ProfileImage;
