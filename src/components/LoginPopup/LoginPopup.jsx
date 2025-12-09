import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './LoginPopup.css';

function LoginPopup({ isOpen, onClose, onSubmit }) {
  return (
    <PopupWithForm
      title="Entrar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText="Entrar"
      hideHeader
      hideFooter
    >
      <div className="form-parent">
        <div className="form">
          <button type="button" className="close-icon" aria-label="Fechar" onClick={onClose}>
            ×
          </button>

          <div className="field-1">
            <input className="login-input" type="email" name="email" required aria-label="E-mail" />
            <div className="esse-um2">Esse é um campo obrigatório.</div>
            <div className="field-2-child" />
            <div className="insira-e-mail">Insira e-mail</div>
            <div className="e-mail">E-mail</div>
          </div>

          <div className="field-2">
            <input
              className="login-input"
              type="password"
              name="password"
              required
              aria-label="Senha"
            />
            <div className="esse-um">Esse é um campo obrigatório.</div>
            <div className="field-2-child" />
            <div className="insira-a-senha">Insira a senha</div>
            <div className="senha">Senha</div>
          </div>

          <div className="entrar-wrapper">
            <div className="entrar">Entrar</div>
          </div>

          <div className="button">
            <button type="submit" className="button__action">
              <div className="rectangle2" />
              <div className="entrar2">Entrar</div>
            </button>
          </div>
        </div>

        <div className="ou-inscreva-se">
          <span>ou </span>
          <span className="inscreva-se">Inscreva-se</span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default LoginPopup;
