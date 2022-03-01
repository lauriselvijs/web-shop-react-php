import React, { Component } from "react"
import "./FurnitureForm.style.scss"
import PropTypes from "prop-types"

export class FurnitureForm extends Component {
  render () {
    const {
      furnitureHeight,
      furnitureWidth,
      furnitureLength,
      onFurnitureHeightChange,
      onFurnitureWidthChange,
      onFurnitureLengthChange
    } = this.props

    return (
      <>
        <div className="row">
          <div className="col-25">
            <label htmlFor="height">Height (CM)</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="height"
              placeholder="Height"
              value={furnitureHeight}
              onChange={onFurnitureHeightChange}
            />
            <div className="product-attribute-info-msg">
              Please, provide height in CM
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="width">Width (CM)</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="width"
              placeholder="Width"
              value={furnitureWidth}
              onChange={onFurnitureWidthChange}
            />
            <div className="product-attribute-info-msg">
              Please, provide width in CM
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="length">Length (CM)</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="length"
              placeholder="Length"
              value={furnitureLength}
              onChange={onFurnitureLengthChange}
            />
            <div className="product-attribute-info-msg">
              Please, provide length in CM
            </div>
          </div>
        </div>
      </>
    )
  }
}

FurnitureForm.propTypes = {
  furnitureHeight: PropTypes.string,
  furnitureWidth: PropTypes.string,
  furnitureLength: PropTypes.string,
  onFurnitureHeightChange: PropTypes.func,
  onFurnitureWidthChange: PropTypes.func,
  onFurnitureLengthChange: PropTypes.func
}

FurnitureForm.defaultProps = {
  furnitureHeight: "200",
  furnitureWidth: "200",
  furnitureLength: "200",
  onFurnitureHeightChange: () => {},
  onFurnitureWidthChange: () => {},
  onFurnitureLengthChange: () => {}
}

export default FurnitureForm
