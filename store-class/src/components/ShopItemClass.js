import React from 'react';

export class ShopItemClass extends React.Component {
  render() {
    const toCurrency = (price, nameOfCurr, localFormat) => {
      return new Intl.NumberFormat(localFormat, {
        currency: nameOfCurr,
        style: 'currency'
      }).format(price)
    }
    return <>
      <div class="main-content">
          <h2>{this.props.item.brand}</h2>
          <h1>{this.props.item.title}</h1>
          <h3>{this.props.item.description}</h3>
          <div class="description">
            {this.props.item.descriptionFull}
          </div>
          <div class="highlight-window mobile"><div class="highlight-overlay"></div></div>
          <div class="divider"></div>
          <div class="purchase-info">
            <div class="price">{toCurrency(this.props.item.price, this.props.item.currency, 'en-EN')}</div>
            <button>Добавить в корзину</button>
          </div>
        </div>
      </>
  }
}