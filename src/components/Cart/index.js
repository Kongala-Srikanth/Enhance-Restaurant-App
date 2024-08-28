import {useContext} from 'react'
import CartItems from '../CartItems'
import CartContext from '../../context/CartContext'
import Header from '../Header'

import './index.css'

const Cart = () => {
  const {productData, removeAllCartItems} = useContext(CartContext)

  return (
    <>
      <Header restaurantName="UNI Resto Cafe" />

      {productData.length !== 0 ? (
        <>
          <button
            type="button"
            className="logout-btn"
            onClick={removeAllCartItems}
          >
            Remove All
          </button>
          <ul className="all-cart-items">
            {productData.map(each => (
              <CartItems key={each.dishId} productData={each} />
            ))}
          </ul>
        </>
      ) : (
        <div className="no-order-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="no order"
          />
        </div>
      )}
    </>
  )
}

export default Cart
