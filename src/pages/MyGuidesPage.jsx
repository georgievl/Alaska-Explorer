import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as guideService from "../services/guideService.js";
import { Spinner } from "../components/Spinner.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function MyGuidesPage() {
  const { user, isAuthenticated } = useAuth();

  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    async function loadMyGuides() {
      try {
        const result = await guideService.getGuidesByAuthor(user.uid);
        setGuides(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load your guides.");
      } finally {
        setLoading(false);
      }
    }

    loadMyGuides();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <section>
        <h1>My Guides</h1>
        <p>You must be logged in to see your guides.</p>
      </section>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section>
        <h1>My Guides</h1>
        <p className="form-error">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>My Guides</h1>

      {guides.length === 0 ? (
        <p>
          You haven&apos;t created any guides yet.{" "}
          <Link to="/guides/create" className="guide-card-link">
            Create your first guide →
          </Link>
        </p>
      ) : (
        <div className="card-grid">
          {guides.map((guide) => (
            <article key={guide.id} className="guide-card">
              <div
                className="guide-card-image"
                style={{
                  backgroundImage: guide.coverImageUrl
                    ? `url(${guide.coverImageUrl})`
                    : "linear-gradient(to bottom right, #0f172a, #020617)",
                }}
              />
              <div className="guide-card-body">
                <p className="guide-card-meta">
                  <span>{guide.region || "Unknown region"}</span>
                  {guide.season && (
                    <>
                      {" "}
                      · <span>{guide.season}</span>
                    </>
                  )}
                </p>
                <h3 className="guide-card-title">{guide.title}</h3>
                <p className="guide-card-excerpt">
                  {guide.shortDescription?.slice(0, 120) || ""}
                  {guide.shortDescription &&
                    guide.shortDescription.length > 120 &&
                    "..."}
                </p>
                <div className="guide-card-actions">
                  <Link
                    to={`/guides/${guide.id}`}
                    className="guide-card-link"
                  >
                    View →
                  </Link>
                  <Link
                    to={`/guides/${guide.id}/edit`}
                    className="guide-card-link"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
