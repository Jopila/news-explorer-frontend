import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <div className="header__bg"></div>
      <Link to="/" className="header__brand">
        NewsExplorer
      </Link>
      <div className="header__actions">
        <Navigation onLoginClick={onLoginClick} />
      </div>
    </header>
  );
}

export default Header;
