import {useState, useContext, useEffect} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const Items = props => {
  const [quantity, setQuantity] = useState(0)

  const {itemsData, onIncrease, onDecrease} = props
  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    addonCat,
  } = itemsData

  const user = useContext(CartContext)
  const {onProductData, productData} = user
  const onIncreaseQuantity = () => {
    setQuantity(quantity + 1)
    onIncrease()
  }

  const onDecreasQuantity = () => {
    console.log(quantity)
    if (quantity - 1 === 0) {
      setQuantity(quantity - 1)

      onProductData(dishId, 0, dishCurrency, dishImage, dishPrice, dishName)
    } else {
      const q = quantity <= 1 ? setQuantity(0) : setQuantity(quantity - 1)
      console.log(q)
      if (quantity !== 0) {
        onDecrease()
      }
    }
  }

  const onAddToCart = () => {
    onProductData(
      dishId,
      quantity,
      dishCurrency,
      dishImage,
      dishPrice,
      dishName,
    )
  }

  const available = dishType === 1 && 'available'
  const availableBorder = dishType === 1 && 'available-border'

  const currentFoodQuantity =
    productData.find(each => each.dishId === dishId)?.quantity || 0

  useEffect(() => {
    setQuantity(currentFoodQuantity)
  }, [])

  return (
    <li className="each-dish">
      <div className="row-container">
        <div className={`square ${availableBorder}`}>
          <div className={`circle ${available}`} />
        </div>
        <div>
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-price">{`${dishCurrency} ${dishPrice}`}</p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability && (
            <div className="quantity-container">
              <button
                type="button"
                className="btn-hide quantity quantity-btn"
                onClick={onDecreasQuantity}
              >
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="btn-hide quantity quantity-btn"
                onClick={onIncreaseQuantity}
              >
                +
              </button>
            </div>
          )}
          {quantity !== 0 && (
            <button
              type="button"
              className="add-btn"
              onClick={() => onAddToCart()}
            >
              ADD TO CART
            </button>
          )}

          {addonCat.length !== 0 && (
            <p className="customization-option">Customizations available</p>
          )}
          {!dishAvailability && (
            <p className="customization-option not-available">Not available</p>
          )}
        </div>
      </div>

      <div className="calories-container">
        <p className="calories">{dishCalories} calories</p>
      </div>
      <div>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </li>
  )
}

export default Items
