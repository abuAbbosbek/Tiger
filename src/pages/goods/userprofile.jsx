const UserProfile = ({ avatarUrl, email, name, className = "" }) => {
    return (
        <div className={`flex items-center p-4 bg-gray-800 ${className}`}>
            <img
                src={avatarUrl}
                alt='User Avatar'
                className='w-10 h-10 rounded-full mr-3'
            />
            <div>
                <p className='text-white font-bold'>{name}</p>
                <p className='text-gray-400 text-sm'>{email}</p>
            </div>
        </div>
    );
};

export default UserProfile;