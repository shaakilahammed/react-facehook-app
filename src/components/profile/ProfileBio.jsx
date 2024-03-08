import editIcon from '../../assets/icons/edit.svg';
const ProfileBio = ({ bio }) => {
    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
            </div>
            {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
            <button className="flex-center h-7 w-7 rounded-full">
                <img src={editIcon} alt="Edit" />
            </button>
        </div>
    );
};

export default ProfileBio;
