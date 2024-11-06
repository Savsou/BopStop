// ArtistDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import "./ArtistDetail.css";

function ArtistDetail() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch artist details
    fetch(`/api/users/${artistId}`)
      .then((res) => res.json())
      .then((data) => setArtist(data))
      .catch((error) => console.error("Error fetching artist:", error));

    // Fetch products for the artist
    fetch(`/api/products?userId=${artistId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((error) => console.error("Error fetching products:", error));
  }, [artistId]);

  if (!artist) return <p>Loading artist details...</p>;

  return (
    <div className="artist-detail">
      {/* Go Back Button */}
      <button onClick={() => navigate(-1)} className="go-back-button">
        Go Back
      </button>
      
      {/* Artist Information */}
      <h2>{artist.artistName}</h2>
      <p>{artist.bio}</p>

      {/* Products List */}
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.productId} to={`/products/${product.productId}`} className="product-link">
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <p>No products found for this artist.</p>
        )}
      </div>
    </div>
  );
}

export default ArtistDetail;
