import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  function handleSubmit(event) {
    event.preventDefault();
    const nameInput = event.currentTarget.elements.name;
    const messageInput = event.currentTarget.elements.message;
    nameInput.setCustomValidity(form.name.trim() ? '' : 'Please enter your name.');
    messageInput.setCustomValidity(form.message.trim() ? '' : 'Please enter a message.');
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  }
  return <main className="page-content contact-page">
    <div className="eyebrow"><span className="eyebrow-line" /> WE'D LOVE TO HEAR FROM YOU <span className="eyebrow-line" /></div>
    <section className="contact-card"><span className="side-label">A NOTE TO FIELDNOTES</span><h1>Come say hello.</h1><p>Have a question or a story to share? Send us a note. We read every message with care.</p>
      {submitted && <p className="form-success" role="status">Thanks for reaching out. Your note is ready for us, and we’ll be in touch soon.</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required value={form.name} onChange={(event) => { event.target.setCustomValidity(''); setForm({ ...form, name: event.target.value }); }} />
        <label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required rows="5" value={form.message} onChange={(event) => { event.target.setCustomValidity(''); setForm({ ...form, message: event.target.value }); }} />
        <button type="submit">Send your note <span aria-hidden="true">↗</span></button>
      </form>
    </section>
  </main>;
}
