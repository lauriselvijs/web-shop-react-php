import React, { Component } from "react";
import ProductList from "./route/ProductList";
import AddProduct from "./route/AddProduct";
import Footer from "./component/Footer";
import "./App.scss";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/add-product" element={<AddProduct />}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
