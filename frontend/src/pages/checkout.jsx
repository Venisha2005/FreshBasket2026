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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
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
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const total = cart.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.quantity),
      0
    );

    try {
      const response = await fetch(
        "https://freshbasket2026.onrender.com/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            address: formData.address.trim(),
            phone: formData.phone.trim(),
            cart,
            total,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          `Server error (${response.status}).`
        );
      }

      setSuccess(true);
      setMessage(
        data.message || "Your order has been placed successfully!"
      );

      setCart([]);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Order submission error:", error);

      setSuccess(false);

      if (error.message === "Failed to fetch") {
        setMessage(
          "Cannot connect to the server. Check your backend URL, server status, and CORS settings."
        );
      } else {
        setMessage(
          error.message || "Unable to place your order. Please try again."
        );
      }
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
            role="status"
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
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, ZIP"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                maxLength={10}
                inputMode="numeric"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !cart || cart.length === 0}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-rose-500 disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}