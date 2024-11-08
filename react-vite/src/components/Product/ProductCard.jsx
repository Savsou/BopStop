import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.productId}`} className="product-card-link">
        <img src={product.imageUrl} alt={product.name} className="card-product-image" />
        <div className="card-product-info">
          <h3 className="card-product-name">{product.name}</h3>
          <p className="card-product-artist">by {product.artistName}</p>
          <p className="card-product-price">Sold for ${product.price}</p>
          <p className="card-product-created-time">
            {calculateDaysAgo(product.createdAt)} days ago
          </p>
        </div>
      </Link>
    </div>
  );
}

function calculateDaysAgo(date) {
  const createdDate = new Date(date);
  const now = new Date();
  const diffInTime = now - createdDate;
  return Math.floor(diffInTime / (1000 * 3600 * 24));
}

export default ProductCard;
