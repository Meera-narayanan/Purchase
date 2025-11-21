
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create({ addProduct }) {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.title || !product.price || !product.description) {
      setError("Please fill all required fields");
      return;
    }

    let imageUrl = product.image;
    if (!imageUrl) {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const randomProduct = data[Math.floor(Math.random() * data.length)];
        imageUrl = randomProduct.image;
      } catch {
        imageUrl = ""; 
      }
    }

    addProduct({ ...product, image: imageUrl, id: Date.now() });

    alert("Product Created Successfully!");
    navigate("/");
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Product</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="title"
          placeholder="Product Name *"
          value={product.title}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price *"
          value={product.price}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
          required
        />

        <textarea
          name="description"
          placeholder="Description *"
          value={product.description}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            minHeight: "100px",
            resize: "vertical"
          }}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (Optional)"
          value={product.image}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px"
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default Create;
