import React, { Component } from "react";
import "./ProductContainer.style.scss";
import PropTypes from "prop-types";
import axios from "axios";
import Product from "../Product";

export class Title extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    try {
      const productData = await axios.get("http://localhost/products/public/");

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
    const { products } = this.state;

    return (
      <section className="grid-container">
        {products.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </section>
    );
  }
}

Title.propTypes = {
  pageTitle: PropTypes.string,
};

Title.defaultProps = {
  pageTitle: "Product List",
};

export default Title;
