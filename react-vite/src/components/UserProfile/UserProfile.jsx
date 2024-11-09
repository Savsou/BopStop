import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RemoveProductModal from '../Product/RemoveProductModal';
import './UserProfile.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('products'); // Track the active tab
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

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

    const fetchReviews = async () => {
      try {
        const reviewResponse = await fetch('/api/reviews/current');
        const reviewData = await reviewResponse.json();
        setUser((prevUser) => ({ ...prevUser, reviews: reviewData }));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
    fetchReviews();
  }, []);

  const handleOpenModal = (productId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductIdToDelete(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setUser((prevUser) => ({
        ...prevUser,
        products: prevUser.products.filter((product) => product.productId !== productId),
      }));
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="banner" style={{ backgroundImage: `url(${user.bannerImageUrl})` }}>
        {/* <img src={user.profileImageUrl} alt={`${user.artistName}'s profile`} className="profile-image" /> */}
      </div>
      {/* Tabs */}
      {/* Tabs */}
      <div className="tabs">
        <ol className="tab-list">
          <li 
            className={`tab-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </li>
          <li 
            className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </li>
        </ol>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'products' && (
          <div className="user-products">
            {user.products && user.products.length > 0 ? (
              <div className="products-grid">
                {user.products.map((product) => (
                  <div key={product.productId} className="product-card">
                    <Link to={`/products/${product.productId}`}>
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-genre">{product.genre}</p>
                    <p className="product-price">${product.price}</p>
                    <p className="product-price">{product.description}</p>
                    <Link to={`/products/edit/${product.productId}`} className="edit-button">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleOpenModal(product.productId)} 
                      className="remove-button"
                    >
                      Remove
                      </button>
                      </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products listed.</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
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
        )}
      </div>

      {/* Remove Confirmation Modal */}
      {showModal && (
        <RemoveProductModal 
          productId={productIdToDelete} 
          onConfirm={handleDeleteProduct} 
          onCancel={handleCloseModal} 
        />
      )}

      {/* User Info */}
      {/* <div className="user-info">
        <h1 className="artist-name">{user.artistName}</h1>
        <p className="username">@{user.username}</p>
        <p className="email">{user.email}</p>
        <p className="bio">{user.bio}</p>
      </div> */}

      {/* User Products */}
      {/* <div className="user-products">
        <h2>Products</h2>
        {user.products && user.products.length > 0 ? (
          <div className="products-grid">
            {user.products.map((product) => (
              product && (
                <div key={product.productId} className="product-card">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-genre">{product.genre}</p>
                  <p className="product-price">${product.price}</p> */}
                  {/* Edit Button */}
                  {/* <Link to={`/products/edit/${product.productId}`} className="edit-button">
                    Edit
                  </Link>
                </div>
              )
            ))}
          </div>
        ) : (
          <p>No products listed.</p>
        )}
      </div> */}

      {/* User Reviews */}
      {/* User Reviews */}
      {/* <div className="reviews-section">
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
      </div> */}

    </div>
  );
};

export default ProfilePage;
