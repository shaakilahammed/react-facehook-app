const Comment = () => {
    return (
        <div className="flex items-center gap-3 pt-4">
            <img
                className="max-w-6 max-h-6 rounded-full"
                src="./assets/images/avatars/avatar_2.png"
                alt="avatar"
            />
            <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                    <span>Tapas Adhikari: </span>
                    <span>Great Sumit Saha dada ❤</span>
                </div>
            </div>
        </div>
    );
};

export default Comment;
