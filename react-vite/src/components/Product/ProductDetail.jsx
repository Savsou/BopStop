import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="go-back-button">Go Back</button>
      
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-type">Type: {product.type}</p>
        {product.genre && <p className="product-genre">Genre: {product.genre}</p>}
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-dates">
          <span>Created: {product.createdAt}</span>
          <span>Last Updated: {product.updatedAt}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
