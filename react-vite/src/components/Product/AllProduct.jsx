// CombinedProductDisplay.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllProduct.css";

function AllProduct() {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    fetch("/api/products/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch all products");
        }
        return res.json();
      })
      .then((data) => {
        setAllProduct(data.products || []);
      })
      .catch((error) => console.error("Error fetching all products:", error));
  }, []);

    return (
    <div className="all-product-row">
      <h2 className="all-products-heading">New and Notable</h2>
      <div className="all-products">
        {allProduct.length > 0 ? (
          allProduct.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="all-product-card">
      <Link to={`/products/${product.productId}`} className="all-product-card-link">
        <img src={product.imageUrl} alt={product.name} className="all-product-image" />
        <div className="all-product-info">
          <h3 className="all-product-name">{product.name}</h3>
          <p className="all-product-artist">by {product.userId}</p>
          <p className="all-product-genre">{product.genre}</p>
          <p className="all-product-description">{product.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default AllProduct;
