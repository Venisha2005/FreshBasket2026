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

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/FreshBasket", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected "))
.catch((err) => console.log(err));

// ------------------ SCHEMAS ------------------

// Fruit Schema
const fruitSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
});
const Fruit = mongoose.model("Fruit", fruitSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  cart: Array,   // items purchased
  total: Number,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// ------------------ ROUTES ------------------

// Get all fruits
app.get("/fruits", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json({ data: fruits });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fruits" });
  }
});

// Get fruit by ID
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (!fruit) return res.status(404).json({ error: "Fruit not found" });
    res.json(fruit);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fruit" });
  }
});

// Place an order
app.post("/order", async (req, res) => {
  try {
    const { name, address, phone, cart, total } = req.body;
    const order = new Order({ name, address, phone, cart, total });
    await order.save();
    res.json({ message: "Your order placed successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ------------------ SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
