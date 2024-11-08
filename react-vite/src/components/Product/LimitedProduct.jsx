// LimitedProduct.jsx
import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
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

  return (
    <div className="product-row">
      <h2 className="limited-products-heading">Selling Right Now</h2>
      <div className="limited-products">
        {limitedProducts.length > 0 ? (
          limitedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
  
}

export default LimitedProduct;
