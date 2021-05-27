import React from 'react';
import './Auth.css';
import { LoginForm } from './LoginForm';
import { useSelector } from 'react-redux';
import { SignupForm } from './SignupForm';
import { Redirect } from 'react-router-dom';

export default function Auth() {
  const userDetails = useSelector(state => state.userDetails);
  const [active, setActive] = React.useState("signup");


  if (userDetails.isLogged) {
    return <Redirect to={`users/${userDetails.id}`} />
  } else {
    return (
      <div className="auth">
        {active === 'login' && <button className="toggle-btn" onClick={() => setActive("signup")} >Signup</button>}
        {active === 'signup' && <button className="toggle-btn" onClick={() => setActive("login")} > Login</button>}
        <div className="auth-form">
          {active === 'signup' && <SignupForm />}
          {active === 'login' && <LoginForm />}
        </div>
      </div>
    )
  }
}
