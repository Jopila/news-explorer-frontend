import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__icon" />
      <h2 className="not-found__title">Nada encontrado</h2>
      <p className="not-found__text">
        Desculpe, mas nada corresponde aos seus termos de pesquisa.
      </p>
    </section>
  );
}

export default NotFound;
