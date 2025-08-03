import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Admin from "./Pages/Admin";

export const backend_url = "http://localhost:4000";
export const currency = "₹";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Only Admin handles its nested routes */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
