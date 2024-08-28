import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'

import './App.css'

class App extends Component {
  state = {productData: []}

  onProductData = (
    dishId,
    quantity,
    dishCurrency,
    dishImage,
    dishPrice,
    dishName,
  ) => {
    this.setState(prevState => {
      const {productData} = prevState
      const dishIndex = productData.findIndex(each => each.dishId === dishId)

      if (quantity === 0) {
        // Remove the product if the quantity is 0
        return {
          productData: productData.filter(each => each.dishId !== dishId),
        }
      }

      if (dishIndex !== -1) {
        // Update the quantity if dishId exists and quantity is not 0
        const updatedData = [...productData]
        updatedData[dishIndex] = {...productData[dishIndex], quantity}
        return {productData: updatedData}
      }

      // Add a new entry if dishId does not exist and quantity is not 0
      return {
        productData: [
          ...productData,
          {dishId, quantity, dishCurrency, dishImage, dishPrice, dishName},
        ],
      }
    })
  }

  removeAllCartItems = () => this.setState({productData: []})

  render() {
    const {productData} = this.state
    return (
      <CartContext.Provider
        value={{
          productData,
          onProductData: this.onProductData,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
