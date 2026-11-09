export default function BlogPost({ post, author, authorLoading, authorError, likes, onLike }) {
  return (
    <article className="blog-post">
      <div className="post-meta-top"><span className="category-tag">FIELDNOTES JOURNAL</span><span className="meta-dot" /><span>STORY {post.id}</span></div>
      <h1>{post.title}</h1>
      <div className="author-row">
        <div className="author-avatar" aria-hidden="true">{author?.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || '✳'}</div>
        <div className="author-info">{authorLoading ? <span role="status">Loading author…</span> : authorError ? <span className="api-error" role="alert">We couldn't load the author details.</span> : <><span className="author-name">{author?.name}</span><a className="post-date" href={`mailto:${author?.email}`}>{author?.email}</a></>}</div>
        <button className="like-button" type="button" onClick={onLike} aria-label={`Like this post, ${likes} likes`}>
          <span aria-hidden="true">♡</span><span>{likes}</span>
        </button>
      </div>
      <div className="post-rule" />
      <div className="article-art" role="img" aria-label="Illustration of rolling hills at sunset with a winding path">
        <div className="art-sun" /><div className="art-hill hill-back" /><div className="art-hill hill-mid" /><div className="art-hill hill-front" /><div className="art-path" />
        <span className="art-caption">A STUDY IN SLOWING DOWN <span>✳</span></span>
      </div>
      <div className="post-body">
        <p className="full-post-body">{post.body}</p>
      </div>
      <div className="post-endmark" aria-hidden="true"><span /> ✳ <span /></div>
    </article>
  );
}
