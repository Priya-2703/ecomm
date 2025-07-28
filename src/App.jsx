import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Honey from "./pages/honey";
import Tea from "./pages/tea";
import Hairoil from "./pages/hairoil";
import About from "./pages/about";
import Contact from "./pages/contact";
import Admin from "./pages/admin";



function App() {
  

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/honey" element={<Honey />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/hairoil" element={<Hairoil />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
      </Router>
  );
}

export default App
