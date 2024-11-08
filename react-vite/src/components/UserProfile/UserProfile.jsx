import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';
import "../Product/ProductCard.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/session');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="banner" style={{ backgroundImage: `url(${user.bannerImageUrl})` }}>
        <img src={user.profileImageUrl} alt={`${user.artistName}'s profile`} className="profile-image" />
      </div>

      {/* User Info */}
      <div className="user-info">
        <h1 className="artist-name">{user.artistName}</h1>
        <p className="username">@{user.username}</p>
        <p className="email">{user.email}</p>
        <p className="bio">{user.bio}</p>
      </div>

      {/* User Products */}
      <div className="user-products">
        <h2>Products</h2>
        {user.products && user.products.length > 0 ? (
          <div className="products-grid">
            {user.products.map((product) => (
              product && (
                <div key={product.productId} className="product-card">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-genre">{product.genre}</p>
                  <p className="product-price">${product.price}</p>
                  {/* Edit Button */}
                  <Link to={`/products/edit/${product.productId}`} className="edit-button">
                    Edit
                  </Link>
                </div>
              )
            ))}
          </div>
        ) : (
          <p>No products listed.</p>
        )}
      </div>

      {/* User Reviews */}
      {/* User Reviews */}
<div className="reviews-section">
  <h2>Reviews</h2>
  {user.reviews && user.reviews.length > 0 ? (
    user.reviews.map((review) => (
      <div key={review.id} className="review-item">
        <p><strong>Product:</strong> {review.productName}</p>
        <p><strong>Review:</strong> {review.content}</p>
        <p className="review-date">
          <small>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</small>
        </p>
      </div>
    ))
  ) : (
    <p>No reviews available.</p>
  )}
</div>

    </div>
  );
};

export default ProfilePage;
