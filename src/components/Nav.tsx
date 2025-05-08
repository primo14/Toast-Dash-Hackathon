import './Nav.css'; // Create a CSS file for styling
import Logo from '../assets/logo.png'; // Import your logo image

const Nav = () => {
  return (
    <div className="vertical-nav">
      <div className="logo-container">
        <img src = {Logo} className="logo" width={200} height={200} />
      </div>
      <div className='nav-container'>
        <p className="nav-subtitle">Producing Waste</p>
        <ul className="nav-list">
          <li className="nav-item">Home</li>
          <li className="nav-item">Profile</li>
          <li className="nav-item">Settings</li>
          <li className="nav-item">Logout</li>
        </ul>
        <hr ></hr>
        <p className="nav-subtitle">Buying Waste</p>
        <ul className="nav-list">
          <li className="nav-item">Home</li>
          <li className="nav-item">Profile</li>
          <li className="nav-item">Settings</li>
          <li className="nav-item">Logout</li>
        </ul>
      </div>
     
    </div>
  );
};

export default Nav;