import React from 'react';
import './header.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


export default function Header() {
  const userDetails = useSelector(state => state.userDetails);
  const projectDetails = useSelector(state => state.projectDetails);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: 'LOG_OUT' });
  }
  const content = (userDetails.isLogged) ? (
    <div className="header">
      <Link to="/home" >
        <div className="title">FORMUP</div>
      </Link >
      <div className="welcome-text">Hello,{userDetails.username}</div>
      <button onClick={logout} className="logout-btn">logout</button>
    </div>
  ) : (
    <div className="header">
      < Link to="/" >
        <div className="title">FORMUP</div>
      </Link >
      <div className="auth-option">
        <Link to="/auth">
          <div>signup</div>
        </Link>
        <Link to="/auth">
          <div>login</div>
        </Link>
      </div>
    </div>
  );
  return content;
}

