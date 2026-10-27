import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";   // ✅ import Link
import "./store.css";

const Store = ({ cart, setCart }) => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Fetch fruits from backend
  useEffect(() => {
    fetch("http://localhost:5001/fruits")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch fruits");
        return res.json();
      })
      .then((data) => {
        setFruits(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🛒 Add item to cart
  const addToCart = (fruit) => {
    const quantity = quantities[fruit._id] || 1;
    const newItem = {
      ...fruit,
      quantity,
      image: `http://localhost:5001${fruit.image}`, // ✅ store full path
    };
    setCart((prevCart) => [...prevCart, newItem]);
    alert(`${quantity} x ${fruit.name} added to cart!`);
  };

  // Update quantity
  const handleQuantityChange = (fruitId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [fruitId]: Math.max(1, Number(value)),
    }));
  };

  if (loading) return <p>Loading fruits...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {fruits.map((fruit) => (
          <li key={fruit._id} className="fruit-card">
            {/* ✅ Clickable link to details page */}
            <Link
              to={`/fruit/${fruit._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>{fruit.name}</h2>
              {fruit.image && (
                <img
                  src={`http://localhost:5001${fruit.image}`}
                  alt={fruit.name}
                  style={{ width: "220px", height: "150px" }}
                />
              )}
              {fruit.price && (
                <p>
                  <strong>Price:</strong> ₹{fruit.price}
                </p>
              )}
              <p>{fruit.description}</p>
            </Link>

            <div className="quantity-wrapper">
              <label>
                Qty:{" "}
                <input
                  type="number"
                  min="1"
                  value={quantities[fruit._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(fruit._id, e.target.value)
                  }
                  className="quantity-input"
                />
              </label>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(fruit)}
            >
              🛒 Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Store;
