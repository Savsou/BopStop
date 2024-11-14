import React, { useState } from "react";
import { thunkAddProduct } from "../../redux/products_pristine";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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
  // const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionUser) {
      setErrors({});

      // const newProduct = {
      //   name,
      //   type,
      //   genre,
      //   price,
      //   description,
      //   imageUrl: image,
      // };

      const formData = new FormData()
      formData.append("name", name);
      formData.append("type", type);
      formData.append("genre", genre);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("imageUrl", imageUrl);

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // const serverResponse = await dispatch(
      //   thunkAddProduct(newProduct)
      // )

      const serverResponse = await dispatch(thunkAddProduct(formData))

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        setName("");
        setType("");
        setGenre("");
        setPrice("");
        setDescription("");
        setImageUrl(null);
        alert("Product added successfuly")
        navigate(`/profile/${sessionUser.id}`);
      }
    }

    // Tiff's work without redux thunk
    // const newProduct = {
    //   name,
    //   type,
    //   genre,
    //   price,
    //   description,
    //   imageUrl,
    // };

    // try {
    //   const response = await fetch("/api/products/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newProduct),
    //   });

    //   if (response.ok) {
    //     setMessage("Product added successfully!");
    //     setName("");
    //     setType("");
    //     setGenre("");
    //     setPrice("");
    //     setDescription("");
    //     setImageUrl("");
    //   } else {
    //     const error = await response.json();
    //     if (error?.errors) {
    //       setErrors(error.errors);
    //     }
    //     setMessage(error.message || "Failed to add product.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   setMessage("An error occurred.");
    // }
  };

  return (
    <div className="container">
      <div className="album"></div>
      <div className="product">
      {/* <h2 className="header">Add a New Product</h2> */}
      {/* {message && <p>{message}</p>} */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="label name">
          {/* Name: */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
            className="input name"
          />
          </label>
          {errors.name && <p>{errors.name}</p>}
        <label className="label price">
            price:
          </label>
          <label className="label us-dollars">
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            // required
            className="input price"
            />
            US Dollars
          </label>
          {errors.price && <p>{errors.price}</p>}
        <label className="label description">
            description:
            </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // required
            className="input textarea description"
          />
          {errors.description && <p>{errors.description}</p>} 
          <div className="upload">
          <label className="label imageurl">
          {/* Image URL: */}
          <input
            type="file"
            accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])}
              style={{ display: "none" }}
            // required
            className="input imageurl"
            />
            <label htmlFor="file-upload" className="upload-button">
            Upload Album Art
              </label>
              <p className="upload-notes"><br></br>1400 x 1400 pixels minimum<br></br>
                (bigger is better)</p>
              <p className="upload-notes"><br></br>.jpg, .gif or .png, 10MB max</p>
          </label>
          </div>
        {errors.imageUrl && <p>{errors.imageUrl}</p>}  
        <label className="label type">
          Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            // required
            className="input type"
          >
            <option value="">Select...</option>
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
        </label>
        {errors.type && <p>{errors.type}</p>}
        <label className="label genre">
          Genre:
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="input genre"
          >
            <option value="">Select...</option>
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
          </label>
          {errors.genre && <p>{errors.genre}</p>}
        <button type="submit" className="button submit">
          Add Product
        </button>
      </form>
      </div>
    </div>
  );
}

export default AddProduct;
