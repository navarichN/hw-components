import '../App.css';
import PropTypes from 'prop-types';

export function ShopItemFunc(props) {
  const toCurrency = (price, nameOfCurr, localFormat) => {
    return new Intl.NumberFormat(localFormat, {
      currency: nameOfCurr,
      style: 'currency'
    }).format(price)
  }
  return (
    <div className="main-content">
      <h2>{props.item.brand}</h2>
      <h1>{props.item.title}</h1>
      <h3>{props.item.description}</h3>
      <div className="description">
        {props.item.descriptionFull}
      </div>
      <div className="highlight-window mobile"><div className="highlight-overlay"></div></div>
      <div className="divider"></div>
      <div className="purchase-info">
        <div className="price">{toCurrency(props.item.price, props.item.currency, 'en-EN')}</div>
        <button>Добавить в корзину</button>
      </div>
    </div>
  )
}

ShopItemFunc.propTypes = {
  item: PropTypes.shape({
    brand: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    descriptionFull: PropTypes.string,
    price: PropTypes.number,
    currency: PropTypes.string,
  })
}