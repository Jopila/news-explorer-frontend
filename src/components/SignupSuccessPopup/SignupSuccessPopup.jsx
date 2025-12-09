import PopupWithForm from '../PopupWithForm/PopupWithForm';
import closeIcon from '../../images/close-button.svg';
import './SignupSuccessPopup.css';

function SignupSuccessPopup({ isOpen, onClose, onSwitchToLogin }) {
  return (
    <PopupWithForm
      title="Sucesso"
      isOpen={isOpen}
      onClose={onClose}
      hideHeader
      hideFooter
    >
      <div className="success-popup">
        <button type="button" className="success-popup__close" aria-label="Fechar" onClick={onClose}>
          <img src={closeIcon} alt="Fechar" className="success-popup__close-icon" />
        </button>
        <div className="success-popup__content">
          <h2 className="success-popup__title">Cadastro concluído com sucesso!</h2>
          <button type="button" className="success-popup__link" onClick={onSwitchToLogin}>
            Entrar
          </button>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default SignupSuccessPopup;
