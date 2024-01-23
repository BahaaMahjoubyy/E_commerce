// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function Home() {
  const [data, setData] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
    available: '',
    imageUrl: '',
  });

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (productId) => {
    try {
      // Replace the URL with the actual endpoint for deleting a product
      await axios.delete(`http://localhost:8080/products/${productId}`);
      // After successful deletion, update the local state to reflect the changes
      setData((prevData) => prevData.filter(item => item.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (productId) => {
    // Set the productId to indicate that update mode is active
    setEditingProductId(productId);

    // Set the initial values for the edited product
    const productToEdit = data.find(item => item.id === productId);
    setEditedProduct(productToEdit);
  };

  const handleUpdateSubmit = async (productId) => {
    try {
      // Replace the URL with the actual endpoint for updating a product
      await axios.put(`http://localhost:8080/products/${productId}`, editedProduct);
      // After successful update, reset editing mode and update the local state to reflect the changes
      setEditingProductId(null);
      setData((prevData) =>
        prevData.map(item =>
          item.id === productId ? { ...item, ...editedProduct } : item
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFavorite = async (productId) => {
    try {
      // Replace the URL with the actual endpoint for updating the favorite status
      await axios.put(`http://localhost:8080/products/${productId}/favorite`);
      // After successful update, toggle the favorite status in the local state
      setData((prevData) =>
        prevData.map(item =>
          item.id === productId ? { ...item, favorite: !item.favorite } : item
        )
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="home-container">
      {data.map((item) => (
        <div key={item.id} className="product-item">
          {editingProductId === item.id ? (
            // Render input fields for editing when update button is clicked
            <>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="type"
                value={editedProduct.type}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="available"
                value={editedProduct.available}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="imageUrl"
                value={editedProduct.imageUrl}
                onChange={handleInputChange}
              />
              <button onClick={() => handleUpdateSubmit(item.id)}>Submit</button>
            </>
          ) : (
            // Render product details when not in editing mode
            <>
              <img src={item.imageUrl} alt={item.name} className="product-image" />
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">Price: ${item.price}</p>
              <p className="product-availability">
                Available: {item.available ? 'Available' : 'Not available yet'}
              </p>

              {/* Buttons for actions */}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => handleUpdate(item.id)}>Update</button>
              <button>add to cart</button>
              <button onClick={() => handleFavorite(item.id)}>
                {item.favorite ? 'Unfavorite' : 'Favorite'}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
