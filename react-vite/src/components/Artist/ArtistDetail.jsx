// ArtistDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import "./ArtistDetail.css";
import "../Product/ProductCard.css";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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

  if (!artist) return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

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
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p>No products found for this artist.</p>
        )}
      </div>
    </div>
  );
}

export default ArtistDetail;
