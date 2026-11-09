import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost.jsx';
import CommentSection from '../components/CommentSection.jsx';
import useApi from '../hooks/useApi.js';

export default function IndividualPostPage() {
  const { postId } = useParams();
  return <PostContent key={postId || 'not-found'} postId={postId} />;
}

function PostContent({ postId }) {
  const validId = /^[1-9]\d*$/.test(postId || '') && Number.isSafeInteger(Number(postId));
  const { data: post, loading, error } = useApi(validId ? `/posts/${postId}` : null);
  const { data: author, loading: authorLoading, error: authorError } = useApi(post?.userId ? `/users/${post.userId}` : null);
  const [likes, setLikes] = useState(0);
  if (loading) return <main className="page-content"><p className="api-status" role="status">Loading story…</p></main>;
  if (!validId || error || !post?.id) return <main className="page-content"><section className="not-found"><span className="side-label">{error && error.status !== 404 ? 'UNABLE TO LOAD STORY' : 'STORY NOT FOUND'}</span><h1>{error && error.status !== 404 ? 'This story is taking a little longer.' : "We couldn't find that page."}</h1><p>{error && error.status !== 404 ? 'Please check your connection and try again in a moment.' : 'Head back to the journal to find another story.'}</p><Link className="primary-link" to="/">Browse all stories</Link></section></main>;
  return <main className="page-content">
    <div className="eyebrow"><span className="eyebrow-line" /> A JOURNAL FOR THE CURIOUS <span className="eyebrow-line" /></div>
    <div className="content-grid"><div className="article-column"><BlogPost post={post} author={author} authorLoading={authorLoading} authorError={authorError} likes={likes} onLike={() => setLikes((count) => count + 1)} /><CommentSection postId={post.id} /></div>
      <aside className="sidebar" aria-label="About this journal"><section className="sidebar-card note-card"><span className="side-label">A LITTLE NOTE</span><div className="sun-mark" aria-hidden="true">✳</div><h2>For the in-between moments.</h2><p>Fieldnotes is a collection of thoughts on creativity, the natural world, and finding your way back to what matters.</p><Link to="/contact">Get in touch <span aria-hidden="true">↗</span></Link></section><div className="sidebar-card quote-card"><span className="quote-mark" aria-hidden="true">“</span><p>Attention is the beginning of devotion.</p><span className="quote-credit">— MARY OLIVER</span></div><div className="sidebar-footnote"><span className="tiny-dot" /> SLOW DOWN. LOOK CLOSER.</div></aside>
    </div>
  </main>;
}
