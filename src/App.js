import React, { Component } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Footer from "./components/Footer";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div>
        <AddProduct />
        <Footer />
      </div>
    );
  }
}

export default App;
