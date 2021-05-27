import React, { useState } from 'react';
import './form.css';
import { useDispatch } from 'react-redux';
import * as userActions from '../../redux/actions/User';
import validateInfo from './validation';
import * as api from '../../api/index';
import { GoogleLogin } from 'react-google-login';

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    emailError: '',
    nameError: '',
    passwordError: ''
  });
  const dispatch = useDispatch();

  // signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInfo('signup', formData);
    const noErrors = Object.keys(errors).length === 0 && errors.constructor === Object;
    if (!noErrors) {
      setFormData({
        ...formData,
        emailError: errors.email || '',
        nameError: errors.name || '',
        passwordError: errors.password || '',
      });
      return;
    }
    // user already exists
    const user = await api.getUser({ name: formData.name, email: formData.email });
    if (user.data) {
      alert("user already exists,try logging in");
      return;
    }
    // name taken
    const isTaken = await api.getUser({ name: formData.name });
    if (isTaken.data) {
      setFormData({ ...formData, nameError: 'name taken' });
      return;
    }
    dispatch(userActions.createUser(formData));
  };

  const googleResponse = async (res) => {
    const profile = res.profileObj;
    // has registered email
    const user = await api.getUser({ "email": profile.email });
    if (user.data) {
      localStorage.setItem('user', JSON.stringify(user.data));
      dispatch({ type: 'SIGN_IN', payload: user.data });
    } else {
      api.createUser({ name: profile.name, email: profile.email })
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          dispatch({ type: 'SIGN_IN', payload: res.data });
        })
        .catch(error => {
          alert("error logging in,Please try again!");
        });
    }
  }

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
      <button className="submit-btn">Signup</button>
      <div style={{ textAlign: 'center', margin: "1rem 0" }}>OR</div>
      {/* google-client-secret:Ur24hyV4Lt9BpJpE4mT52eVX */}
      <GoogleLogin
        clientId="325494090646-sulug0movv3sqic1fhipt82ssj2inast.apps.googleusercontent.com"
        onSuccess={googleResponse}
        onFailure={googleResponse}
      />
    </form>
  );
}