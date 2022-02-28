import React, { Component } from "react";
import "./ProductList.style.scss";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import Title from "../../components/TItle";
import Header from "../../components/Header/Header.component";
import LineBreak from "../../components/LineBreak/LineBreak.component";
import ProductContainer from "../../components/ProductContainer";

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
