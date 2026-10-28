import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout({ cart, setCart }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone must be exactly 10 digits.";
    }

    if (!cart || cart.length === 0) {
      newErrors.cart = "Your cart is empty.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setMessage("");

    const total = cart.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );

    try {
      const res = await fetch(
        "https://freshbasket2026.onrender.com/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            cart,
            total,
          }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || data.error || `Order failed (${res.status}).`
        );
      }

      setSuccess(true);
      setMessage(data.message || "Your order has been placed successfully!");

      setCart([]);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Order error:", err);

      setSuccess(false);
      setMessage(
        err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again later."
          : err.message || "Server error. Please try later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-emerald-600 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Checkout
        </h2>

        {message && (
          <p
            className={`font-bold text-center mb-4 ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {errors.cart && (
          <p className="text-red-600 text-sm text-center mb-4">
            {errors.cart}
          </p>
        )}

        {!success && (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>

              <input
                type="text"
                name="address"
                placeholder="Street, City, ZIP"
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                inputMode="numeric"
                className={`mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !cart || cart.length === 0}
                className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-rose-500 shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}