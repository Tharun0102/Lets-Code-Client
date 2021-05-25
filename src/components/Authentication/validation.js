
export default function validateInfo(type, values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = 'username required';
  } else if (values.username.length < 4 || values.username.length > 15) {
    errors.username = 'username must be between 4 and 15 characters ';
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (type === 'signup') {
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  return errors;
}