import notFoundIcon from '../../images/not-found-icon.png';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <img src={notFoundIcon} alt="Nada encontrado" className="not-found__icon" />
      <h2 className="not-found__title">Nada encontrado</h2>
      <p className="not-found__text">
        Desculpe, mas nada corresponde aos seus termos de pesquisa.
      </p>
    </section>
  );
}

export default NotFound;
