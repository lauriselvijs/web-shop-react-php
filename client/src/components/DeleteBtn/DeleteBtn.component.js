import React, { Component } from "react";
import "./DeleteBtn.style.scss";
import PropTypes from "prop-types";
import axios from "axios";

export class DeleteBtn extends Component {
  onDelete() {
    const checkboxes = document.getElementsByClassName("delete-checkbox");
    let checkboxArray = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        checkboxArray.push(checkboxes[i].name);
      }
    }

    checkboxArray.map(async (id) => {
      try {
        await axios.delete("http://localhost/public/products/", {
          data: { id },
        });
        window.location.reload();
      } catch (error) {
        return error;
      }
    });
  }

  render() {
    const { onDelete } = this.props;

    return (
      <button
        id="delete-product-btn"
        className="mass-delete-btn"
        onClick={onDelete}
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
