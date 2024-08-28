import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItems = props => {
  const {productData} = props
  const {dishCurrency, dishId, dishImage} = productData
  const {dishName, dishPrice, quantity} = productData
  // const [quantityItem, setQuantity] = useState(quantity)
  const {onProductData} = useContext(CartContext)

  const removeCartItem = () =>
    onProductData(dishId, 0, dishCurrency, dishImage, dishPrice, dishName)

  return (
    <li className="cart-items">
      <img src={dishImage} alt={dishName} className="dish-img-size" />
      <h1 className="dish-name-cart">{dishName}</h1>
      <div className="quantity-container">
        <button
          type="button"
          className="btn-hide quantity quantity-btn"
          onClick={() =>
            onProductData(
              dishId,
              quantity - 1,
              dishCurrency,
              dishImage,
              dishPrice,
              dishName,
            )
          }
        >
          -
        </button>
        <p className="quantity">{quantity}</p>
        <button
          type="button"
          className="btn-hide quantity quantity-btn"
          onClick={() =>
            onProductData(
              dishId,
              quantity + 1,
              dishCurrency,
              dishImage,
              dishPrice,
              dishName,
            )
          }
        >
          +
        </button>
      </div>
      <p className="dish-name-cart">{`${dishCurrency} ${
        dishPrice * quantity
      }`}</p>
      <button type="button" className="logout-btn" onClick={removeCartItem}>
        Remove
      </button>
    </li>
  )
}

export default CartItems
