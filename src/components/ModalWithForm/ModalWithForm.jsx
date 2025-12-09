import './ModalWithForm.css';

function ModalWithForm({ title, children, onClose }) {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal__content" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar modal">
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__actions">
          <button type="button" className="modal__button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
