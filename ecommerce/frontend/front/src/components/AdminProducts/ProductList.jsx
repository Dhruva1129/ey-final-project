import React, { useState, useEffect } from "react";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    customId: "",
    name: "",
    description: "",
    price: "",
  });

  
  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:5000/adddelete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data); 
      } else {
        console.error("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
  const deleteProduct = async (customId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://localhost:5000/adddelete/delete/${customId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message); 
        fetchProducts(); 
      } else {
        const errorData = await response.json();
        alert(errorData.message); 
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  
  const handleUpdate = (product) => {
    setIsUpdating(true);
    setUpdatedProduct({
      customId: product.customId,
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://localhost:5000/adddelete/update/${updatedProduct.customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setIsUpdating(false);
        fetchProducts(); 
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  return (
    <div className="product-list">
      <h2 className="product-list-title">Product List</h2>
      <ul className="product-list-items">
        {products.map((product) => (
          <li key={product.customId} className="product-list-item">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <h4 className="product-price">₹{product.price}</h4>
              <div className="product-actions">
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product.customId)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => handleUpdate(product)}
                >
                  Update
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isUpdating && (
        <div className="update-modal">
          <h2>Update Product</h2>
          <form onSubmit={updateProduct}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setIsUpdating(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductList;
