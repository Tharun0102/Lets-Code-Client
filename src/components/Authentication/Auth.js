import React from 'react';
import './Auth.scss';
import { LoginForm } from './LoginForm';
import { useSelector } from 'react-redux';
import { SignupForm } from './SignupForm';
import { Link, Redirect, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Header from '../Header/Header';

export default function Auth() {
  const params = useParams();
  const userDetails = useSelector(state => state.userDetails);
  const [active, setActive] = React.useState(params.type);

  if (userDetails.isLogged) {
    return <Redirect to={`users/${userDetails.id}`} />
  } else {
    return (
      <>
        <Header />
        <Box className="auth-page">
          <div className="auth">
            {/* <Button
              onClick={() => setActive(active === 'login' ? "signup" : "login")}
              className="toggle-btn"
              variant="contained"
              color="primary"
            >
              {active === 'login' ? "signup" : "login"}
            </Button> */}
            {params.type === 'signup' && <Typography className="auth-text">Create a Lets Code account:</Typography>}
            {params.type === 'login' && <Typography className="auth-text">Login to your account:</Typography>}

            <div className="auth-form">
              {params.type === 'signup' && <SignupForm />}
              {params.type === 'login' && <LoginForm />}
            </div>

            {params.type === 'signup' && <Typography className="auth-footer">Already have an account? <Link to="/auth/login" className="link">Login</Link></Typography>}
            {params.type === 'login' && <Typography className="auth-footer">New to Lets Code? <Link to="/auth/signup" className="link">Signup</Link></Typography>}
            New to Replit? Sign up
          </div>
        </Box>
      </>
    )
  }
}
