import React, { useState } from 'react';
import './form.scss';
import { useDispatch } from 'react-redux';
import validateInfo from './validation';
import { GoogleLogin } from 'react-google-login';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Swal from 'sweetalert2';
import cogoToast from 'cogo-toast';
import { signup } from '../../api/Auth';

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    emailError: '',
    nameError: '',
    passwordError: '',
    showPassword: false
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


    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    signup(payload)
      .then((res) => {
        dispatch({ type: 'UPDATE', payload: res?.data })
        cogoToast.success("accounted created successfully!");
      }).catch((err) => {
        cogoToast.error(err.response.data || "couldn't signup");
      })
    // dispatch(userActions.updateUser(formData));
  };

  // const googleResponse = async (res) => {
  //   const profile = res.profileObj;
  //   // has registered email
  //   const user = await api.getUser({ "email": profile.email });
  //   if (user.data) {
  //     dispatch({ type: 'SIGN_IN', payload: user.data });
  //   } else {
  //     api.createUser({ name: profile.name, email: profile.email })
  //       .then((res) => {
  //         dispatch({ type: 'SIGN_IN', payload: res.data });
  //       })
  //       .catch(error => {
  //         alert("error logging in,Please try again!");
  //       });
  //   }
  // }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box className="form-container">
      <div className="input-container" >
        <OutlinedInput
          placeholder="email"
          type="email"
          className={`input-field ${formData.emailError === '' ? '' : "input-error"}`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formData.emailError !== '' && <span className="error-msg">{formData.emailError}</span>}
      </div>
      <div className="input-container">
        <OutlinedInput
          placeholder="name"
          type="text"
          className={`input-field ${formData.nameError === '' ? '' : "input-error"}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {formData.nameError !== '' && <span className="error-msg">{formData.nameError}</span>}
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
        Signup
      </Button>
      {/* <div style={{ textAlign: 'center', margin: "1rem 0" }}>OR</div>
      
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        onSuccess={googleResponse}
        onFailure={googleResponse}
      /> */}
    </Box >
  );
}