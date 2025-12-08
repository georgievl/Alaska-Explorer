import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Alaska Explorer</h3>
          <p>
            A travel blog and guide collection focused entirely on Alaska –
            built from real trips, not stock photos.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/guides">All guides</Link>
              </li>
              <li>
                <Link to="/my-guides">My guides</Link>
              </li>
              <li>
                <Link to="/guides/create">Create a guide</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li>
                <Link to="/about">About Alaska Explorer</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Alaska Explorer</span>
        <span className="footer-note">
          ReactJS, October2025 – SoftUni
        </span>
      </div>
    </footer>
  );
}
