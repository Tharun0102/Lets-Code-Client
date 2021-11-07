import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validateInfo from './validation';
import { login } from '../../api/Auth';

import './form.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';

import cogoToast from 'cogo-toast';
import { updateUser } from '../../redux/actions/User';

export function LoginForm() {
  const initialState = {
    email: '',
    password: '',
    emailError: '',
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
        emailError: errors.email || '',
        passwordError: errors.password || '',
      });
      return;
    }

    login(formData)
      .then((res) => {
        dispatch(updateUser(res?.data));
        cogoToast.success("logged in successfully!");
      })
      .catch(err => {
        cogoToast.error(err.response.data || "couldn't login");
      })

  };

  // const googleResponse = async (res) => {
  //   const profile = res.profileObj;
  //   // has registered email
  //   const user = await api.getUser({ "email": profile.email });
  //   if (user.data) {
  //     // dispatch({ type: 'SIGN_IN', payload: user.data });
  //   } else {
  //     // userActions.createUser({ name: profile.name, email: profile.email });
  //   }
  // }

  return (
    <Box className="form-container">
      <div className="input-container">
        <OutlinedInput
          placeholder="Email"
          type="email"
          className={`input-field ${formData.emailError === '' ? '' : "input-error"}`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formData.emailError !== '' && <span className="error-msg">{formData.emailError}</span>}
      </div>
      <div className="input-container">
        <OutlinedInput
          placeholder="Password"
          type={formData.showPassword ? 'text' : 'password'}
          className={`input-field ${formData.passwordError === '' ? '' : "input-error"}`}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {formData.passwordError !== '' && <span className="error-msg">{formData.passwordError}</span>}
      </div>
      <Button
        variant="contained"
        color="primary"
        className="submit-btn"
        onClick={handleSubmit}
      >
        Login
      </Button>
      {/* <div style={{ textAlign: 'center', margin: "1rem 0" }}>OR</div>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENTID}
        onSuccess={googleResponse}
        onFailure={googleResponse}
      /> */}
    </Box>
  );
}