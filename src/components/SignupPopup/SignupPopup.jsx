import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import closeIcon from '../../images/close-button.svg';
import './SignupPopup.css';

function SignupPopup({ isOpen, onClose, onSubmit, onSwitchToLogin, serverError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false, username: false });

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setUsername('');
      setEmailError('');
      setPasswordError('');
      setUsernameError('');
      setTouched({ email: false, password: false, username: false });
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

  const validateUsername = (value) => {
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

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (touched.username) {
      setUsernameError(validateUsername(value));
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

  const handleUsernameBlur = () => {
    setTouched({ ...touched, username: true });
    setUsernameError(validateUsername(username));
  };

  const emailErrorId = emailError ? 'signup-email-error' : undefined;
  const passwordErrorId = passwordError ? 'signup-password-error' : undefined;
  const usernameErrorId = usernameError ? 'signup-username-error' : undefined;

  const isFormValid = email && password && username && 
    !validateEmail(email) && !validatePassword(password) && !validateUsername(username);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const usernameErr = validateUsername(username);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setUsernameError(usernameErr);
    setTouched({ email: true, password: true, username: true });

    if (!emailErr && !passwordErr && !usernameErr) {
      onSubmit({ email, password, username });
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    setTouched({ email: false, password: false, username: false });
    onClose();
  };

  return (
    <PopupWithForm
      title="Inscrever-se"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Inscrever-se"
      hideHeader
      hideFooter
    >
      <div className="signup-popup">
        <button type="button" className="signup-popup__close" aria-label="Fechar" onClick={handleClose}>
          <img src={closeIcon} alt="Fechar" className="signup-popup__close-icon" />
        </button>
        <div className="signup-popup__form">
          <h2 className="signup-popup__title">Inscrever-se</h2>

          <div className="signup-popup__field">
            <label className="signup-popup__label">E-mail</label>
            <input
              className={`signup-popup__input ${emailError ? 'signup-popup__input--error' : ''}`}
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="Insira e-mail"
              aria-label="E-mail"
              aria-invalid={emailError ? 'true' : 'false'}
              aria-describedby={emailErrorId}
            />
            <div className="signup-popup__line" />
            {emailError && (
              <span id={emailErrorId} className="signup-popup__error">
                {emailError}
              </span>
            )}
          </div>

          <div className="signup-popup__field">
            <label className="signup-popup__label">Senha</label>
            <input
              className={`signup-popup__input ${passwordError ? 'signup-popup__input--error' : ''}`}
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="Insira a senha"
              aria-label="Senha"
              aria-invalid={passwordError ? 'true' : 'false'}
              aria-describedby={passwordErrorId}
            />
            <div className="signup-popup__line" />
            {passwordError && (
              <span id={passwordErrorId} className="signup-popup__error">
                {passwordError}
              </span>
            )}
          </div>

          <div className="signup-popup__field signup-popup__field--last">
            <label className="signup-popup__label">Nome de usuário</label>
            <input
              className={`signup-popup__input ${usernameError ? 'signup-popup__input--error' : ''}`}
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              placeholder="Insira seu nome de usuário"
              aria-label="Nome de usuário"
              aria-invalid={usernameError ? 'true' : 'false'}
              aria-describedby={usernameErrorId}
            />
            <div className="signup-popup__line" />
            {usernameError && (
              <span id={usernameErrorId} className="signup-popup__error">
                {usernameError}
              </span>
            )}
          </div>

          {serverError && <span className="signup-popup__server-error">{serverError}</span>}

          <button
            type="submit"
            className={`signup-popup__button ${isFormValid ? 'signup-popup__button--active' : ''}`}
            disabled={!isFormValid}
          >
            Inscrever-se
          </button>

          <p className="signup-popup__switch">
            ou{' '}
            <button type="button" className="signup-popup__switch-link" onClick={onSwitchToLogin}>
              Entrar
            </button>
          </p>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default SignupPopup;
