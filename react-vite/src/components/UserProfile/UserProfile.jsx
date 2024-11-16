import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RemoveProductModal from '../Product/RemoveProductModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../Product/ProductDetail.css';
import './UserProfile.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
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

    fetchUser();
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="product-detail-page">
      {/* Banner Section */}
      {user?.bannerImageUrl && (
        <div
          className="banner"
          style={{ backgroundImage: `url(${user.bannerImageUrl})` }}
        />
      )}
      {/* Product List */}
        {user.products && user.products.length > 0 ? (
          user.products.map((product) => (
            <div key={product.productId} className="product-detail">

              {/* Product Column */}
              <div className="product-column">
              <Link to={`/products/${product.productId}`} className="product-name-link">
                  <h2 className="product-name">{product.name}</h2>
                  </Link>
                {/* <p className="product-artist">by {product.artistName}</p> */}
                <div className="product-meta">
                  <div className="product-info-column">
                    <p className="product-type">{product.type}</p>
                    {product.genre && <p className="product-genre">{product.genre}</p>}
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-created-time">Released {formatDate(product.createdAt)}</p>
                    <Link to={`/products/edit/${product.productId}`} className="product-detail-button">
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </Link>
                    <button
                      onClick={() => handleOpenModal(product.productId)}
                      className="product-detail-button"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Remove
                    </button>
                  </div>
                  <div className="product-image-column">
                    <img src={product.imageUrl} alt={product.name} className="product-image-big" />
                  </div>
                </div>
              </div>

              {/* Artist Column */}
              <div className="artist-column">
              <img src={user.profileImageUrl} alt={`${user.artistName}'s profile`} className="profile-image-small" />
                <p className="product-artist">{product.artistName}</p>
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <p className="product-name">{product.name}</p>
                <p className="product-created-time">{formatDate(product.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products listed.</p>
        )}

      {/* Modals */}
      {showModal && (
        <RemoveProductModal
          productId={productIdToDelete}
          onConfirm={handleDeleteProduct}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProfilePage;
