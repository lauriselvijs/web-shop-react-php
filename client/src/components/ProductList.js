import React, { Component } from "react";
import ProductItem from "./ProductItem";
import "../styles/css/product-list.css";
import { Link } from "react-router-dom";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.setIdArray = this.setIdArray.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      products: [
        {
          SKU: 1,
          name: "Acme DVD",
          price: "$6.50",
          productSpecificAtr: "Size: 700 MB",
        },
        {
          SKU: 2,
          name: "War and Peace",
          price: "$6.50",
          productSpecificAtr: "Weight: 2KG",
        },
        {
          SKU: 3,
          name: "Chair",
          price: "$6.50",
          productSpecificAtr: "Dimension: 12x24x45",
        },
        {
          SKU: 4,
          name: "Acme DVD",
          price: "$6.50",
          productSpecificAtr: "Size: 700 MB",
        },
        {
          SKU: 5,
          name: "War and Peace",
          price: "$6.50",
          productSpecificAtr: "Weight: 2KG",
        },
        {
          SKU: 6,
          name: "Chair",
          price: "$6.50",
          productSpecificAtr: "Dimension: 12x24x45",
        },
        {
          SKU: 7,
          name: "Acme DVD",
          price: "$6.50",
          productSpecificAtr: "Size: 700 MB",
        },
        {
          SKU: 8,
          name: "War and Peace",
          price: "$6.50",
          productSpecificAtr: "Weight: 2KG",
        },
        {
          SKU: 9,
          name: "Chair",
          price: "$6.50",
          productSpecificAtr: "Dimension: 12x24x45",
        },
      ],
      idArray: [],
    };
  }

  setIdArray(id) {
    this.setState({ idArray: [...this.state.idArray, id] });
  }

  onDelete() {
    console.log("delete", this.state.idArray);
  }

  render() {
    const { products } = this.state;

    return (
      <>
        <header className="product-list-header">
          <h1 className="heading-product-list">Product List</h1>
          <Link to={"/addproduct"}>
            <button className="add-item-btn">ADD</button>
          </Link>
          <button
            id="delete-product-btn"
            className="mass-delete-btn"
            onClick={this.onDelete}
          >
            MASS DELETE
          </button>
        </header>
        <hr className="line-break-header" />
        <div className="grid-container">
          {products.map((product) => (
            <ProductItem
              key={product.SKU}
              product={product}
              onDelete={this.setIdArray.bind(this, product.SKU)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductList;
