import React, { Component } from "react";
import "./DvdForm.style.scss";
import PropTypes from "prop-types";

export class DvdForm extends Component {
  render() {
    const { dvdSize, onDvdSizeChange } = this.props;

    return (
      <div className="row">
        <div className="col-25">
          <label htmlFor="dvd-size">Size (MB)</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            id="size"
            placeholder="DVD Size"
            value={dvdSize}
            onChange={onDvdSizeChange}
          />
          <div className="product-attribute-info-msg">
            Please, provide size in MB
          </div>
        </div>
      </div>
    );
  }
}

DvdForm.propTypes = {
  dvdSize: PropTypes.string,
  onDvdSizeChange: PropTypes.func,
};

DvdForm.defaultProps = {
  dvdSize: "100",
  onDvdSizeChange: () => {},
};

export default DvdForm;
