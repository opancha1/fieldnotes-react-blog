import { useState } from 'react';
import CommentForm from './CommentForm.jsx';
import useApi from '../hooks/useApi.js';

export default function CommentSection({ postId }) {
  const { data, loading, error } = useApi(`/posts/${postId}/comments`);
  const [localComments, setLocalComments] = useState([]);
  const comments = [...(data || []), ...localComments];
  return <section className="comments-section" aria-labelledby="comments-heading">
    <div className="comments-heading-row"><h2 id="comments-heading">The conversation <span className="comment-count">{comments.length}</span></h2><span className="comments-invite">PULL UP A CHAIR</span></div>
    <CommentForm postId={postId} onSubmit={(comment) => setLocalComments((current) => [...current, { ...comment, id: `local-${crypto.randomUUID()}` }])} />
    {loading && <p className="api-status" role="status">Loading comments…</p>}
    {error && <p className="api-error" role="alert">We couldn't load existing comments. Please visit this story again to try again.</p>}
    {comments.length > 0 ? <div className="comment-list">{comments.map((comment) => <article className="comment" key={comment.id}>
      <div className="comment-avatar" aria-hidden="true">{comment.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div>
      <div className="comment-content"><div className="comment-author-line"><span className="comment-author">{comment.name}</span></div><p>{comment.body}</p></div>
    </article>)}</div> : !loading && !error && <p className="empty-comments">No comments yet. Be the first to comment!</p>}
  </section>;
}
