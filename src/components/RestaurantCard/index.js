import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'

import './index.css'

const RestaurantCard = props => {
  const {restaurantData} = props
  const {id, cuisine, imageUrl, name, rating, totalReviews} = restaurantData

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-link">
      <li className="restaurant-card" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine} </p>
          <div className="rating">
            <ImStarFull className="star" />
            <p className="rest-rating">{rating}</p>
            <p className="user-total-reviews">({totalReviews} rating)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
