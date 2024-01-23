// Create.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function Create() {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    type: '',
    available: false,
    imageUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      // Assuming your backend endpoint for adding products is "/products"
      const response = await axios.post('http://localhost:8080/products', product);
      console.log('Product added successfully:', response.data);
      // Reset the form or perform any other actions after successful addition
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="create-container">
      <h2>Add a New Product</h2>
      <form className="create-form">
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className="form-input"
        />

        <label className="form-label">Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          className="form-input"
        />

        <label className="form-label">Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="form-input"
        />

        <label className="form-label">Type:</label>
        <input
          type="text"
          name="type"
          value={product.type}
          onChange={handleInputChange}
          className="form-input"
        />

        <label className="form-label">Available:</label>
        <input
          type="checkbox"
          name="available"
          checked={product.available}
          onChange={() =>
            setProduct((prevProduct) => ({ ...prevProduct, available: !prevProduct.available }))
          }
        />

        <label className="form-label">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleInputChange}
          className="form-input"
        />

        <button type="button" onClick={handleAddProduct} className="form-button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Create;
