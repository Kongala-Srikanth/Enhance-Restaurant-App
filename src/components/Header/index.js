import {useContext} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {productData} = useContext(CartContext)
  const {restaurantName} = props

  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      {restaurantName !== '' && (
        <Link to="/" className="link">
          <h1 className="logoName">{restaurantName}</h1>
        </Link>
      )}

      <div className="cart-container">
        <p>My Orders</p>
        <Link to="/cart" className="">
          <button
            type="button"
            className="btn-hide cart-btn"
            data-testid="cart"
          >
            <AiOutlineShoppingCart />
            <p className="quantity-number">{productData.length}</p>
          </button>
        </Link>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
