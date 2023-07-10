import {Component} from 'react'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

import SortByOptionsFilter from '../SortByOptionsFilter'
import RestaurantCard from '../RestaurantCard'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularRestaurants extends Component {
  state = {
    restaurantsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortByOptions[1].value,
    activePage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getPopularRestaurants()
  }

  getPopularRestaurants = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const totalRestaurants = data.total
    const totalPages = Math.ceil(totalRestaurants / limit)
    if (response.ok) {
      const updatedData = data.restaurants.map(restaurant => ({
        id: restaurant.id,
        cuisine: restaurant.cuisine,
        imageUrl: restaurant.image_url,
        name: restaurant.name,
        rating: restaurant.user_rating.rating,
        totalReviews: restaurant.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
        totalPages,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getPopularRestaurants)
  }

  decrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getPopularRestaurants,
      )
    }
  }

  incrementPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getPopularRestaurants,
      )
    }
  }

  renderRestaurantsListView = () => {
    const {restaurantsList, activeOptionId, activePage, totalPages} = this.state
    console.log(totalPages, activePage)
    const shouldShowRestaurantsList = restaurantsList.length > 0

    return shouldShowRestaurantsList ? (
      <>
        <SortByOptionsFilter
          activeOptionId={activeOptionId}
          sortbyOptions={sortByOptions}
          changeSortby={this.changeSortby}
        />
        <hr className="hr-line" />
        <ul className="restaurants-list">
          {restaurantsList.map(restaurant => (
            <RestaurantCard restaurantData={restaurant} key={restaurant.id} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-button"
            onClick={this.decrementPage}
            testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={20} />
          </button>
          <p testid="active-page-number" className="page-count">
            {activePage}
          </p>
          <span
            className="page-count"
            style={{marginLeft: '5px', marginRight: '5px'}}
            // testid="active-page-number"
          >
            0f
          </span>
          <p className="page-count"> {totalPages}</p>
          <button
            type="button"
            className="pagination-button"
            onClick={this.incrementPage}
            testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={20} />
          </button>
        </div>
      </>
    ) : (
      <div className="no-restaurants-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-restaurants-img"
          alt="no restaurants"
        />
        <h1 className="no-restaurants-heading">No Products Found</h1>
        <p className="no-restaurants-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div
      className="restaurants-loader-container"
      testid="restaurants-list-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="restaurants-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="restaurants failure"
        className="restaurants-failure-img"
      />
      <h1 className="restaurants-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="restaurants-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderAllRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsListView()
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
      <div className="all-restaurants-section">
        {this.renderAllRestaurants()}
      </div>
    )
  }
}

export default PopularRestaurants
