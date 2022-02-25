import React, { Component } from "react";
import "./Header.style.scss";
import PropTypes from "prop-types";

export class Header extends Component {
  render() {
    const { children } = this.props;
    return <header className="page-header">{children}</header>;
  }
}

Header.propTypes = {
  children: PropTypes.array,
};

Header.defaultProps = {
  children: [],
};

export default Header;
