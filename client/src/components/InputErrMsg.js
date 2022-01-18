import React, { Component } from "react";
import "../styles/css/error-msg.css";

export class InputErrMsg extends Component {
  render() {
    const { errorMsg } = this.props;

    return <div className="error-msg">{errorMsg}</div>;
  }
}

export default InputErrMsg;
