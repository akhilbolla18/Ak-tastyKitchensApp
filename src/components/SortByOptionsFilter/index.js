import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const SortByOptionsFilter = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {sortbyOptions, activeOptionId} = props
  return (
    <div className="restaurant-header">
      <h1 className="popular-heading">Popular Restaurants</h1>
      <div className="select-container">
        <p className="select-text">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-by-container">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-text">Sort by</p>
          <select
            className="sort-options"
            value={activeOptionId}
            onChange={onChangeSortby}
          >
            {sortbyOptions.map(eachOption => (
              <option
                key={eachOption.id}
                value={eachOption.value}
                className="select-options"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SortByOptionsFilter
