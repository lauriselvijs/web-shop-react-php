import React, { Component } from "react";
import "./ProductContainer.style.scss";
import axios from "axios";
// import Book from "../Book";
// import Furniture from "../Furniture";
// import Dvd from "../Dvd";

export class ProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    try {
      const productData = await axios.get(
        `${protocol}//${hostname}/products/public/?product_type=dvd`
      );
      // http://localhost/products/public/?product_type=dvd&product_id=1

      console.log(productData.data);

      this.setState({
        products: [...this.state.products, ...productData.data],
      });
    } catch (error) {
      this.setState({
        products: [],
      });
      return error;
    }
  }

  render() {
    // const { products } = this.state;

    return (
      <section className="product-view-grid-container">
        {/* {products.map((product, index) => (
          <Dvd product={product} key={index} />
        ))} */}
      </section>
    );
  }
}

export default ProductContainer;
