import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi.js';

export default function BlogPostsPage() {
  const { data: posts, loading, error } = useApi('/posts');
  return <main className="page-content">
    <div className="eyebrow"><span className="eyebrow-line" /> A JOURNAL FOR THE CURIOUS <span className="eyebrow-line" /></div>
    <section className="posts-page" aria-labelledby="posts-heading">
      <div className="posts-intro"><span className="side-label">FIELDNOTES JOURNAL</span><h1 id="posts-heading">Stories for a life well noticed.</h1><p>Thoughts on creativity, the natural world, and finding your way back to what matters.</p></div>
      {loading && <p className="api-status" role="status">Loading stories…</p>}
      {error && <p className="api-error" role="alert">We couldn't load the stories. Please try visiting the journal again in a moment.</p>}
      {!loading && !error && posts?.length === 0 && <p className="api-status">No stories available yet.</p>}
      <div className="post-list">{posts?.map((post) => <article className="post-card" key={post.id}>
        <div className="post-meta-top"><span className="category-tag">FIELDNOTES JOURNAL</span><span className="meta-dot" /><span>STORY {post.id}</span></div>
        <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2><p>{post.body.length > 150 ? `${post.body.slice(0, 150).trimEnd()}…` : post.body}</p>
        <div className="post-card-bottom"><span>From the journal</span><Link className="read-link" to={`/posts/${post.id}`}>Read story <span aria-hidden="true">↗</span></Link></div>
      </article>)}</div>
    </section>
  </main>;
}
