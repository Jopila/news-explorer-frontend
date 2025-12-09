import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader" role="status" aria-live="polite">
      <div className="preloader__spinner" />
      <span className="preloader__text">Procurando notícias...</span>
    </section>
  );
}

export default Preloader;
