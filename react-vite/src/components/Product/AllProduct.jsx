// AllProducts.jsx
import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
import "./AllProduct.css";

function AllProduct() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch all products");
        }
        return res.json();
      })
      .then((data) => {
        setAllProducts(data.products || []);
      })
      .catch((error) => console.error("Error fetching all products:", error));
  }, []);

  return (
    <div className="all-products-section">
      <h2>All Products</h2>
      <div className="all-products-grid">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default AllProduct;
