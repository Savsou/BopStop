import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import "./ArtistDetail.css";

function ArtistDetail() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch artist details
    fetch(`/api/users/${artistId}`)
      .then((res) => res.json())
      .then((data) => {
        setArtist(data);
      })
      .catch((error) => console.error("Error fetching artist:", error));

    // Fetch products for the artist
    fetch(`/api/products?userId=${artistId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [artistId]);

  if (!artist) return <p>Loading artist details...</p>;

  return (
    <div className="artist-detail">
      <h2>{artist.artistName}</h2>
      <p>{artist.bio}</p>
      <div className="products-list">
        {artist.products.length > 0 ? (
          artist.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found for this artist.</p>
        )}
      </div>
    </div>
  );
}

export default ArtistDetail;
