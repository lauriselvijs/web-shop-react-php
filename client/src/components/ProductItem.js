import React, { Component } from "react";
import "../styles/css/product-item.css";
import PropTypes from "prop-types";

export class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.onChecked = this.onChecked.bind(this);

    this.state = {
      checked: false,
    };
  }

  onChecked() {
    this.setState({
      checked: !this.state.checked,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product !== this.props.product) {
      this.setState({
        checked: false,
      });
    }
  }

  render() {
    const {
      product: { sku, name, price, product_attribute },
      onDelete,
    } = this.props;

    const { checked } = this.state;

    //console.log(this.props.product);

    return (
      <div className="product-item">
        <div>{sku}</div>
        <div>{name}</div>
        <div>{price} $</div>
        <div>
          {sku.indexOf("JVC") === 0 && <>Size: {product_attribute} MB</>}
          {sku.indexOf("GGW") === 0 && <>Weight: {product_attribute} KG</>}
          {sku.indexOf("TRI") === 0 && <>Dimension: {product_attribute}</>}
        </div>
        <input
          type="checkbox"
          checked={checked}
          className="delete-checkbox"
          onClick={onDelete}
          onChange={this.onChecked}
        />
      </div>
    );
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    sku: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    product_attribute: PropTypes.string,
  }),
  checked: PropTypes.bool,
  onDelete: PropTypes.func,
};

ProductItem.defaultProps = {
  product: {
    sku: "JVC200126",
    name: "Acme DISC",
    price: "1.55",
    product_attribute: "700",
  },
  checked: false,
};

export default ProductItem;
