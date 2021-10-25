import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

export default function Header() {
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: 'LOG_OUT' });
  }
  const content = (userDetails.isLogged) ? (
    <div className="header">
      <div className="header-left">
        <Link to="/home" >
          <div className="title">Lets Code</div>
        </Link >
      </div>
      <div className="header-right">
        <div className="welcome-text">Hello,{userDetails.name}</div>
        <Button onClick={logout} variant="contained" className="auth-btn logout-btn">logout</Button>
      </div>
    </div>
  ) : (
    <div className="header">
      <div className="header-left">
        <Link to="/" >
          <div className="title">FORMUP</div>
        </Link >
      </div>
      <div className="header-right">
        <div className="auth-option">
          <Link to="/auth">
            <Button variant="contained" className="auth-btn" color="primary">signup</Button>
          </Link>
          <Link to="/auth">
            <Button variant="contained" className="auth-btn" color="primary">login</Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return content;
}

