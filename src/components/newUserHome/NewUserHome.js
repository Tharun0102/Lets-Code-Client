import React from 'react';
import { Link } from 'react-router-dom';
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
