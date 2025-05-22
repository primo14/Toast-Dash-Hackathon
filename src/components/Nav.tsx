import './Nav.css'; // Create a CSS file for styling
import Logo from '../assets/logo.png'; // Import your logo image
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <div className="vertical-nav">
      <div className="logo-container">
        <img src = {Logo} className="logo" width={100} height={100} style={{marginLeft:'0'}}/>
      </div>
      <div className='nav-container'>
        <p className="nav-subtitle">Producing Waste</p>
        <ul className="nav-list">
          <li><Link to='/My-Listings' className='nav-item' >My Listings</Link></li>
          <li><Link to='/My-Listings' className='nav-item' >Add New Listing</Link></li>
           <li><Link to='/My-Listings' className='nav-item' >Inquiries</Link></li>
           <li><Link to='/My-Listings' className='nav-item' >Sold</Link></li>
        </ul>
        <hr ></hr>
        <p className="nav-subtitle" >Buying Waste</p>
        <ul className="nav-list">
          <li style={{ fontWeight: 'bold' }}><Link className='nav-item' to='/Search'>Search </Link> </li>
          <li><Link to='/Saved' className='nav-item' >Saved</Link></li>
          <li><Link to='/Messages' className='nav-item' >Messages</Link></li>
          <li><Link to='' className='nav-item' >Purchase History</Link></li>
        </ul>
      </div>
     <div className="nav-footer"  style={{ paddingBottom: '4vh', paddingLeft: '4vh', display: 'flex', flexDirection:'row' }}>
      <img src ='src/assets/my_profile.svg' className="profile" width={50} height={50} />
      <p className="nav-footer-text">My Profile</p>
    </div>
    </div>
  );
};

export default Nav;