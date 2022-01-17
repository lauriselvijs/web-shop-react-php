import React, { Component } from "react";

export class InputErrMsg extends Component {
  render() {
    const { errorMsg } = this.props;

    return <div>{errorMsg}</div>;
  }
}

export default InputErrMsg;
