import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkEditProduct, thunkGetProductById } from "../../redux/products_pristine";
import "./EditProduct.css";

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const currentProduct = useSelector((state) => state.products.currentProduct)
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await dispatch(thunkGetProductById(productId));
      // console.log(`Testing currentProduct from state: ${JSON.stringify(currentProduct)}`)
      // console.log(`Testing thunkGetProductById: ${JSON.stringify(productData)}`)
      if (productData) {
        setName(productData.name);
        setType(productData.type);
        setGenre(productData.genre);
        setPrice(productData.price);
        setDescription(productData.description);
        setImageUrl(productData.imageUrl);
      } else {
        navigate("/not-found");
      }
    };

    fetchProduct();
  }, [dispatch, productId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionUser) {
      setErrors({});

      // const updatedProduct = {
      //   id: productId,
      //   name,
      //   type,
      //   genre,
      //   price,
      //   description,
      //   imageUrl,
      // };

      // console.log(`Testing updated product data: ${JSON.stringify(updatedProduct)}`)

      const formData = new FormData()
      formData.append("id", productId)
      formData.append("name", name)
      formData.append("type", type)
      formData.append("genre", genre)
      formData.append("price", price)
      formData.append("description", description)
      formData.append("imageUrl", imageUrl)

      try {
        const serverResponse = await dispatch(
          // thunkEditProduct(updatedProduct)
          thunkEditProduct(formData)
        );

        if (serverResponse) {
          setErrors(serverResponse);
        } else {
          // navigate(`/products/${productId}`);
            alert("Product updated successfuly")
            navigate(`/profile/${sessionUser.id}`);
        }
      } catch (error) {
        setErrors({ server: error.message });
        console.error("thunkEditProduct not working:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="header">Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
        <label className="label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}

        <label className="label">
          Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            <option value="">Select...</option>
            <option value="music">--- Music ---</option>
            <option value="cd">Compact Disc (CD)</option>
            <option value="cassette">Cassette</option>
            <option value="vinyl_lp">Vinyl LP</option>
            <option value="double_vinyl_lp">2 x Vinyl LP</option>
            <option value="vinyl_7">7" Vinyl</option>
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
        {errors.type && <p className="error">{errors.type}</p>}

        <label className="label">
          Genre:
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="input"
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
        {errors.genre && <p className="error">{errors.genre}</p>}

        <label className="label">
          Price:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            className="input"
          />
        </label>
        {errors.price && <p className="error">{errors.price}</p>}

        <label className="label">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input textarea"
          />
        </label>
        {errors.description && <p className="error">{errors.description}</p>}

        <label className="label">
          Image URL:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageUrl(e.target.files[0])}
            className="input"
          />
        </label>
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}

        <button type="submit" className="button">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
