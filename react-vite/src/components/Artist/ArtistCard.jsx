import { Link } from "react-router-dom";
import "./ArtistCard.css";

function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <Link to={`/artist/${artist.id}`}>
        <div
          className="banner"
          style={{ backgroundImage: `url(${artist.bannerImageUrl})` }}
        ></div>
        <div className="profile-section">
          <img
            src={artist.profileImageUrl}
            alt={`${artist.artistName}'s profile`}
            className="profile-image"
          />
          <h3 className="artist-name">{artist.artistName}</h3>
          <p className="artist-bio">{artist.bio}</p>
        </div>
        <div className="details">
          <p className="username">@{artist.username}</p>
          <p className="email">{artist.email}</p>
          <p className="created-at">
            Joined: {new Date(artist.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}


export default ArtistCard;
