import React, { Component } from "react";
import "./InputErrMsg.style.scss";
import PropTypes from "prop-types";

export class InputErrMsg extends Component {
  render() {
    const { errorMsg } = this.props;

    return <div className="error-msg">{errorMsg}</div>;
  }
}

InputErrMsg.propTypes = {
  errorMsg: PropTypes.string,
};

InputErrMsg.defaultProps = {
  errorMsg: "Error",
};

export default InputErrMsg;
