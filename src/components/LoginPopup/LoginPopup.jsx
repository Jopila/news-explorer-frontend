import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './LoginPopup.css';

function LoginPopup({ isOpen, onClose, onSubmit, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      setTouched({ email: false, password: false });
    }
  }, [isOpen]);

  const validateEmail = (value) => {
    if (!value) {
      return 'Esse é um campo obrigatório.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'E-mail inválido.';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Esse é um campo obrigatório.';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    setPasswordError(validatePassword(password));
  };

  const isFormValid = email && password && !validateEmail(email) && !validatePassword(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setTouched({ email: true, password: true });

    if (!emailErr && !passwordErr) {
      onSubmit({ email, password });
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
    setTouched({ email: false, password: false });
    onClose();
  };

  return (
    <PopupWithForm
      title="Entrar"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Entrar"
      hideHeader
      hideFooter
    >
      <div className="login-popup">
        <div className="login-popup__form">
          <button type="button" className="login-popup__close" aria-label="Fechar" onClick={handleClose}>
            ×
          </button>

          <h2 className="login-popup__title">Entrar</h2>

          <div className="login-popup__field">
            <label className="login-popup__label">E-mail</label>
            <input
              className={`login-popup__input ${emailError ? 'login-popup__input--error' : ''}`}
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="Insira e-mail"
              aria-label="E-mail"
            />
            <div className="login-popup__line" />
            {emailError && <span className="login-popup__error">{emailError}</span>}
          </div>

          <div className="login-popup__field login-popup__field--password">
            <label className="login-popup__label">Senha</label>
            <input
              className={`login-popup__input ${passwordError ? 'login-popup__input--error' : ''}`}
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="Insira a senha"
              aria-label="Senha"
            />
            <div className="login-popup__line" />
            {passwordError && <span className="login-popup__error">{passwordError}</span>}
          </div>

          <button
            type="submit"
            className={`login-popup__button ${isFormValid ? 'login-popup__button--active' : ''}`}
            disabled={!isFormValid}
          >
            Entrar
          </button>

          <p className="login-popup__switch">
            ou{' '}
            <button type="button" className="login-popup__switch-link" onClick={onSwitchToRegister}>
              Inscreva-se
            </button>
          </p>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default LoginPopup;
