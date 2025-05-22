
import './Login.css'; // Create a CSS file for styling
import PageContent from '../Page-Content.module.css'
import {  useNavigate } from 'react-router-dom';
const Login = () => {
   const navigation = useNavigate();
  return (
    <div className='login-page'>
<div className="login-container">
      <div className="login-card">
        <div className="login-title">
          <h1>Welcome to </h1>
          <h1 className='brand'> EcoMatch</h1>
        </div>
        <form className="login-form">
          <div className="form-group">
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
              <input type="password" id="password" placeholder="Enter your password" />
              <div className="forgot-password">
                <a href="/forgot-password">Forgot password?</a>
              </div>
            </div>
          <button type="submit" className="login-button" onClick={()=>{
           
            navigation('/Search');
          }}>Sign In</button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    
    </div>

    <div className={PageContent['page-content']} style={{width:'50vw'}} >
      <img src = "src/assets/logo_green_bg.png" alt="Landing Page" className="landing-image" />
    </div>
    </div>
    
  );
};

export default Login;