import React from "react";
import { useNavigate } from "react-router-dom";

function CartPage({ cart, setCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  // remove item from cart
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // update quantity (numbers instead of kg)
  const updateQuantity = (index, newQuantity) => {
    const newCart = [...cart];
    newCart[index].quantity = Number(newQuantity);
    setCart(newCart);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 my-4 flex flex-col md:flex-row items-center shadow-md"
            >
              {/* Image */}
              <img
                src={item.image}   // already has full path
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />

              {/* Fruit Info */}
              <div className="flex-1 md:ml-6 text-left">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-600 font-bold mt-2">
                  ₹{item.price} per kg
                </p>

                {/* Quantity Selector */}
                <div className="mt-3">
                  <label className="mr-2 font-medium">Quantity:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>

                {/* Remove Button */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price for that item */}
              <div className="text-lg font-bold text-gray-700 mt-4 md:mt-0">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          {/* Total */}
          <h2 className="text-2xl font-bold mt-6 text-right">
            Total: ₹{total}
          </h2>

          {/* Place Order Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
              className={`px-6 py-3 rounded-lg shadow-md 
                ${cart.length === 0 
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Place Order (₹{total})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
