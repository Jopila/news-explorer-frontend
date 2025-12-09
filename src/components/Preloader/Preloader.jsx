import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <div className="preloader__spinner" />
      <span className="preloader__text">Carregando resultados...</span>
    </div>
  );
}

export default Preloader;
