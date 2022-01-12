import React from 'react';
import './header.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import cogoToast from 'cogo-toast';
import { LOGOUT } from '../../redux/actions/User';
import logo from './lc-logo.png';

export default function Header() {
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const history= useHistory();
  const params = useParams();
  console.log(params,history.location);
  const logout = () => {
    dispatch(LOGOUT());
    history.push('/');
    cogoToast.success("logged out successfully!");
  }
  const content = (userDetails.isLogged) ? (
    <Box display="flex" alignItems="center" className="header">
      <div className="header-left">
        <Link to="/home" >
          <img src={logo} alt="Lets Code" className="lc-logo"/>
        </Link >
      </div>
      <Box display="flex" alignItems="center" className="header-right">
        <div className="welcome-text">Hello, {userDetails.name}</div>
        <Button onClick={logout} variant="contained" className="auth-btn logout-btn">logout</Button>
      </Box>
    </Box>
  ) : (
    <Box display="flex" alignItems="center" className="header">
      <div className="header-left">
        <Link to="/" >
          <img src={logo} alt="Lets Code" className="lc-logo"/>
        </Link >
      </div>
      {params.type !== 'signup' && 
        params.type !== 'login' && 
        <Box display="flex" alignItems="center" className="header-right">
          <div className="auth-option">
            <Link to="/auth/signup">
              <Button variant="contained" className="auth-btn" color="primary">signup</Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="contained" className="auth-btn" color="primary">login</Button>
            </Link>
          </div>
        </Box>
      }
    </Box>
  );

  return content;
}

