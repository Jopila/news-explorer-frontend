import { NavLink } from 'react-router-dom';
import logoutIcon from '../../images/header-icon-logout.svg';
import './Navigation.css';

function Navigation({ isLoggedIn, currentUser, onLoginClick, onLogout }) {
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
        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink to="/saved-news" className={linkClass}>
              Artigos salvos
            </NavLink>
          </li>
        )}
        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              type="button"
              className="navigation__user-button"
              onClick={onLogout}
            >
              <span className="navigation__user-name">{currentUser?.name || 'Usuário'}</span>
              <img
                src={logoutIcon}
                alt="Sair"
                className="navigation__logout-icon"
              />
            </button>
          ) : (
            <button
              type="button"
              className="navigation__button"
              onClick={onLoginClick}
            >
              Entrar
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
