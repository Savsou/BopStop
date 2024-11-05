import { useEffect, useState } from 'react';

const EditUser = () => {
    const [artistName, setArtistName] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/users/session');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                const { artistName, bio, profileImageUrl, bannerImageUrl } = data;
                setArtistName(artistName);
                setBio(bio);
                setProfileImage(profileImageUrl);
                setBannerImage(bannerImageUrl);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('artistName', artistName);
        formData.append('bio', bio);
        if (profileImage) {
            formData.append('profileImageUrl', profileImage);
        }
        if (bannerImage) {
            formData.append('bannerImageUrl', bannerImage);
        }

        try {
            const response = await fetch('/api/users/session', {
                method: 'PUT',
                // headers: {
                //     'Content-Type' is automatically set when using FormData
                // },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData.errors || { server: 'Failed to update profile' });
            } else {
                const result = await response.json();
                console.log(result.message);
                setErrors({});
            }

        } catch (error) {
            setErrors({ server: error.message });
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {errors.server && <div className="error">{errors.server}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Artist Name:</label>
                    <input
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        required
                    />
                    {errors.artistName && <p className="error">{errors.artistName}</p>}
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    {errors.bio && <p className="error">{errors.bio}</p>}
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                    {errors.profileImageUrl && <p className="error">{errors.profileImageUrl}</p>}
                </div>
                <div>
                    <label>Banner Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBannerImage(e.target.files[0])}
                    />
                    {errors.bannerImageUrl && <p className="error">{errors.bannerImageUrl}</p>}
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditUser;
