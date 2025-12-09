import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLoggedIn, currentUser, onLoginClick, onLogout, theme = 'dark' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerClass = `header${theme === 'light' ? ' header--light' : ''}${isMobileMenuOpen ? ' header--menu-open' : ''}`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={headerClass}>
      <div className="header__bg"></div>
      <Link to="/" className="header__brand">
        NewsExplorer
      </Link>
      <button 
        className={`header__menu-btn${isMobileMenuOpen ? ' header__menu-btn--close' : ''}`}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="header__menu-icon"></span>
      </button>
      <div className={`header__actions${isMobileMenuOpen ? ' header__actions--open' : ''}`}>
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLoginClick={() => { closeMobileMenu(); onLoginClick(); }}
          onLogout={() => { closeMobileMenu(); onLogout(); }}
          theme={isMobileMenuOpen ? 'dark' : theme}
        />
      </div>
      {isMobileMenuOpen && <div className="header__overlay" onClick={closeMobileMenu}></div>}
    </header>
  );
}

export default Header;
