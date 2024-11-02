import React, { useState } from "react";
import "./AddProduct.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      type,
      genre,
      price,
      description,
      imageUrl,
    };

    try {
      const response = await fetch("/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Product added successfully!");
        // Clear the form or redirect as needed
        setName("");
        setType("");
        setGenre("");
        setPrice("");
        setDescription("");
        setImageUrl("");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="container">
      <h2 className="header">Add a New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </label>
        <label className="label">
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="input"
          />
        </label>
        <label className="label">
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="input"
          />
        </label>
        <label className="label">
          Price:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="input"
          />
        </label>
        <label className="label">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input textarea"
          />
        </label>
        <label className="label">
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="input"
          />
        </label>
        <button type="submit" className="button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
