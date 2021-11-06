import React from 'react';
import './Auth.css';
import { LoginForm } from './LoginForm';
import { useSelector } from 'react-redux';
import { SignupForm } from './SignupForm';
import { Redirect } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

export default function Auth() {
  const userDetails = useSelector(state => state.userDetails);
  const [active, setActive] = React.useState("signup");


  if (userDetails.isLogged) {
    return <Redirect to={`users/${userDetails.id}`} />
  } else {
    return (
      <Box className="auth-page">
        <div className="auth">
          <Button
            onClick={() => setActive(active === 'login' ? "signup" : "login")}
            className="toggle-btn"
            variant="contained"
            color="primary"
          >
            {active === 'login' ? "signup" : "login"}
          </Button>
          <div className="auth-form">
            {active === 'signup' && <SignupForm />}
            {active === 'login' && <LoginForm />}
          </div>
        </div>
      </Box>
    )
  }
}
