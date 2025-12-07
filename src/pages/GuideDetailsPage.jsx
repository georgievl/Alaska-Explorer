import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as guideService from "../services/guideService.js";
import { Spinner } from "../components/Spinner.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function GuideDetailsPage() {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const [likeSubmitting, setLikeSubmitting] = useState(false);

  const isOwner = isAuthenticated && guide && guide.authorId === user.uid;

  const isLiked =
    isAuthenticated &&
    guide &&
    Array.isArray(guide.likedBy) &&
    guide.likedBy.includes(user.uid);

  useEffect(() => {
    async function loadGuide() {
      try {
        const result = await guideService.getGuideById(guideId);
        setGuide(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load guide details.");
      } finally {
        setLoading(false);
      }
    }

    loadGuide();
  }, [guideId]);

  useEffect(() => {
    async function loadComments() {
      try {
        const result = await guideService.getCommentsForGuide(guideId);
        setComments(result);
      } catch (err) {
        console.error(err);
        setCommentError("Failed to load comments.");
      } finally {
        setCommentsLoading(false);
      }
    }

    loadComments();
  }, [guideId]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this guide? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      setDeleting(true);
      await guideService.deleteGuide(guideId);
      navigate("/guides");
    } catch (err) {
      console.error(err);
      setError("Failed to delete guide.");
      setDeleting(false);
    }
  };

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!guide || likeSubmitting) return;

    const currentlyLiked = isLiked;

    setGuide((prev) => {
      if (!prev) return prev;
      const likedBy = Array.isArray(prev.likedBy) ? [...prev.likedBy] : [];
      let likesCount = prev.likesCount || 0;

      if (currentlyLiked) {
        const index = likedBy.indexOf(user.uid);
        if (index !== -1) likedBy.splice(index, 1);
        likesCount = Math.max(0, likesCount - 1);
      } else {
        if (!likedBy.includes(user.uid)) likedBy.push(user.uid);
        likesCount = likesCount + 1;
      }

      return { ...prev, likedBy, likesCount };
    });

    try {
      setLikeSubmitting(true);
      await guideService.toggleLike(guideId, user.uid, currentlyLiked);
    } catch (err) {
      console.error(err);
    } finally {
      setLikeSubmitting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const text = commentText.trim();
    if (!text) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    try {
      setCommentError("");
      setCommentSubmitting(true);

      const authorName = user.displayName || user.email || "Anonymous";
      const newCommentId = await guideService.addComment(
        guideId,
        user.uid,
        authorName,
        text
      );

      const newComment = {
        id: newCommentId,
        guideId,
        authorId: user.uid,
        authorName,
        text,
        createdAt: { toDate: () => new Date() },
      };

      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    } catch (err) {
      console.error(err);
      setCommentError("Failed to add comment.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId, authorId) => {
    if (!isAuthenticated || !user || user.uid !== authorId) return;

    const confirmed = window.confirm("Delete this comment?");
    if (!confirmed) return;

    try {
      await guideService.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
      setCommentError("Failed to delete comment.");
    }
  };

  if (loading || deleting) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section>
        <h1>Guide Details</h1>
        <p className="form-error">{error}</p>
      </section>
    );
  }

  if (!guide) {
    return (
      <section>
        <h1>Guide Details</h1>
        <p>Guide not found.</p>
      </section>
    );
  }

  const createdAt =
    guide.createdAt && guide.createdAt.toDate
      ? guide.createdAt.toDate().toLocaleDateString()
      : null;
  const updatedAt =
    guide.updatedAt && guide.updatedAt.toDate
      ? guide.updatedAt.toDate().toLocaleDateString()
      : null;

  return (
    <section className="guide-details">
      <div className="guide-details-header">
        <div>
          <h1>{guide.title}</h1>
          <p className="guide-details-meta">
            <span>{guide.region || "Unknown region"}</span>
            {guide.season && <> · <span>{guide.season}</span></>}
            {guide.duration && <> · <span>{guide.duration}</span></>}
            {guide.difficulty && <> · <span>{guide.difficulty}</span></>}
          </p>
          <p className="guide-details-author">
            By <strong>{guide.authorName || "Unknown author"}</strong>
            {createdAt && <> · <span>Published {createdAt}</span></>}
            {updatedAt && <> · <span>Updated {updatedAt}</span></>}
          </p>
        </div>

        {guide.coverImageUrl && (
          <div
            className="guide-details-cover"
            style={{ backgroundImage: `url(${guide.coverImageUrl})` }}
          />
        )}
      </div>

      <p className="guide-details-short">{guide.shortDescription}</p>

      <article className="guide-details-content">
        {guide.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>

      <section className="guide-engagement">
        <div className="guide-likes">
          <button
            type="button"
            className={`btn small ${isLiked ? "primary" : "ghost"}`}
            onClick={handleToggleLike}
            disabled={likeSubmitting}
          >
            {isLiked ? "Unlike" : "Like"} · {guide.likesCount || 0}
          </button>
          <span className="guide-likes-info">
            {guide.likesCount === 1
              ? "1 person likes this"
              : `${guide.likesCount || 0} people like this`}
          </span>
        </div>

        <div className="guide-comments">
          <h2>Comments</h2>

          {commentError && <p className="form-error">{commentError}</p>}

          {commentsLoading ? (
            <Spinner />
          ) : comments.length === 0 ? (
            <p className="guide-comments-empty">
              No comments yet. Be the first to share your experience.
            </p>
          ) : (
            <ul className="comments-list">
              {comments.map((comment) => {
                const created =
                  comment.createdAt && comment.createdAt.toDate
                    ? comment.createdAt.toDate().toLocaleString()
                    : "";

                const canDelete =
                  isAuthenticated &&
                  user &&
                  comment.authorId === user.uid;

                return (
                  <li key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-author">
                        {comment.authorName || "Unknown"}
                      </span>
                      {created && (
                        <span className="comment-date">{created}</span>
                      )}
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    {canDelete && (
                      <button
                        type="button"
                        className="comment-delete"
                        onClick={() =>
                          handleDeleteComment(comment.id, comment.authorId)
                        }
                      >
                        Delete
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {isAuthenticated ? (
            <form
              onSubmit={handleAddComment}
              className="comment-form"
              autoComplete="off"
            >
              <label>
                Add a comment
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your tips or experience..."
                />
              </label>
              <button
                type="submit"
                className="btn primary small"
                disabled={commentSubmitting}
              >
                {commentSubmitting ? "Posting..." : "Post comment"}
              </button>
            </form>
          ) : (
            <p className="guide-comments-login">
              <Link to="/login" className="guide-card-link">
                Log in
              </Link>{" "}
              to leave a comment.
            </p>
          )}
        </div>
      </section>

      <div className="guide-details-footer">
        <Link to="/guides" className="btn ghost">
          ← Back to all guides
        </Link>

        {isOwner && (
          <div className="guide-details-actions">
            <Link to={`/guides/${guideId}/edit`} className="btn secondary">
              Edit
            </Link>
            <button type="button" className="btn danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
