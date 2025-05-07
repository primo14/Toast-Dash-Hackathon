import './Nav.css'; // Create a CSS file for styling

const Nav = () => {
  return (
    <div className="vertical-nav">
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Profile</li>
        <li className="nav-item">Settings</li>
        <li className="nav-item">Logout</li>
      </ul>
    </div>
  );
};

export default Nav;