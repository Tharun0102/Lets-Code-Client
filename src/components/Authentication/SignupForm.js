import React, { useState } from 'react';
import './form.css';
import { useDispatch } from 'react-redux';
import * as userActions from '../../redux/actions/User';
import validateInfo from './validation';
import * as api from '../../api/index';

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    emailError: '',
    usernameError: '',
    passwordError: ''
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInfo('signup', formData);
    const noErrors = Object.keys(errors).length === 0 && errors.constructor === Object;
    if (!noErrors) {
      console.log("errors!", errors);
      setFormData({
        ...formData,
        emailError: errors.email || '',
        usernameError: errors.username || '',
        passwordError: errors.password || '',
      });
      return;
    }
    const user = await api.getUser(formData.username);
    if (user.data) {
      setFormData({ ...formData, usernameError: 'username taken' });
      return;
    }
    dispatch(userActions.createUser(formData));
    console.log("dispatched!");
  };

  return (
    <form onSubmit={handleSubmit} noValidate >
      <div className="input-container" >
        <input
          className={`${formData.emailError === '' ? '' : "input-error"}`}
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formData.emailError !== '' && <span className="error-msg">{formData.emailError}</span>}
      </div>
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
      <button className="submit-btn">Signup</button>
    </form>
  );
}