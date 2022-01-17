import React, { Component } from "react";
import "../styles/css/add-product.css";
import InputErrMsg from "./InputErrMsg";

export class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);

    this.onSKUChange = this.onSKUChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);

    this.onDropdownChange = this.onDropdownChange.bind(this);

    this.onDvdSizeChange = this.onDvdSizeChange.bind(this);

    this.onFurnitureHeightChange = this.onFurnitureHeightChange.bind(this);
    this.onFurnitureLengthChange = this.onFurnitureLengthChange.bind(this);
    this.onFurnitureWidthChange = this.onFurnitureWidthChange.bind(this);

    this.onBookWeightSizeChange = this.onBookWeightSizeChange.bind(this);

    this.state = {
      error: false,
      SKU: "",
      name: "",
      price: "",
      selectValue: "DVD",
      dvdSize: "",
      furnitureHeight: "",
      furnitureLength: "",
      furnitureWidth: "",
      bookWeight: "",
      productObj: {},
      errorMsg: "",
    };
  }

  onSKUChange(e) {
    this.setState({
      SKU: e.target.value,
    });
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onPriceChange(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  onDvdSizeChange(e) {
    this.setState({ dvdSize: e.target.value });
  }

  onFurnitureHeightChange(e) {
    this.setState({ furnitureHeight: e.target.value });
  }

  onFurnitureLengthChange(e) {
    this.setState({ furnitureLength: e.target.value });
  }

  onFurnitureWidthChange(e) {
    this.setState({ furnitureWidth: e.target.value });
  }

  onBookWeightSizeChange(e) {
    this.setState({ bookWeight: e.target.value });
  }

  onSave(e) {
    e.preventDefault();

    this.setState({
      productObj: {
        SKU: this.state.SKU,
        name: this.state.name,
        price: this.state.price,
      },
    });

    if (this.state.selectValue === "DVD") {
      this.setState((prevState) => ({
        productObj: {
          ...prevState.productObj,
          dvdSize: this.state.dvdSize,
        },
      }));
    }

    if (this.state.selectValue === "Furniture") {
      this.setState((prevState) => ({
        productObj: {
          ...prevState.productObj,
          furnitureHeight: this.state.furnitureHeight,
          furnitureLength: this.state.furnitureLength,
          furnitureWidth: this.state.furnitureWidth,
        },
      }));
    }

    if (this.state.selectValue === "Book") {
      this.setState((prevState) => ({
        productObj: {
          ...prevState.productObj,
          bookWeight: this.state.bookWeight,
        },
      }));
    }
  }

  render() {
    const { error, errorMsg, selectValue, productObj } = this.state;

    console.log(productObj);
    return (
      <>
        <header className="product-add-header">
          <h1 className="heading-product-add">Product Add</h1>
          <button
            type="submit"
            form="product_form"
            onClick={this.onSave}
            className="save-btn"
          >
            Save
          </button>
          <button className="cancel-btn">Cancel</button>
        </header>
        <hr className="line-break-header" />
        <div className="container">
          <form id="product_form">
            <div className="row">
              <div className="col-25">
                <label htmlFor="sku">SKU</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="sku"
                  placeholder="Enter name SKU"
                  value={this.state.SKU}
                  onChange={this.onSKUChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="name">Name</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  value={this.state.name}
                  onChange={this.onNameChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="price">Price</label>
              </div>
              <div className="col-75">
                <input
                  type="number"
                  min="0.00"
                  step="0.01"
                  id="price"
                  placeholder="Enter product price"
                  value={this.state.price}
                  onChange={this.onPriceChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="productType">Type Switcher</label>
              </div>
              <div className="col-75">
                <select
                  id="productType"
                  defaultValue={this.state.selectValue}
                  onChange={this.onDropdownChange}
                >
                  <option id="DVD" value="DVD">
                    DVD
                  </option>
                  <option id="Furniture" value="Furniture">
                    Furniture
                  </option>
                  <option id="Book" value="Book">
                    Book
                  </option>
                </select>
              </div>
            </div>

            {selectValue === "DVD" && (
              <>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="dvd-size">Size (MB)</label>
                  </div>
                  <div className="col-75">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      id="dvd-size"
                      placeholder="DVD Size"
                      value={this.state.dvdSize}
                      onChange={this.onDvdSizeChange}
                      required
                    />
                    <div style={{ padding: "10px", fontSize: "14px" }}>
                      Please, provide size in MB
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectValue === "Furniture" && (
              <>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="height">Height (CM)</label>
                  </div>
                  <div className="col-75">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      id="height"
                      placeholder="Height"
                      value={this.state.furnitureHeight}
                      onChange={this.onFurnitureHeightChange}
                      required
                    />
                    <div style={{ padding: "10px", fontSize: "14px" }}>
                      Please, provide height in CM
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label htmlFor="width">Width (CM)</label>
                  </div>
                  <div className="col-75">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      id="width"
                      placeholder="Width"
                      value={this.state.furnitureWidth}
                      onChange={this.onFurnitureWidthChange}
                      required
                    />
                    <div style={{ padding: "10px", fontSize: "14px" }}>
                      Please, provide width in CM
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label htmlFor="length">Length (CM)</label>
                  </div>
                  <div className="col-75">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      id="length"
                      placeholder="Length"
                      value={this.state.furnitureLength}
                      onChange={this.onFurnitureLengthChange}
                      required
                    />
                    <div style={{ padding: "10px", fontSize: "14px" }}>
                      Please, provide length in CM
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectValue === "Book" && (
              <>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="book-weight">Weight (KG)</label>
                  </div>
                  <div className="col-75">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      id="book-weight"
                      placeholder="Weight"
                      value={this.state.bookWeight}
                      onChange={this.onBookWeightSizeChange}
                      required
                    />
                    <div style={{ padding: "10px", fontSize: "14px" }}>
                      Please, provide weight in KG
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
          {error && <InputErrMsg errorMsg={errorMsg} />}
        </div>
      </>
    );
  }
}

export default AddProduct;
