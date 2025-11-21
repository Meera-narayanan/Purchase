import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function Product({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Product find 
  useEffect(() => {
    const prod = products.find((p) => p.id === parseInt(id));
    setProduct(prod);
    setLoading(false);
  }, [id, products]);

  // Loading
  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading product...</h2>;
  }

  // Error message
  if (!product) {
    return <h2 style={{ padding: "20px", color: "red" }}>Product not found.</h2>;
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          background: "#007bff",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />

        
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "10px" }}>{product.title}</h1>

          <h2
            style={{
              color: "green",
              marginBottom: "15px",
              fontSize: "24px",
            }}
          >
            ₹ {product.price}
          </h2>

          <p
            style={{
              lineHeight: "1.6",
              fontSize: "16px",
              color: "#444",
              marginBottom: "30px",
            }}
          >
            {product.description}
          </p>

          
          <div>
            <Link to={`/edit/${product.id}`}>
              <button
                style={{
                  background: "orange",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                  fontWeight: "600",
                }}
              >
                Edit
              </button>
            </Link>

            <Link to={`/delete/${product.id}`}>
              <button
                style={{
                  background: "red",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
