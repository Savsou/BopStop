// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.productId}`}>
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-genre">{product.genre}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
