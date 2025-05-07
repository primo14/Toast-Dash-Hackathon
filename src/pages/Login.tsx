
import './Login.css'; // Create a CSS file for styling

const Login = () => {
  return (
    <div className='login-page'>
<div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    
    </div>
    </div>
    
  );
};

export default Login;