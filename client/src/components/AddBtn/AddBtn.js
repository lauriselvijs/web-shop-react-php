import React, { Component } from "react";
import "./AddBtn.style.scss";
import { Link } from "react-router-dom";

export class AddBtn extends Component {
  render() {
    return (
      <>
        <Link to={"/addproduct"}>
          <button className="add-item-btn">ADD</button>
        </Link>
      </>
    );
  }
}

export default AddBtn;
