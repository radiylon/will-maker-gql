module.exports = {
  validateRegisterInput(username, email, password, confirmPassword) {
    const errors = {};
    // validate username
    if (username.trim() === '') {
      errors.username = 'Username cannot be empty';
    }
    // validate email
    if (email.trim() === '') {
      errors.email = 'Email cannot be empty';
    } else {
      // regex for email formatting
      const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regex)) {
        errors.email = 'Email is not a valid email address';
      }
    }
    // validate password
    if (password === '') {
      errors.password = 'Password cannot be empty';
    } else if (password !== confirmPassword) {
      errors.password = 'Passwords do not match'
    }
    // check if there are errors, set valid status
    const valid = Object.keys(errors).length === 0;

    return { errors, valid };
  },
  validateLoginInput(username, password) {
    const errors = {};
    // validate username
    if (username.trim() === '') {
      errors.username = 'Username cannot be empty';
    }
    // validate password
    if (password === '') {
      errors.password = 'Password cannot be empty';
    }
    // check if there are errors, set valid status
    const valid = Object.keys(errors).length === 0;
    
    return { errors, valid };
  }
}