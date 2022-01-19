import React, { Component } from "react";
import "../styles/css/product-item.css";

export class ProductItem extends Component {
  render() {
    const {
      product: { sku, name, price, product_attribute },
      onDelete,
    } = this.props;

    return (
      <div className="product-item">
        <div>{sku}</div>
        <div>{name}</div>
        <div>{price} $</div>
        <div>{product_attribute}</div>
        <input type="checkbox" className="delete-checkbox" onClick={onDelete} />
      </div>
    );
  }
}

export default ProductItem;
