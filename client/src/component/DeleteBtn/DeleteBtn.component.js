import React, { Component } from "react";
import "./DeleteBtn.style.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { Product } from "../../constant/Product";

const { DVD, FURNITURE, BOOK } = Product;

export class DeleteBtn extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    const checkboxes = document.getElementsByClassName("delete-checkbox");
    const checkboxArray = [];

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        const { name, id } = checkboxes[i];
        checkboxArray.push({ id, name });
      }
    }

    checkboxArray.map(async ({ id, name }) => {
      try {
        name === DVD &&
          (await axios.delete(`${protocol}//${hostname}/products/public/`, {
            params: { product_id: id, product_type: DVD },
          }));
        name === FURNITURE &&
          (await axios.delete(`${protocol}//${hostname}/products/public/`, {
            params: { product_id: id, product_type: FURNITURE },
          }));
        name === BOOK &&
          (await axios.delete(`${protocol}//${hostname}/products/public/`, {
            params: { product_id: id, product_type: BOOK },
          }));
        window.location.reload();
      } catch (error) {
        return error;
      }
    });
  }

  render() {
    return (
      <button
        id="delete-product-btn"
        className="mass-delete-btn"
        onClick={this.onDelete}
      >
        MASS DELETE
      </button>
    );
  }
}

DeleteBtn.propTypes = {
  onDelete: PropTypes.func,
};

DeleteBtn.defaultProps = {
  onDelete: () => {},
};

export default DeleteBtn;
