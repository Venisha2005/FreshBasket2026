import { useParams, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import { useEffect, useState } from "react";

function FruitDetail({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ for navigation
  const [fruit, setFruit] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch fruit by id
  useEffect(() => {
    fetch(`http://localhost:5001/fruits/${id}`)
      .then((res) => res.json())
      .then((data) => setFruit(data))
      .catch((err) => console.error("Error fetching fruit:", err));
  }, [id]);

  // ✅ Add to cart
  const addToCart = () => {
    if (!fruit) return;
    const newItem = {
      ...fruit,
      quantity,
      image: `http://localhost:5001${fruit.image}`, // ✅ full path
    };
    setCart([...cart, newItem]);
    alert(`${quantity} x ${fruit.name} added to cart!`);
  };

  // ✅ Buy Now (direct purchase)
  const buyNow = () => {
    if (!fruit) return;
    const order = {
      ...fruit,
      quantity,
      image: `http://localhost:5001${fruit.image}`,
    };

    // you can send order to backend here if needed
    alert(`✅ Purchased ${quantity} x ${fruit.name}!`);

    // Clear cart and redirect
    setCart([order]); // keep only this fruit in cart
    navigate("/checkout"); // redirect to checkout page
  };

  if (!fruit) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading fruit details...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="max-w-lg w-full bg-white border border-gray-200 shadow-lg rounded-2xl p-6 text-center transition-transform transform hover:scale-105">
        
        {/* Fruit Image */}
        <img
          src={`http://localhost:5001${fruit.image}`}
          alt={fruit.name}
          className="w-64 h-64 object-cover mx-auto mb-4 rounded-xl shadow-md border-4 border-gray-200"
        />

        {/* Fruit Info */}
        <h1 className="text-3xl font-extrabold text-gray-800">{fruit.name}</h1>
        <p className="mt-2 text-gray-600">{fruit.description}</p>
        <p className="mt-3 text-green-600 font-bold text-xl">
          ₹{fruit.price}{" "}
          <span className="text-sm font-medium text-gray-500">per Kg</span>
        </p>

        {/* Quantity Dropdown */}
        <div className="mt-4">
          <label className="mr-2 font-medium text-gray-700">Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            {[1, 2, 3, 5].map((num) => (
              <option key={num} value={num}>
                {num} Kg
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={addToCart}
          >
            🛒 Add to Cart
          </button>

          {/* ✅ Buy Now button */}
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={buyNow}
          >
             Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FruitDetail;
