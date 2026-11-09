import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="site-header" id="home">
      <Link className="brand" to="/" aria-label="Fieldnotes home">
        <span className="brand-mark" aria-hidden="true">f.</span>
        <span className="brand-name">fieldnotes<span className="brand-period">.</span></span>
      </Link>
      <span className="header-note">WORDS FOR A LIFE WELL NOTICED</span>
      <button className="subscribe-link header-contact-button" type="button" onClick={() => navigate('/contact')}>LETTERS FROM US <span aria-hidden="true">↗</span></button>
    </header>
  );
}
