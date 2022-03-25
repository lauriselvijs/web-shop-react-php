import React, { Component } from "react";
import "./Book.style.scss";
import PropTypes from "prop-types";
import { Product } from "../../constant/Product";

const { BOOK } = Product;

export class Book extends Component {
  render() {
    const { id, sku, name, price, weight } = this.props.product;

    return (
      <div className="book-item">
        <div>{sku}</div>
        <div>{name}</div>
        <div>{price} $</div>
        <div>Weight: {weight} KG</div>
        <input
          type="checkbox"
          name={BOOK}
          id={id}
          className="delete-checkbox"
        />
      </div>
    );
  }
}

Book.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    sku: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    weight: PropTypes.string,
  }),
};

Book.defaultProps = {
  product: {
    id: "1",
    sku: "SKUTest000",
    name: "NameTest000",
    price: "25.0",
    weight: "2",
  },
};

export default Book;
