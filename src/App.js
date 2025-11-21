import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Product from "./pages/Product";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  
  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h2>Error: {error}</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home products={products} loading={loading} error={error} />}
        />

        <Route path="/product/:id" element={<Product products={products} />} />

        <Route
          path="/edit/:id"
          element={<Edit products={products} setProducts={setProducts} />}
        />

        <Route
          path="/delete/:id"
          element={<Delete products={products} setProducts={setProducts} />}
        />

        <Route
          path="/create"
          element={<Create addProduct={addProduct} />}
        />
      </Routes>
    </div>
  );
}

export default App;
