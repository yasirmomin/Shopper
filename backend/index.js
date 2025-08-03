const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Users = require("./models/Users");
const Product = require("./models/Product");
const { DBConnection } = require("./database/db");

dotenv.config();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
DBConnection();

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

app.use("/images", express.static("upload/images"));

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Please login first" });

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

app.get("/", (req, res) => res.send("API is running"));

app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });
  res.json({ success: true, image_url: `/images/${req.file.filename}` });
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    let existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new Users({
      name: username,
      email,
      password: hashedPassword,
      cartData: cart,
      isAdmin: false,
    });

    await user.save();

    const token = jwt.sign(
      { user: { id: user._id, isAdmin: user.isAdmin } },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "Email not found" }); // ✅ Specific error
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success: false, error: "Incorrect password" }); // ✅ Specific error
    }

    const token = jwt.sign(
      { user: { id: user._id, isAdmin: user.isAdmin } },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products.slice(-8));
  } catch (error) {
    console.error("Fetch new collections error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/popularinwomen", async (req, res) => {
  try {
    const products = await Product.find({ category: "women" });
    res.json(products.slice(0, 4));
  } catch (error) {
    console.error("Fetch popular women error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/relatedproducts", async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ error: "Category is required" });

    const products = await Product.find({ category });
    res.json(products.slice(0, 4));
  } catch (error) {
    console.error("Fetch related products error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/addtocart", fetchuser, async (req, res) => {
  try {
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData});
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/removefromcart", fetchuser, async (req, res) => {
  try {
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData});

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/getcart", fetchuser, async (req, res) => {
  try {
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
  } catch (error) {
    console.error("Get cart error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/addproduct", fetchuser, verifyAdmin, async (req, res) => {
  try {
    const { name, description, image, category, new_price, old_price } = req.body;

    if (!name || !description || !image || !category || !new_price || !old_price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({ id, name, description, image, category, new_price, old_price });
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Add product error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/removeproduct", fetchuser, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Product id is required" });

    const deleted = await Product.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Remove product error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
