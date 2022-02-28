import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SaveBtn.style.scss";

export class SaveBtn extends Component {
  render() {
    const { onSave } = this.props;

    return (
      <button
        type="submit"
        form="product_form"
        onClick={onSave}
        className="save-btn"
      >
        Save
      </button>
    );
  }
}

SaveBtn.propTypes = {
  onSave: PropTypes.func,
};

SaveBtn.defaultProps = {
  onSave: () => {},
};

export default SaveBtn;
