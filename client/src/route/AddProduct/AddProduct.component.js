import React, { Component } from "react";
import "./AddProduct.style.scss";
import InputErrMsg from "../../component/inputErrMsg";
import { Navigate } from "react-router-dom";
import axios from "axios";
import CancelBtn from "../../component/CancelBtn";
import Title from "../../component/TItle";
import SaveBtn from "../../component/SaveBtn";
import Header from "../../component/Header";
import LineBreak from "../../component/LineBreak";
import BookForm from "../../component/BookForm";
import DvdForm from "../../component/DvdForm";
import FurnitureForm from "../../component/FurnitureForm";
import { Product } from "../../constant/Product";

const { BOOK, DVD, FURNITURE } = Product;

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
      saved: false,
      SKU: "",
      name: "",
      price: "",
      selectValue: DVD,
      dvdSize: "",
      furnitureHeight: "",
      furnitureLength: "",
      furnitureWidth: "",
      bookWeight: "",
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

  async onSave(e) {
    e.preventDefault();

    const {
      selectValue,
      SKU,
      name,
      price,
      dvdSize,
      bookWeight,
      furnitureHeight,
      furnitureLength,
      furnitureWidth,
    } = this.state;

    let emptyValueArray = [];
    const correctDataType = [];

    const productObj = {
      SKU,
      name,
      price,
    };

    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    emptyValueArray = Object.keys(productObj).filter(
      (key) => productObj[key] === ""
    );

    isNaN(price) && correctDataType.push("price");

    if (selectValue === DVD) {
      if (!dvdSize) {
        emptyValueArray = [...emptyValueArray, "size"];
      }

      isNaN(dvdSize) && correctDataType.push("size");
    }

    if (selectValue === BOOK) {
      if (!bookWeight) {
        emptyValueArray = [...emptyValueArray, "weight"];
      }

      isNaN(bookWeight) && correctDataType.push("weight");
    }

    if (selectValue === FURNITURE) {
      if (!furnitureHeight) {
        emptyValueArray = [...emptyValueArray, "height"];
      }

      if (!furnitureLength) {
        emptyValueArray = [...emptyValueArray, "length"];
      }

      if (!furnitureWidth) {
        emptyValueArray = [...emptyValueArray, "width"];
      }

      isNaN(furnitureHeight) && correctDataType.push("height");
      isNaN(furnitureLength) && correctDataType.push("length");
      isNaN(furnitureWidth) && correctDataType.push("width");
    }

    if (emptyValueArray.length === 0) {
      if (correctDataType.length === 0) {
        try {
          console.log(selectValue);

          selectValue === BOOK &&
            (await axios.post(
              `${protocol}//${hostname}/products/public/`,
              {
                sku: SKU,
                name: name,
                price: price,
                weight: bookWeight,
              },
              { params: { product_type: BOOK } }
            ));

          selectValue === DVD &&
            (await axios.post(
              `${protocol}//${hostname}/products/public/`,
              {
                sku: SKU,
                name: name,
                price: price,
                size: dvdSize,
              },
              { params: { product_type: DVD } }
            ));

          selectValue === FURNITURE &&
            (await axios.post(
              `${protocol}//${hostname}/products/public/`,
              {
                sku: SKU,
                name: name,
                price: price,
                height: furnitureHeight,
                width: furnitureWidth,
                length: furnitureLength,
              },
              { params: { product_type: FURNITURE } }
            ));

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
    const {
      error,
      errorMsg,
      selectValue,
      saved,
      SKU,
      price,
      name,
      dvdSize,
      furnitureHeight,
      furnitureLength,
      furnitureWidth,
      bookWeight,
    } = this.state;

    if (saved) return <Navigate to="/" />;

    return (
      <>
        <Header>
          <Title pageTitle="Product Add" />
          <SaveBtn onSave={this.onSave} />
          <CancelBtn />
        </Header>

        <LineBreak />
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
                  value={SKU}
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
                  value={name}
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
                  value={price}
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
                  defaultValue={selectValue}
                  onChange={this.onDropdownChange}
                >
                  <option id="DVD" value={DVD}>
                    DVD
                  </option>
                  <option id="Furniture" value={FURNITURE}>
                    Furniture
                  </option>
                  <option id="Book" value={BOOK}>
                    Book
                  </option>
                </select>
              </div>
            </div>

            {selectValue === DVD && (
              <>
                <DvdForm
                  dvdSize={dvdSize}
                  onDvdSizeChange={this.onDvdSizeChange}
                />
              </>
            )}

            {selectValue === FURNITURE && (
              <>
                <FurnitureForm
                  furnitureHeight={furnitureHeight}
                  furnitureWidth={furnitureWidth}
                  furnitureLength={furnitureLength}
                  onFurnitureHeightChange={this.onFurnitureHeightChange}
                  onFurnitureWidthChange={this.onFurnitureWidthChange}
                  onFurnitureLengthChange={this.onFurnitureLengthChange}
                />
              </>
            )}

            {selectValue === BOOK && (
              <>
                <BookForm
                  bookWeight={bookWeight}
                  onBookWeightSizeChange={this.onBookWeightSizeChange}
                />
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
