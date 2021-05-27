import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOG_OUT' });
  }
  const content = (userDetails.isLogged) ? (
    <div className="header">
      <div className="header-left">
        <Link to="/home" >
          <div className="title">FORMUP</div>
        </Link >
      </div>
      <div className="header-right">
        <div className="welcome-text">Hello,{userDetails.name}</div>
        <button onClick={logout} className="auth-btn">logout</button>
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
            <button className="auth-btn">signup</button>
          </Link>
          <Link to="/auth">
            <button className="auth-btn">login</button>
          </Link>
        </div>
      </div>
    </div>
  );

  return content;
}

