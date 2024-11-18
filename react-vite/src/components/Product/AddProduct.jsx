import { useState, useRef } from "react";
import { thunkAddProduct } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../context/ConfirmationModal";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionUser) {
      setErrors({});

      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("genre", genre);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("imageUrl", imageUrl);

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const serverResponse = await dispatch(thunkAddProduct(formData));

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        setShowConfirmModal(true);
        setName("");
        setType("");
        setGenre("");
        setPrice("");
        setDescription("");
        setImageUrl(null);
      }
    }
  };

  return (
    <div className="container-add-product">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-product-form">
        <div className="product">
        <h2 className="header">Add a New Product</h2>
          <label className="label name">
            {/* took out name to match bandcamp's styling */}
            {/* Name: */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="input name"
            />
          </label>
          {errors.name && <p className="error-message">{errors.name}</p>}
          <label className="label price">price:</label>
          <label className="label us-dollars">
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0.01"
              className="input price"
            />
            US Dollars
          </label>
          {errors.price && <p className="error-message">{errors.price}</p>}
          <label className="label description">description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="(Description here)"
            className="input textarea description"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
          <div
            className="upload"
            onClick={handleDivClick}
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <label className="label imageurl">
              <div className="upload-button">Upload Product Image</div>
              <p className="upload-notes">
                <br></br>
                1400 x 1400 pixels minimum <br></br>(bigger is better)
              </p>
              <p className="upload-notes">
                <br></br>
                .jpg, .gif, or .png, 10MB max
              </p>
            </label>
          </div>
          {errors.imageUrl && <p className="error-message">{errors.imageUrl}</p>}
          <label className="label type">type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input type"
            style={{ color: type === "" ? "#AAA" : "#333" }}
          >
            <option value="">(Type)</option>
            <option value="music">--- Music ---</option>
            <option value="cd">Compact Disc (CD)</option>
            <option value="cassette">Cassette</option>
            <option value="vinyl_lp">Vinyl LP</option>
            <option value="double_vinyl_lp">2 x Vinyl LP</option>
            <option value="vinyl_7">7&quot; Vinyl</option>
            <option value="vinyl_box_set">Vinyl Box Set</option>
            <option value="other_vinyl">Other Vinyl</option>
            <option value="apparel">--- Apparel ---</option>
            <option value="t_shirt">T-Shirt/Shirt</option>
            <option value="sweater_hoodie">Sweater/Hoodie</option>
            <option value="hat">Hat</option>
            <option value="other_apparel">Other Apparel</option>
            <option value="miscellaneous">--- Miscellaneous ---</option>
            <option value="dvd">DVD</option>
            <option value="usb_flash_drive">USB Flash Drive</option>
            <option value="sheet_music">Sheet Music</option>
            <option value="poster_print">Poster/Print</option>
            <option value="ticket">Ticket</option>
            <option value="book_magazine">Book/Magazine</option>
            <option value="button_pin_patch">Button/Pin/Patch</option>
            <option value="bag">Bag</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="error-message">{errors.type}</p>}
          <label className="label genre">genre:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="input genre"
            style={{ color: genre === "" ? "#AAA" : "#333" }}
          >
            <option value="">(Optional)</option>
            <option value="electronic">Electronic</option>
            <option value="metal">Metal</option>
            <option value="rock">Rock</option>
            <option value="alternative">Alternative</option>
            <option value="hip_hop_rap">Hip-Hop/Rap</option>
            <option value="experimental">Experimental</option>
            <option value="punk">Punk</option>
            <option value="pop">Pop</option>
            <option value="ambient">Ambient</option>
          </select>
          {errors.genre && <p className="error-message">{errors.genre}</p>}
          <div className="ctas">
            <button type="submit" className="button submit">
              Add Product
            </button>
            <button
              type="button"
              className="button cancel"
              onClick={handleCancel}
            >
              cancel
            </button>
          </div>
        </div>
      </form>

      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => {
            setShowConfirmModal(false)
            navigate(`/profile/${sessionUser.id}`);
          }}
          message={"You have added this product!"}
        />
      )};
    </div>
  );
}

export default AddProduct;
