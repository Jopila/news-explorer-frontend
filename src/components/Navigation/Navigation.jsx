import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onLoginClick }) {
  const linkClass = ({ isActive }) =>
    `navigation__link${isActive ? ' navigation__link--active' : ''}`;

  return (
    <nav className="navigation" aria-label="Menu principal">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <button type="button" className="navigation__button" onClick={onLoginClick}>
            Entrar
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
