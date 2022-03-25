import React, { Component } from "react";
import "./Dvd.style.scss";
import PropTypes from "prop-types";
import { Product } from "../../constant/Product";

const { DVD } = Product;

export class Dvd extends Component {
  render() {
    const { id, sku, name, price, size } = this.props.product;

    return (
      <div className="dvd-item">
        <div>{sku}</div>
        <div>{name}</div>
        <div>{price} $</div>
        <div>Size: {size} MB</div>
        <input type="checkbox" id={id} name={DVD} className="delete-checkbox" />
      </div>
    );
  }
}

Dvd.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    sku: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    size: PropTypes.string,
  }),
};

Dvd.defaultProps = {
  product: {
    id: "1",
    sku: "SKUTest000",
    name: "NameTest000",
    price: "25.0",
    size: "700",
  },
};

export default Dvd;
