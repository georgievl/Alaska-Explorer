import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="notfound-page">
      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Page Not Found</p>
        <p className="notfound-text">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn primary">
            Go Home
          </Link>
          <Link to="/guides" className="btn ghost">
            Browse Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
