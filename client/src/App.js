import React, { Component } from "react";
import ProductList from "./routes/ProductList";
import AddProduct from "./routes/AddProduct";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/addproduct" element={<AddProduct />}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
