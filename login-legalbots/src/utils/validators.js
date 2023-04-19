const validateEmail = (email) => {
  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Por favor, insira um email válido';
  } else {
    return '';
  }
};

const validatePassword = (password) => {
  if (password.length < 1) {
    return 'Você deve inserir uma senha';
  } else {
    return '';
  }
};

export { validateEmail, validatePassword };
