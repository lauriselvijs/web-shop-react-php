import React, { Component } from "react";
import ProductItem from "./ProductItem";
import "../styles/css/product-list.css";
import { Link } from "react-router-dom";
import axios from "axios";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.setIdArray = this.setIdArray.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

    this.state = {
      products: [],
      idArray: [],
      checkedItem: true,
    };
  }

  async componentDidMount() {
    try {
      const productData = await axios.get(
        "http://localhost/react-php-test/api/products/read.php"
      );

      this.setState({
        products: [...this.state.products, ...productData.data.data],
      });
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  setIdArray(id) {
    this.setState({ idArray: [...this.state.idArray, id] });
  }

  onDelete() {
    this.state.idArray.map(async (id) => {
      try {
        await axios.delete(
          "http://localhost/react-php-test/api/products/delete.php",
          { data: { id } }
        );

        this.setState({
          products: this.state.products.filter(
            (products) => products.id !== id
          ),
          checkedItem: (this.state.checkedItem = false),
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    });
  }

  handleCheckboxChange() {}

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
          {products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              onDelete={this.setIdArray.bind(this, product.id)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductList;
