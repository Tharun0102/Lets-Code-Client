import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Router from '../../Router';
import './NewUserHome.css';

export default function NewUserHome() {

  return (
    <div className="new-user-home">
      <div className="welcome">Welcome!</div>
      <div className="text">
        <Link to="/auth">signup</Link> or <Link to="/auth">login</Link> to start coding.
      </div>
    </div>
  )
}
