import React, { Component } from "react";
import "./Furniture.style.scss";
import PropTypes from "prop-types";
import { Product } from "../../constant/Product";

const { FURNITURE } = Product;

export class Furniture extends Component {
  render() {
    const { id, sku, name, price, width, height, length } = this.props.product;

    return (
      <div className="furniture-item">
        <div>{sku}</div>
        <div>{name}</div>
        <div>{price} $</div>
        <div>
          Dimension: {width}x{height}x{length}
        </div>
        <input
          type="checkbox"
          id={id}
          name={FURNITURE}
          className="delete-checkbox"
        />
      </div>
    );
  }
}

Furniture.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    sku: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    length: PropTypes.string,
  }),
};

Furniture.defaultProps = {
  product: {
    id: "1",
    sku: "SKUTest000",
    name: "NameTest000",
    price: "25.0",
    width: "20",
    height: "25",
    length: "30",
  },
};

export default Furniture;
