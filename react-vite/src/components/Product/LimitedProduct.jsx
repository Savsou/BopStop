// CombinedProductDisplay.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { thunkGetLimitedProducts, selectLtdProductsArry } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";
import "./LimitedProduct.css";

function LimitedProduct() {
  const dispatch = useDispatch();
  const limitedProducts = useSelector(selectLtdProductsArry)

  useEffect(() => {
    dispatch(thunkGetLimitedProducts());
  }, [dispatch]);

  if (!limitedProducts) {
    return (
      <h1>Loading first 20 products...</h1>
    )
  }

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
