import { useEffect, useState } from "react";
import * as guideService from "../services/guideService.js";
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";

export default function GuidesCatalogPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGuides() {
      try {
        const result = await guideService.getAllGuides();
        setGuides(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load guides.");
      } finally {
        setLoading(false);
      }
    }

    loadGuides();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section>
        <h1>All Guides</h1>
        <p className="form-error">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Guides</h1>
      <p>
        Browse travel guides created by all users. Use this catalog to discover
        hikes, routes and experiences across Alaska.
      </p>

      {guides.length === 0 ? (
        <p>No guides yet. Be the first to create one!</p>
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
                <Link to={`/guides/${guide.id}`} className="guide-card-link">
                  Read guide →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
