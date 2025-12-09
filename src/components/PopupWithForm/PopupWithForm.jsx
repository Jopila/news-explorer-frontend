import { useEffect, useRef } from 'react';
import './PopupWithForm.css';

function PopupWithForm({
  title,
  children,
  isOpen = false,
  onClose,
  onSubmit,
  submitText = 'Salvar',
  hideHeader = false,
  hideFooter = false,
}) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const focusTimer = setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup__overlay" onClick={onClose} aria-hidden="true" />
      <div
        className="popup__content"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={dialogRef}
        tabIndex={-1}
      >
        <form className="popup__form" onSubmit={onSubmit}>
          {!hideHeader && (
            <div className="popup__header">
              <h3 className="popup__title">{title}</h3>
              <button
                type="button"
                className="popup__close"
                onClick={onClose}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>
          )}
          <div className="popup__body">{children}</div>
          {!hideFooter && (
            <div className="popup__actions">
              <button type="button" className="popup__button" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="popup__button popup__button--primary">
                {submitText}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
