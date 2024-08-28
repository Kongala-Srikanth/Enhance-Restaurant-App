import {Component} from 'react'
import Header from '../Header'
import MenuBar from '../MenuBar'
import Items from '../Items'
import './index.css'

class Home extends Component {
  state = {itemsData: [], categoryId: '11', cartQuantity: 0, restaurantName: ''}

  componentDidMount() {
    this.getFoodData()
  }

  getFoodData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()

    const itemsData = data[0].table_menu_list.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
      categoryDishes: each.category_dishes.map(dish => ({
        dishAvailability: dish.dish_Availability,
        dishType: dish.dish_Type,
        dishCalories: dish.dish_calories,
        dishCurrency: dish.dish_currency,
        dishDescription: dish.dish_description,
        dishId: dish.dish_id,
        dishImage: dish.dish_image,
        dishName: dish.dish_name,
        dishPrice: dish.dish_price,
        nexturl: dish.nexturl,
        addonCat: dish.addonCat,
      })),
    }))

    this.setState({itemsData, restaurantName: data[0].restaurant_name})
  }

  onMenuBar = id => this.setState({categoryId: id})

  onIncrease = () =>
    this.setState(prevState => ({cartQuantity: prevState.cartQuantity + 1}))

  onDecrease = () =>
    this.setState(prevState => ({
      cartQuantity:
        prevState.cartQuantity <= 1 ? 0 : prevState.cartQuantity - 1,
    }))

  render() {
    const {itemsData, categoryId, restaurantName} = this.state

    return (
      <div>
        <Header restaurantName={restaurantName} />
        <div className="menu-container">
          {itemsData.length !== 0 && (
            <div className="menu-bar-container">
              {itemsData.map(each => (
                <MenuBar
                  key={each.menuCategoryId}
                  menuCategory={each.menuCategory}
                  categoryId={each.menuCategoryId}
                  onMenuBar={this.onMenuBar}
                  categoryOption={categoryId}
                />
              ))}
            </div>
          )}
        </div>

        <ul>
          {itemsData.length !== 0 &&
            itemsData.map(each => {
              if (each.menuCategoryId === categoryId) {
                return each.categoryDishes.map(item => (
                  <Items
                    key={item.dishId}
                    itemsData={item}
                    onIncrease={this.onIncrease}
                    onDecrease={this.onDecrease}
                  />
                ))
              }
              return null
            })}
        </ul>
      </div>
    )
  }
}

export default Home
