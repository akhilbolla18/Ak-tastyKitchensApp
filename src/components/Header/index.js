import {Link, withRouter} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {
  AiFillHome,
  AiFillCloseCircle,
  AiOutlineShoppingCart,
} from 'react-icons/ai'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const getColor = current => {
    const {history} = props
    if (history.location.pathname === current) {
      // console.log(history.location.pathname)
      return '#f7931e'
    }
    return '#334155'
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        console.log(cartList)

        return (
          <>
            {cartItemsCount > 0 && (
              <span className="cart-count-badge">{cartList.length}</span>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-bar-large-container">
        <div className="icon-container">
          <Link to="/" className="nav-link">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633608363/Frame_274_mqin4h.png"
              alt="website logo"
            />
          </Link>
          <h1 className="icon-heading">Tasty Kitchen</h1>
        </div>

        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li className="nav-menu-item" style={{color: getColor('/')}}>
              Home
            </li>
          </Link>

          <Link to="/cart" className="nav-link">
            <li className="nav-menu-item" style={{color: getColor('/cart')}}>
              Cart
              {renderCartItemsCount()}
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <Popup
          modal
          trigger={
            <button
              className="hamburger-icon-button"
              type="button"
              testid="hamburgerIconButton"
            >
              <GiHamburgerMenu size="30" />
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="modal-container">
              <button
                className="close-button"
                type="button"
                testid="closeButton"
                onClick={() => close()}
              >
                <AiFillCloseCircle size="30" color="#616e7c" />
              </button>
              <ul className="nav-links-list">
                <li className="nav-link-item">
                  <Link className="nav-link" to="/" onClick={() => close()}>
                    <AiFillHome size="36" />
                    <p
                      className="nav-link-content"
                      style={{color: getColor('/')}}
                    >
                      Home
                    </p>
                  </Link>
                </li>
                <li className="nav-link-item">
                  <Link className="nav-link" to="/cart" onClick={() => close()}>
                    <AiOutlineShoppingCart size="32" />
                    <p
                      className="nav-link-content"
                      style={{color: getColor('/cart')}}
                    >
                      Cart{renderCartItemsCount()}
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
