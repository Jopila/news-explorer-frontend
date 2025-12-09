import facebookIcon from '../../images/facebook-icon.svg';
import githubIcon from '../../images/github.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__rectangle"></div>
      <div className="footer__brand">© 2021 Supersite, desenvolvido pela News API</div>
      <ul className="footer__links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="https://practicum.com/" target="_blank" rel="noreferrer">Practicum</a>
        </li>
      </ul>
      <div className="footer__social">
        <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
          <img src={githubIcon} alt="" className="footer__icon" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
          <img src={facebookIcon} alt="" className="footer__icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
