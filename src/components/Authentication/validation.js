
export default function validateInfo(type, values) {
  let errors = {};
  if (type === 'signup') {
    if (!values.name.trim()) {
      errors.name = '*name required';
    } else if (values.name.length < 4 || values.name.length > 15) {
      errors.name = '*name must be between 4 and 15 characters ';
    }
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.email) {
    errors.email = '*Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '*Email address is invalid';
  }

  if (!values.password) {
    errors.password = '*Password is required';
  } else if (values.password.length < 6) {
    errors.password = '*Password needs to be 6 characters or more';
  }

  return errors;
}