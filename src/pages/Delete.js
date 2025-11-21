import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Delete({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Product find
  useEffect(() => {
    const prod = products.find((p) => p.id === parseInt(id));
    setProduct(prod);
  }, [id, products]);

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== parseInt(id)));
    alert("Product deleted successfully!");
    navigate("/");
  };

  const handleCancel = () => {
    navigate(`/product/${id}`);
  };

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Product not found.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Confirm Delete</h2>
      <p>
        Are you sure you want to delete
        <strong> "{product.title}"</strong>?
      </p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleDelete}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>

        <button
          onClick={handleCancel}
          style={{
            padding: "10px 20px",
            background: "gray",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Delete;
