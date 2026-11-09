import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <div className="nav-inner">
        <NavLink className="nav-link" to="/" end>Blog Posts</NavLink>
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
        <Link className="nav-link featured-nav-link" to="/posts/1">Featured post</Link>
        <span className="nav-spacer" />
        <span className="nav-edition">VOL. 04 <span aria-hidden="true">·</span> AUTUMN NOTES</span>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '☾ Dark' : '☀ Light'}</button>
      </div>
    </nav>
  );
}
