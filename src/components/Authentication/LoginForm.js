import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validateInfo from './validation';
import * as api from '../../api/index';

import './form.css';

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    usernameError: '',
    passwordError: ''
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInfo('login', formData);
    const noErrors = Object.keys(errors).length === 0 && errors.constructor === Object;
    if (!noErrors) {
      setFormData({
        ...formData,
        usernameError: errors.username || '',
        passwordError: errors.password || '',
      });
      return;
    }
    const user = await api.getUser(formData.username)
    console.log(formData.username, user);
    if (user.data) {
      dispatch({ type: 'SIGN_IN', payload: user.data });
      console.log("dispatched!", user.data);
    } else {
      setFormData({
        ...formData,
        usernameError: "user doesn't exist"
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate >
      <div className="input-container">
        <input
          className={`${formData.usernameError === '' ? '' : "input-error"}`}
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        {formData.usernameError !== '' && <span className="error-msg">{formData.usernameError}</span>}
      </div>
      <div className="input-container">
        <input
          className={`${formData.passwordError === '' ? '' : "input-error"}`}
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {formData.passwordError !== '' && <span className="error-msg">{formData.passwordError}</span>}
      </div>
      <button className="submit-btn">Login</button>
    </form>
  );
}