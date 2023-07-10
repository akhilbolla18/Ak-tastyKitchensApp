import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import RestaurantBanner from '../RestaurantBanner'
import FoodItemCard from '../FoodItemCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetailsRoute extends Component {
  state = {
    restaurantData: {},
    foodItemsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const restaurantData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const foodItems = data.food_items.map(eachFoodItem => ({
        cost: eachFoodItem.cost,
        foodType: eachFoodItem.food_type,
        id: eachFoodItem.id,
        imageUrl: eachFoodItem.image_url,
        name: eachFoodItem.name,
        rating: eachFoodItem.rating,
      }))
      this.setState({
        restaurantData,
        foodItemsList: foodItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRestaurantDetailsView = () => {
    const {restaurantData, foodItemsList} = this.state
    return (
      <>
        <RestaurantBanner restaurantData={restaurantData} />
        <ul className="food-items-list">
          {foodItemsList.map(eachItem => (
            <FoodItemCard foodItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div testid="restaurant-details-loader" className="restaurant-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetailsRoute
