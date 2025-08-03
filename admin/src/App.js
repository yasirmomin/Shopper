<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Admin from "./Pages/Admin";

export const backend_url = "http://localhost:4000";
export const currency = "₹";
=======
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";

export const backend_url = 'http://localhost:4000';
export const currency = '₹';
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Navbar />
      <Routes>
        {/* Only Admin handles its nested routes */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
=======
      <div>
        <Navbar />
        <Admin />
        <Footer />
      </div>
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
    </BrowserRouter>
  );
}

export default App;
