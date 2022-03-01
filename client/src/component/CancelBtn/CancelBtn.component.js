import React, { Component } from "react"
import "./CancelBtn.style.scss"
import { Link } from "react-router-dom"

export class CancelBtn extends Component {
  render () {
    return (
      <Link to={"/"}>
        <button className="cancel-btn">Cancel</button>
      </Link>
    )
  }
}

export default CancelBtn
