import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-icon-container">
      <img
        className="footer-logo"
        src="https://res.cloudinary.com/dumbnbfci/image/upload/v1688905377/Frame_275_dc0fjo.svg"
        alt="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchen</h1>
    </div>
    <h1 className="footer-text">
      The only thing we are serious about is food. <br />
      Contact us on
    </h1>
    <div className="social-icons-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="social-icon"
      />
      <FaInstagram testid="instagram-social-icon" className="social-icon" />
      <FaTwitter testid="twitter-social-icon" className="social-icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="social-icon" />
    </div>
  </div>
)

export default Footer
