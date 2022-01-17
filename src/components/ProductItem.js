import React, { Component } from "react";
import "../styles/css/product-item.css";

export class ProductItem extends Component {
  render() {
    const {
      product: { SKU, name, price, productSpecificAtr },
    } = this.props;

    return (
      <div className="product-item">
        <div>{SKU}</div>
        <div>{name}</div>
        <div>{price}</div>
        <div>{productSpecificAtr}</div>
        <input
          type="checkbox"
          className="delete-checkbox"
          onClick={this.props.onDelete}
        />
      </div>
    );
  }
}

export default ProductItem;
