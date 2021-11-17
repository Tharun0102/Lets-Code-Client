import React from 'react';
import { Link } from 'react-router-dom';
import './NewUserHome.scss';
import CodeIcon from '@mui/icons-material/Code';
import Header from '../Header/Header';

export default function NewUserHome() {

  return (
    <>
      <Header />
      <div className="new-user-home">
        <CodeIcon className="code-icon" />
        <div className="welcome">Welcome!</div>
        <div className="text">
          <Link to="/auth/signup">signup</Link> or <Link to="/auth/login">login</Link> to start coding.
        </div>
      </div>
    </>
  )
}
