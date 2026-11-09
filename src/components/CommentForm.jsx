import { useEffect, useRef, useState } from 'react';
import { fetchJson } from '../services/api.js';

export default function CommentForm({ postId, onSubmit }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (request.current) return;
    setError('');
    setSuccess(false);
    if (!name.trim() || !text.trim()) {
      setError('Please enter your name and a comment.');
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setSubmitting(true);
    const payload = { postId: Number(postId), name: name.trim(), body: text.trim() };
    try {
      const comment = await fetchJson(`/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      onSubmit({ ...comment, ...payload });
      setName('');
      setText('');
      setSuccess(true);
    } catch {
      if (!controller.signal.aborted) setError("We couldn't send your comment. Your text is still here; please try again.");
    } finally {
      if (!controller.signal.aborted) {
        request.current = null;
        setSubmitting(false);
      }
    }
  }
  return <form className="comment-form" onSubmit={handleSubmit} aria-busy={submitting}>
    <label htmlFor="comment-name">Name</label>
    <input id="comment-name" value={name} onChange={(event) => setName(event.target.value)} disabled={submitting} required maxLength={80} placeholder="Your name" />
    <label htmlFor="comment-input">Comment</label>
    <textarea id="comment-input" value={text} onChange={(event) => setText(event.target.value)} disabled={submitting} required maxLength={1000} placeholder="Leave a thoughtful note..." rows="3" />
    <p className="form-hint">Comments use JSONPlaceholder's demo API and are only shown locally after submission. They are not saved on the server.</p>
    {error && <p className="api-error" role="alert">{error}</p>}
    {success && <p className="form-success" role="status">Your comment has been added for this visit.</p>}
    <div className="form-bottom"><span className="form-hint">Be kind. Stay curious.</span><button type="submit" disabled={submitting}>{submitting ? 'Posting…' : 'Post comment'} <span aria-hidden="true">↗</span></button></div>
  </form>;
}
