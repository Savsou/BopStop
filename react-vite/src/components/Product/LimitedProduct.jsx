// CombinedProductDisplay.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LimitedProduct.css";

function LimitedProduct() {
  const [limitedProducts, setLimitedProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/limited")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch limited products");
        }
        return res.json();
      })
      .then((data) => {
        setLimitedProducts(data.products || []);
      })
      .catch((error) => console.error("Error fetching limited products:", error));
  }, []);
    
  const calculateDaysAgo = (date) => {
    const createdDate = new Date(date);
    const now = new Date();
    const diffInTime = now - createdDate;
    return Math.floor(diffInTime / (1000 * 3600 * 24));
  };

  return (
    <div className="limited-product-row">
      <h2 className="limited-products-heading">Selling Right Now</h2>
      <div className="limited-products">
        {limitedProducts.length > 0 ? (
          limitedProducts.map((product) => (
            <div key={product.productId} className="limited-product-card">
              <Link to={`/products/${product.productId}`} className="limited-product-card-link">
                <img src={product.imageUrl} alt={product.name} className="limited-product-image" />
                <div className="limited-product-info">
                  <h3 className="limited-product-name">{product.name}</h3>
                  <p className="limited-product-artist">by {product.artistName}</p>
                  <p className="limited-product-price">Sold for ${product.price}</p>
                  <p className="limited-product-created-time">
                    {calculateDaysAgo(product.createdAt)} days ago
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default LimitedProduct;
