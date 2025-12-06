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

  const isOwner = isAuthenticated && guide && guide.authorId === user.uid;

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

      {/* TODO later: likes & comments */}
    </section>
  );
}
