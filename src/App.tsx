//import { useState } from "react";
//import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import ProductList from "./components/ProductList";

function App() {

  return (
    <>
     <div className="relative flex flex-col h-screen flex-1">
        <header className="bg-[#36317C] p-5 text-white text-center border-b border-[#ddd]">
          <h1>List Of Products</h1>
        </header>
        <main className="relative flex flex-col flex-1 bg-gradient-to-b from-[#8278fa] to-[#5448e4]">
          
          <Router>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  )
}

export default App
