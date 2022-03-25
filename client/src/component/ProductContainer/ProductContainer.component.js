import React, { Component } from "react";
import "./ProductContainer.style.scss";
import axios from "axios";
import Book from "../Book";
import Furniture from "../Furniture";
import Dvd from "../Dvd";
import { Product } from "../../constant/Product";

const { DVD, FURNITURE, BOOK } = Product;

export class ProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dvdProducts: [],
      furnitureProducts: [],
      bookProducts: [],
    };
  }

  async componentDidMount() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const { dvdProducts, bookProducts, furnitureProducts } = this.state;

    try {
      const bookData = await axios.get(
        `${protocol}//${hostname}/products/public/`,
        {
          params: { product_type: BOOK },
        }
      );

      this.setState({
        bookProducts: [...bookProducts, ...bookData.data],
      });
    } catch (error) {
      this.setState({
        bookProducts: [],
      });
    }

    try {
      const dvdData = await axios.get(
        `${protocol}//${hostname}/products/public/`,
        {
          params: { product_type: DVD },
        }
      );

      this.setState({
        dvdProducts: [...dvdProducts, ...dvdData.data],
      });
    } catch (error) {
      this.setState({
        dvdProducts: [],
      });
    }

    try {
      const furnitureData = await axios.get(
        `${protocol}//${hostname}/products/public/`,
        {
          params: { product_type: FURNITURE },
        }
      );

      this.setState({
        furnitureProducts: [...furnitureProducts, ...furnitureData.data],
      });
    } catch (error) {
      this.setState({
        furnitureProducts: [],
      });
    }
  }

  render() {
    const { dvdProducts, bookProducts, furnitureProducts } = this.state;

    return (
      <section className="product-view-grid-container">
        {dvdProducts.map((product, index) => (
          <Dvd product={product} key={index} />
        ))}
        {bookProducts.map((product, index) => (
          <Book product={product} key={index} />
        ))}
        {furnitureProducts.map((product, index) => (
          <Furniture product={product} key={index} />
        ))}
      </section>
    );
  }
}

export default ProductContainer;
