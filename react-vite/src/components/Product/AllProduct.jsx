// CombinedProductDisplay.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { thunkGetAllProducts, selectAllProductsArry } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";
import "./AllProduct.css";

function AllProduct() {
  const dispatch = useDispatch();
  const allProduct = useSelector(selectAllProductsArry)

  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  if (!allProduct) {
    return (
      <h1>Loading all products...</h1>
    )
  }

    return (
        <div className="all-product-row">
        <h2 className="all-products-heading">New and Notable</h2>
        <div className="all-products">
          {allProduct.length > 0 ? (
            allProduct.map((product) => (
              <div key={product.productId} className="all-product-card">
                <Link to={`/products/${product.productId}`} className="all-product-card-link">
                  <img src={product.imageUrl} alt={product.name} className="all-product-image" />
                  <div className="all-product-info">
                    <h3 className="all-product-name">{product.name}</h3>
                    <p className="all-product-artist">by {product.artistName}</p>
                    <p className="all-product-genre">{product.genre}</p>
                    <p className="all-product-description">{product.description}</p>
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

export default AllProduct;
