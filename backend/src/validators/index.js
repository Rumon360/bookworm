const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateUsername = function (username) {
  const re = /^[a-zA-Z0-9_]{3,30}$/;
  return re.test(username);
};

const validatePassword = function (password) {
  // At least 1 lowercase, 1 uppercase, 1 number, 1 special char, min 8 chars
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return re.test(password);
};

export { validateEmail, validateUsername, validatePassword };
