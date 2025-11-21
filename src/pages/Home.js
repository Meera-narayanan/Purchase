import React from "react";
import { Link } from "react-router-dom";

function Home({ products, loading, error }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Products</h1>

      
      {loading && <h2>Loading products...</h2>}

      
      {error && <h2 style={{ color: "red" }}>Failed to load products.</h2>}

      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              background: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                minHeight: "48px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              {product.title}
            </h3>

            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />

            <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
              ₹ {product.price}
            </p>

            <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
              <button
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px 0",
                  width: "100%",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
