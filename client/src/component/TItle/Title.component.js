import React, { Component } from "react";
import "./Title.style.scss";
import PropTypes from "prop-types";

export class Title extends Component {
  render() {
    const { pageTitle } = this.props;

    return <h1 className="heading-product-list">{pageTitle}</h1>;
  }
}

Title.propTypes = {
  pageTitle: PropTypes.string,
};

Title.defaultProps = {
  pageTitle: "Product List",
};

export default Title;
