import './Nav.css'; // Create a CSS file for styling
import Logo from '../assets/logo.png'; // Import your logo image

const Nav = () => {
  return (
    <div className="vertical-nav">
      <div className="logo-container">
        <img src = {Logo} className="logo" width={100} height={100} style={{marginLeft:'0'}}/>
      </div>
      <div className='nav-container'>
        <p className="nav-subtitle">Producing Waste</p>
        <ul className="nav-list">
          <li className="nav-item">My Listings</li>
          <li className="nav-item">Add New Listing</li>
          <li className="nav-item">Inquires</li>
          <li className="nav-item">Sold</li>
        </ul>
        <hr ></hr>
        <p className="nav-subtitle" >Buying Waste</p>
        <ul className="nav-list">
          <li className="nav-item"style={{ fontWeight: 'bold' }} >Search</li>
          <li className="nav-item">Saved</li>
          <li className="nav-item">Messages</li>
          <li className="nav-item">Purchase History</li>
        </ul>
      </div>
     <div className="nav-footer"  style={{ paddingBottom: '4vh', paddingLeft: '4vh', display: 'flex', flexDirection:'row' }}>
      <img src ='profile.png' className="profile" width={50} height={50} />
      <p className="nav-footer-text">My Profile</p>
    </div>
    </div>
  );
};

export default Nav;