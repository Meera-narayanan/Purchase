import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const prod = products.find((p) => p.id === parseInt(id));

    if (prod) {
      setProduct(prod);
      setTitle(prod.title);
      setPrice(prod.price);
      setDescription(prod.description);
    }

    setLoading(false);
  }, [id, products]);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!price || isNaN(price)) newErrors.price = "Valid price is required";
    if (!description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updated = {
      ...product,
      title,
      price: Number(price),
      description,
    };

    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );

    alert("Product updated successfully!");
    navigate(`/product/${id}`);
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!product)
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;

  return (
    <>
      
      <style>
        {`
        .edit-container {
          max-width: 500px;
          margin: 40px auto;
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
        }

        .edit-container h2 {
          text-align: center;
          margin-bottom: 25px;
          font-size: 26px;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          font-size: 16px;
          font-weight: 500;
          display: block;
          margin-bottom: 6px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          font-size: 15px;
          border: 1.5px solid #c5c5c5;
          border-radius: 8px;
          outline: none;
          transition: 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #4380f7;
          box-shadow: 0 0 4px rgba(67, 128, 247, 0.4);
        }

        .form-group textarea {
          resize: none;
          height: 110px;
        }

        .error {
          color: red;
          font-size: 13px;
          margin-top: 4px;
          display: block;
        }

        .save-btn {
          width: 100%;
          padding: 12px;
          font-size: 17px;
          font-weight: 600;
          background: #2563eb;
          border: none;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .save-btn:hover {
          background: #1e4fc9;
        }
      `}
      </style>

      <div className="edit-container">
        <h2>Edit Product</h2>

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <small className="error">{errors.title}</small>}
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <small className="error">{errors.price}</small>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <small className="error">{errors.description}</small>
          )}
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </>
  );
}

export default Edit;
