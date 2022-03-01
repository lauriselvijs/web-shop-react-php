import React, { Component } from "react"
import "./Footer.style.scss"
import PropTypes from "prop-types"
import LineBreak from "../LineBreak/LineBreak.component"

export class Footer extends Component {
  render () {
    const { footerText } = this.props
    return (
      <footer className="footer-container">
        <LineBreak />
        <div className="footer-text">{footerText}</div>
      </footer>
    )
  }
}

Footer.propTypes = {
  footerText: PropTypes.string
}

Footer.defaultProps = {
  footerText: "Scandiweb Test assignment"
}

export default Footer
