import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validateInfo from './validation';
import * as api from '../../api/index';
import { GoogleLogin } from 'react-google-login';
import * as userActions from '../../redux/actions/User';

import './form.css';

export function LoginForm() {
  const initialState = {
    name: '',
    password: '',
    nameError: '',
    passwordError: ''
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInfo('login', formData);
    const noErrors = Object.keys(errors).length === 0 && errors.constructor === Object;
    if (!noErrors) {
      setFormData({
        ...formData,
        nameError: errors.name || '',
        passwordError: errors.password || '',
      });
      return;
    }
    const user = await api.getUser({ "name": formData.name, "password": formData.password });

    if (user && user.data) {
      dispatch({ type: 'SIGN_IN', payload: user.data });
      setFormData(initialState);
    } else {
      setFormData({
        ...formData,
        nameError: "user doesn't exist"
      });
    }
  };

  const googleResponse = async (res) => {
    const profile = res.profileObj;
    // has registered email
    const user = await api.getUser({ "email": profile.email });
    if (user.data) {
      dispatch({ type: 'SIGN_IN', payload: user.data });
    } else {
      userActions.createUser({ name: profile.name, email: profile.email });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate >
      <div className="input-container">
        <input
          className={`${formData.nameError === '' ? '' : "input-error"}`}
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {formData.nameError !== '' && <span className="error-msg">{formData.nameError}</span>}
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
      <div style={{ textAlign: 'center', margin: "1rem 0" }}>OR</div>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENTID}
        onSuccess={googleResponse}
        onFailure={googleResponse}
      />
    </form>
  );
}