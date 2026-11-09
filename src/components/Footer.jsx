import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <section className="footer-contact" id="contact" aria-labelledby="contact-heading">
        <div className="footer-contact-inner">
          <h2 id="contact-heading">Contact</h2>
          <p>Have a question or a story to share? We’d love to hear from you.</p>
          <Link className="footer-contact-link" to="/contact">Write us a note <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <div className="footer-inner"><Link className="footer-brand" to="/">fieldnotes<span>.</span></Link><p>Made slowly, with care. © 2025 Fieldnotes Journal.</p><Link className="back-top" to="/">BACK TO STORIES ↑</Link></div>
    </footer>
  );
}
