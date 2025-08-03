# 🛒 E-Commerce Admin Panel & Shop

This project is a **MERN stack** (MongoDB, Express.js, React.js, Node.js) based **E-Commerce platform** with a complete Admin Panel for managing products and a frontend shop for customers.


---

## 🚀 Features

### 🔑 Admin Panel
- Secure **JWT-based authentication**
- Add new products (name, price, description, category, image)
- Delete products
- View product list

### 🛍 Frontend Shop
- Browse products by category
- View product details
- Add products to cart
- Cart persists even after login/logout
- Login/Logout button dynamically changes

---

## 🛠 Tech Stack

### **Frontend (React.js)**
✅ React Router DOM (Routing)  
✅ Context API for state management  
✅ Fetch API for backend communication  

### **Backend (Node.js + Express.js)**
✅ JWT Authentication  
✅ Bcrypt.js for password hashing  
✅ MongoDB with Mongoose  

---

## ⚙️ Installation

### 📌 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ecommerce-admin-panel.git
cd ecommerce-admin-panel
```

### 📌 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside /server and add:
```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

Start the backend:
```bash
npm start
```

### 📌 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```
---
## **🔮 Future Enhancements**
- ✅ Integrate Razorpay/Stripe for payments
- ✅ Add search and sorting options
- ✅ Implement order history and tracking

---
## 📜 License

This project is open-source and free to use.
