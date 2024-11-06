import { useEffect, useState } from "react";
import ArtistCard from "../Artist/ArtistCard";
import "./HomePage.css";

function HomePage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch artists");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Debugging log
        setArtists(data.users || []);
      })
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  return (
    <div className="homepage">
      {/* Product List or Big Four section */}
      <div className="product-list">
        <div className="big-four-container">
          <div className="big-four-main">
            <img src="/images/0037627589_171.jpg" alt="Main Image" />
            <div className="image-overlay">
              <h2 className="image-title">The Road to “American Football”</h2>
              <p className="image-description">
                October’s selection includes a soundwalk in a park in Poland,
                improvisations based on French book titles, and more.
              </p>
              <a href="#" className="cta-button">
                Learn More
              </a>
            </div>
          </div>

          <div className="big-four-stack">
            <div className="big-four-item">
              <img src="/images/0037618495_170.jpg" alt="Stacked Image 1" />
              <div className="image-overlay">
                <h2 className="image-title">The New Psychedelia</h2>
                <p className="image-description">FEATURE</p>
              </div>
            </div>
            <div className="big-four-item">
              <img src="/images/0037615351_170.jpg" alt="Stacked Image 2" />
              <div className="image-overlay">
                <h2 className="image-title">
                  The Builders: Pioneers of Musique Concrète
                </h2>
                <p className="image-description">LIST</p>
              </div>
            </div>
            <div className="big-four-item">
              <img src="/images/0037614588_170.jpg" alt="Stacked Image 3" />
              <div className="image-overlay">
                <h2 className="image-title">Bandcamp Weekly</h2>
                <p className="image-description">
                  Shigeto chats about Detroit, resilience, and making his
                  collaborative new LP.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bandcamp-stats">
          Fans have paid artists{" "}
          <span className="bold-text">$1.39 billion</span> using Bandcamp, and{" "}
          <span className="bold-text">$193 million</span> in the last year.
        </div>
      </div>

      {/* Artists List */}
      <div className="artists-list">
        {artists.length > 0 ? (
            artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
            ))
        ) : (
            <p>No artists found.</p>
        )}
        </div>
    </div>
  );
}

export default HomePage;
