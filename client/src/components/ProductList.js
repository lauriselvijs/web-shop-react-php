import React, { Component } from "react";
import "../styles/css/product-list.css";
import { Link } from "react-router-dom";
import axios from "axios";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.checkRef = React.createRef();

    this.state = {
      products: [],
      idArray: [],
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
      this.setState({
        products: [],
      });
      return error;
    }
  }

  onDelete() {
    const checkboxes = document.getElementsByClassName("delete-checkbox");
    let checkboxArray = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        console.log(checkboxes[i].name);
        checkboxArray.push(checkboxes[i].name);
      }
    }

    checkboxArray.map(async (id) => {
      try {
        await axios.delete(
          "http://localhost/react-php-test/api/products/delete.php",
          { data: { id } }
        );
        window.location.reload();
        // this.setState({
        //   products: this.state.products.filter(
        //     (products) => products.id !== id
        //   ),
        // });
      } catch (error) {
        console.log(error);
        return error;
      }
    });
  }

  onChecked(id, event) {
    //console.log(event.target.checked, event.target.name);
    // this.setState({
    //  idArray: [...this.state.idArray, event.target.name],
    // });
  }

  render() {
    const { products, idArray } = this.state;

    console.log(idArray);

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
            <div className="product-item" key={index}>
              <div>{product.sku}</div>
              <div>{product.name}</div>
              <div>{product.price} $</div>
              <div>
                {product.type.toLowerCase() === "dvd" && (
                  <>Size: {product.product_attribute} MB</>
                )}
                {product.type.toLowerCase() === "book" && (
                  <>Weight: {product.product_attribute} KG</>
                )}
                {product.type.toLowerCase() === "furniture" && (
                  <>Dimension: {product.product_attribute}</>
                )}
              </div>
              <input
                type="checkbox"
                name={product.id}
                className="delete-checkbox"
                onChange={this.onChecked.bind(this, product.id)}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ProductList;
