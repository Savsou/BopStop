import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../context/ConfirmationModal";
import "./EditUser.css";

const EditUser = () => {
  const navigate = useNavigate();
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [errors, setErrors] = useState({});
  const profileImageRef = useRef(null);
  const bannerImageRef = useRef(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/session");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
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

  const handleProfileImageClick = () => {
    profileImageRef.current.click();
  };

  const handleBannerImageClick = () => {
    bannerImageRef.current.click();
  };

  const handleProfileFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleBannerFileChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("artistName", artistName);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImageUrl", profileImage);
    }
    if (bannerImage) {
      formData.append("bannerImageUrl", bannerImage);
    }

    try {
      const response = await fetch("/api/users/session", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || { server: "Failed to update profile" });
      } else {
        setShowConfirmModal(true)
        setErrors({});
      }
    } catch (error) {
      setErrors({ server: error.message });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container-editUser">
      {errors.server && <div className="error">{errors.server}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-profile-form">
        <div className="uploadbannerimage" onClick={handleBannerImageClick} style={{ cursor: "pointer" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerFileChange}
            ref={bannerImageRef}
            className="input bannerurl"
            style={{ display: "none" }}
          />
          <label className="label bannerurl">
            <div className="uploadbannerimage-button">
              <FontAwesomeIcon icon={faCamera} className="nav-icon" />
              set banner image
            </div>
          </label>
          {errors.bannerImageUrl && <p className="error">{errors.bannerImageUrl}</p>}
        </div>
        <div className="profile">
          <div className="pic-column">
            <div className="upload" onClick={handleProfileImageClick} style={{ cursor: "pointer" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileFileChange}
                ref={profileImageRef}
                className="input profileimage"
                style={{ display: "none" }}
              />
              <label className="label profileimage">
                <FontAwesomeIcon icon={faCamera} className="nav-icon" />
              </label>
              <label className="profileimage-notes">
                <p className="notes">jpg, gif or png</p>
                <p className="notes">480px min – 4MB max</p>
              </label>
              {errors.profileImageUrl && <p className="error">{errors.profileImageUrl}</p>}
            </div>
          </div>
          <div className="info-column">
            <label className="label name">your name</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
              className="input yourname"
            />
            {errors.artistName && <p className="error">{errors.artistName}</p>}
            <div>
              <label className="label bio">about you</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input textarea bio"
              />
              {errors.bio && <p className="error">{errors.bio}</p>}
            </div>
            <div className="ctas-editprofile">
              <button type="submit" className="button editprofile">
                SAVE CHANGES
              </button>
              <button type="button" className="button cancel-editprofile" onClick={handleCancel}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </form>

      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => {
            setShowConfirmModal(false)
            navigate(`/profile/${sessionUser.id}`);
          }}
          message={"You have edited your profile!"}
        />
      )};
    </div>
  );
};

export default EditUser;
