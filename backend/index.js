
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/FreshBasket")
  .then(async () => {
    mongoReady = true;
    console.log("MongoDB Connected");
    await seedFruits();
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    console.log("Serving in-memory fruits until MongoDB is available");
  });

// Fruit schema
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  description: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const DEFAULT_FRUITS = [
  { name: "Apple", image: "/images/Apple.jpg", price: 120, description: "Crisp, sweet apples picked at peak freshness." },
  { name: "Banana", image: "/images/banana.jpg", price: 50, description: "Ripe bananas, perfect for a healthy snack." },
  { name: "Mango", image: "/images/mango.jpg", price: 90, description: "Juicy seasonal mangoes with rich flavor." },
  { name: "Orange", image: "/images/orange.jpg", price: 70, description: "Vitamin-packed oranges bursting with citrus." },
  { name: "Grapes", image: "/images/grapes.jpg", price: 80, description: "Sweet seedless grapes, ready to enjoy." },
  { name: "Watermelon", image: "/images/watermelon.jpg", price: 40, description: "Refreshing watermelon, great for hot days." },
  { name: "Pineapple", image: "/images/pineapple.jpg", price: 85, description: "Tangy pineapple with a tropical aroma." },
  { name: "Strawberry", image: "/images/stawberry.jpg", price: 150, description: "Fresh strawberries, sweet and fragrant." },
];

let memoryFruits = DEFAULT_FRUITS.map((fruit, index) => ({
  ...fruit,
  _id: String(index + 1),
}));
let mongoReady = false;

async function seedFruits() {
  const count = await Fruit.countDocuments();
  if (count === 0) {
    await Fruit.insertMany(DEFAULT_FRUITS);
    console.log("Seeded default fruits");
  }
}

// Order schema
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  cart: { type: Array, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Test route
app.get("/", (req, res) => {
  res.send("FreshBasket backend is running!");
});

// Get all fruits
app.get("/fruits", async (req, res) => {
  try {
    if (!mongoReady) {
      return res.json({ data: memoryFruits });
    }
    const fruits = await Fruit.find();
    res.json({ data: fruits });
  } catch (error) {
    console.error("Fetch fruits error:", error.message);
    res.json({ data: memoryFruits });
  }
});

// Get fruit by ID
app.get("/fruits/:id", async (req, res) => {
  try {
    if (!mongoReady) {
      const fruit = memoryFruits.find((item) => item._id === req.params.id);
      if (!fruit) {
        return res.status(404).json({ error: "Fruit not found" });
      }
      return res.json(fruit);
    }

    const fruit = await Fruit.findById(req.params.id);

    if (!fruit) {
      return res.status(404).json({ error: "Fruit not found" });
    }

    res.json(fruit);
  } catch (error) {
    const fruit = memoryFruits.find((item) => item._id === req.params.id);
    if (fruit) {
      return res.json(fruit);
    }
    res.status(400).json({ error: "Invalid fruit ID or request" });
  }
});

// Place an order
app.post("/order", async (req, res) => {
  try {
    const { name, address, phone, cart, total } = req.body;

    if (
      !name ||
      !address ||
      !phone ||
      !Array.isArray(cart) ||
      typeof total !== "number"
    ) {
      return res.status(400).json({
        error: "Please provide valid order details",
      });
    }

    const order = new Order({ name, address, phone, cart, total });
    await order.save();

    res.status(201).json({
      message: "Your order placed successfully!",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Place order error:", error.message);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
