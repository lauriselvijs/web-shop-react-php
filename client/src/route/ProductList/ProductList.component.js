import React, { Component } from "react";
import "./ProductList.style.scss";
import DeleteBtn from "../../component/DeleteBtn";
import AddBtn from "../../component/AddBtn/AddBtn";
import Title from "../../component/TItle";
import Header from "../../component/Header/Header.component";
import LineBreak from "../../component/LineBreak/LineBreak.component";
import ProductContainer from "../../component/ProductContainer";

export class ProductList extends Component {
  render() {
    return (
      <>
        <Header>
          <Title />
          <AddBtn />
          <DeleteBtn />
        </Header>
        <LineBreak />
        <ProductContainer />
      </>
    );
  }
}

export default ProductList;
