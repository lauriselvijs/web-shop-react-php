import React, { Component } from "react"
import "./BookForm.style.scss"
import PropTypes from "prop-types"

export class BookForm extends Component {
  render () {
    const { bookWeight, onBookWeightSizeChange } = this.props

    return (
      <div className="row">
        <div className="col-25">
          <label htmlFor="book-weight">Weight (KG)</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            id="weight"
            placeholder="Weight"
            value={bookWeight}
            onChange={onBookWeightSizeChange}
          />
          <div className="product-attribute-info-msg">
            Please, provide weight in KG
          </div>
        </div>
      </div>
    )
  }
}

BookForm.propTypes = {
  bookWeight: PropTypes.string,
  onBookWeightSizeChange: PropTypes.func
}

BookForm.defaultProps = {
  bookWeight: "100",
  onBookWeightSizeChange: () => {}
}

export default BookForm
