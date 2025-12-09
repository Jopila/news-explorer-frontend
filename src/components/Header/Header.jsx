import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLoggedIn, currentUser, onLoginClick, onLogout, theme = 'dark' }) {
  const headerClass = `header${theme === 'light' ? ' header--light' : ''}`;

  return (
    <header className={headerClass}>
      <div className="header__bg"></div>
      <Link to="/" className="header__brand">
        NewsExplorer
      </Link>
      <div className="header__actions">
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          theme={theme}
        />
      </div>
    </header>
  );
}

export default Header;
