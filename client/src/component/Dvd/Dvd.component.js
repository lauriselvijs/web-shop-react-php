import React, { Component } from "react";
import "./Dvd.style.scss";
import PropTypes from "prop-types";

export class Dvd extends Component {
  render() {
    const { id, sku, name, price, type, product_attribute } =
      this.props.product;

    return (
      <div className="product-item">
        <div>{sku}</div>
        <div>{name}</div>
        <div>{price} $</div>
        <div>
          {type.toLowerCase() === "dvd" && <>Size: {product_attribute} MB</>}
          {type.toLowerCase() === "book" && <>Weight: {product_attribute} KG</>}
          {type.toLowerCase() === "furniture" && (
            <>Dimension: {product_attribute}</>
          )}
        </div>
        <input type="checkbox" name={id} className="delete-checkbox" />
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
    type: PropTypes.string,
    product_attribute: PropTypes.string,
  }),
};

Dvd.defaultProps = {
  product: {
    id: "1",
    sku: "SKUTest000",
    name: "NameTest000",
    price: "25.0",
    type: "DVD",
    product_attribute: "200",
  },
};

export default Dvd;