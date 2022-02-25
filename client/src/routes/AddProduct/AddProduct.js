import React, { Component } from "react";
import "./AddProduct.style.scss";
import InputErrMsg from "../../components/inputErrMsg/InputErrMsg.component";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

export class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onSaveDvd = this.onSaveDvd.bind(this);
    this.onSaveFurniture = this.onSaveFurniture.bind(this);
    this.onSaveBook = this.onSaveBook.bind(this);

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
      saved: false,
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

  async onSaveDvd(e) {
    e.preventDefault();

    const emptyValueArray = [];
    const correctDataType = [];

    this.state.SKU === "" && emptyValueArray.push("SKU");
    this.state.name === "" && emptyValueArray.push("name");
    this.state.price === "" && emptyValueArray.push("price");
    this.state.dvdSize === "" && emptyValueArray.push("dvd size");

    typeof this.state.SKU !== "string" && correctDataType.push("SKU");
    typeof this.state.name !== "string" && correctDataType.push("name");
    isNaN(this.state.price) && correctDataType.push("price");
    isNaN(this.state.dvdSize) && correctDataType.push("dvd size");

    if (emptyValueArray.length === 0) {
      if (correctDataType.length === 0) {
        try {
          await axios.post(
            "http://localhost/react-php-test/api/products/create.php",
            {
              id: this.state.SKU,
              sku: this.state.SKU,
              name: this.state.name,
              price: this.state.price,
              product_attribute: this.state.dvdSize,
              type: this.state.selectValue,
            }
          );

          this.setState({
            errorMsg: "",
            error: false,
            saved: true,
          });
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        this.setState({
          errorMsg: `Please, provide the data of indicated type ${correctDataType.map(
            (value) => " " + value
          )}`,
          error: true,
        });
      }
    } else {
      this.setState({
        errorMsg: `Please, submit required data ${emptyValueArray.map(
          (value) => " " + value
        )}`,
        error: true,
      });
    }
  }

  async onSaveFurniture(e) {
    e.preventDefault();

    const emptyValueArray = [];
    const correctDataType = [];

    this.state.SKU === "" && emptyValueArray.push("SKU");
    this.state.name === "" && emptyValueArray.push("name");
    this.state.price === "" && emptyValueArray.push("price");
    this.state.furnitureHeight === "" && emptyValueArray.push("height");
    this.state.furnitureLength === "" && emptyValueArray.push("length");
    this.state.furnitureWidth === "" && emptyValueArray.push("width");

    typeof this.state.SKU !== "string" && correctDataType.push("SKU");
    typeof this.state.name !== "string" && correctDataType.push("name");
    isNaN(this.state.price) && correctDataType.push("price");
    isNaN(this.state.furnitureHeight) && correctDataType.push("height");
    isNaN(this.state.furnitureWidth) && correctDataType.push("width");
    isNaN(this.state.furnitureLength) && correctDataType.push("length");

    if (emptyValueArray.length === 0) {
      if (correctDataType.length === 0) {
        try {
          await axios.post(
            "http://localhost/react-php-test/api/products/create.php",
            {
              id: this.state.SKU,
              sku: this.state.SKU,
              name: this.state.name,
              price: this.state.price,
              product_attribute:
                this.state.furnitureHeight +
                "x" +
                this.state.furnitureWidth +
                "x" +
                this.state.furnitureLength,
              type: this.state.selectValue,
            }
          );
          this.setState({
            errorMsg: "",
            error: false,
            saved: true,
          });
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        this.setState({
          errorMsg: `Please, provide the data of indicated type ${correctDataType.map(
            (value) => " " + value
          )}`,
          error: true,
        });
      }
    } else {
      this.setState({
        errorMsg: `Please, submit required data ${emptyValueArray.map(
          (value) => " " + value
        )}`,
        error: true,
      });
    }
  }

  async onSaveBook(e) {
    e.preventDefault();

    const emptyValueArray = [];
    const correctDataType = [];

    this.state.SKU === "" && emptyValueArray.push("SKU");
    this.state.name === "" && emptyValueArray.push("name");
    this.state.price === "" && emptyValueArray.push("price");
    this.state.bookWeight === "" && emptyValueArray.push("book weight");

    typeof this.state.SKU !== "string" && correctDataType.push("SKU");
    typeof this.state.name !== "string" && correctDataType.push("name");
    isNaN(this.state.price) && correctDataType.push("price");
    isNaN(this.state.bookWeight) && correctDataType.push("book weight");

    if (emptyValueArray.length === 0) {
      if (correctDataType.length === 0) {
        try {
          await axios.post(
            "http://localhost/react-php-test/api/products/create.php",
            {
              id: this.state.SKU,
              sku: this.state.SKU,
              name: this.state.name,
              price: this.state.price,
              product_attribute: this.state.bookWeight,
              type: this.state.selectValue,
            }
          );
          this.setState({
            errorMsg: "",
            error: false,
            saved: true,
          });
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        this.setState({
          errorMsg: `Please, provide the data of indicated type ${correctDataType.map(
            (value) => " " + value
          )}`,
          error: true,
        });
      }
    } else {
      this.setState({
        errorMsg: `Please, submit required data ${emptyValueArray.map(
          (value) => " " + value
        )}`,
        error: true,
      });
    }
  }

  render() {
    const { error, errorMsg, selectValue, saved } = this.state;

    if (saved) return <Navigate to="/" />;

    return (
      <>
        <header className="product-add-header">
          <h1 className="heading-product-add">Product Add</h1>
          {selectValue === "DVD" && (
            <>
              <button
                type="submit"
                form="product_form"
                onClick={this.onSaveDvd}
                className="save-btn"
              >
                Save
              </button>
            </>
          )}
          {selectValue === "Furniture" && (
            <>
              <button
                type="submit"
                form="product_form"
                onClick={this.onSaveFurniture}
                className="save-btn"
              >
                Save
              </button>
            </>
          )}
          {selectValue === "Book" && (
            <>
              <button
                type="submit"
                form="product_form"
                onClick={this.onSaveBook}
                className="save-btn"
              >
                Save
              </button>
            </>
          )}

          <Link to={"/"}>
            <button className="cancel-btn">Cancel</button>
          </Link>
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
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="price">Price</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="price"
                  placeholder="Enter product price"
                  value={this.state.price}
                  onChange={this.onPriceChange}
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
                      type="text"
                      id="size"
                      placeholder="DVD Size"
                      value={this.state.dvdSize}
                      onChange={this.onDvdSizeChange}
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
                      type="text"
                      id="height"
                      placeholder="Height"
                      value={this.state.furnitureHeight}
                      onChange={this.onFurnitureHeightChange}
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
                      type="text"
                      id="width"
                      placeholder="Width"
                      value={this.state.furnitureWidth}
                      onChange={this.onFurnitureWidthChange}
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
                      type="text"
                      id="length"
                      placeholder="Length"
                      value={this.state.furnitureLength}
                      onChange={this.onFurnitureLengthChange}
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
                      type="text"
                      id="weight"
                      placeholder="Weight"
                      value={this.state.bookWeight}
                      onChange={this.onBookWeightSizeChange}
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
