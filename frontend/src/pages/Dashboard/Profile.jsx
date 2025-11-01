function Profile() {
    const user = {
        name: "Dr. John Doe",
        email: "john@medpublish.com",
        bio: "Dentist & AI researcher passionate about innovation in healthcare.",
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-4 text-gray-700">{user.bio}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Edit Profile</button>
        </div>
    );
}

export default Profile;
