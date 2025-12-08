import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AboutPage() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="about-page">
      <header className="about-hero">
        <div className="about-hero-text">
          <p className="eyebrow">About Alaska Explorer</p>
          <h1>5 summers living and working in Denali</h1>
          <p className="about-hero-lead">
            Alaska Explorer isn&apos;t based on cruise brochures or
            Instagram-perfect stops. It&apos;s built from five summers spent
            living and working in Denali — taking bus tours on my days off,
            rafting cold rivers, joining sled dog demos, hopping on the train,
            hiking every chance I got, and sharing long nights with seasonal
            workers and locals.
          </p>

          <div className="about-hero-cta">
            <Link to="/guides" className="btn primary">
              Browse all guides
            </Link>
            {isAuthenticated ? (
              <Link to="/guides/create" className="btn ghost">
                Create your own guide
              </Link>
            ) : (
              <Link to="/login" className="btn ghost">
                Log in to create a guide
              </Link>
            )}
          </div>
        </div>

        <div className="about-hero-card">
          <div className="about-hero-pill">Denali National Park · Alaska</div>
          <p className="about-hero-highlight">
            Summers spent between mountains, tundra, and midnight light —
            working different jobs, then using every free day for a new
            adventure.
          </p>
          <ul className="about-hero-list">
            <li>Seasonal work in Denali over 5 summers</li>
            <li>Day-off adventures: bus tours, rafting, hikes, train rides</li>
            <li>Local life: staff parties, U.S. holidays, small-town moments</li>
          </ul>
        </div>
      </header>

      <div className="about-layout">
        <section className="about-card">
          <h2>My Alaska story</h2>
          <p className="about-text">
            Alaska started as a summer job and turned into a second home.
            Over five seasons in Denali National Park, I worked a variety of
            roles and spent almost every spare hour outside — exploring trails,
            joining tours, and slowly learning how this place actually works
            beyond the visitor center.
          </p>

          <div className="about-timeline">
            <div className="about-timeline-item">
              <h3>Summer 1 · First contact</h3>
              <p>
                Arriving in Denali felt like landing on another planet —
                endless daylight, mountains on every horizon, and moose walking
                through the parking lot. I started with the classic bus tours,
                short hikes, and just getting used to life in a seasonal
                community.
              </p>
            </div>

            <div className="about-timeline-item">
              <h3>Summers 2–3 · Exploring deeper</h3>
              <p>
                With each returning season, I went further: longer hikes, more
                bus routes, rafting on the Nenana River, sled dog
                presentations, train rides, and the kind of little side trips
                you only hear about from people who live and work there.
              </p>
            </div>

            <div className="about-timeline-item">
              <h3>Summers 4–5 · Feeling like a local seasonal</h3>
              <p>
                By the later summers, Denali wasn&apos;t just a workplace; it
                felt like a small village that woke up every May. I helped
                friends plan hikes, recommended tours to guests, discovered
                local food spots, joined staff gatherings and U.S. holiday
                parties, and watched the seasons shift from snow to tundra
                greens.
              </p>
            </div>
          </div>
        </section>

        <section className="about-card">
          <h2>What you&apos;ll find on Alaska Explorer</h2>
          <p className="about-text">
            This site is a collection of guides and itineraries focused on
            real Alaska experiences — especially around Denali — built from
            time actually spent on the ground, not just research.
          </p>

          <ul className="about-list">
            <li>
              <strong>Honest guides</strong> · Realistic difficulty, clear
              expectations, and practical details instead of vague travel hype.
            </li>
            <li>
              <strong>Local-style tips</strong> · What&apos;s actually worth
              your time, what&apos;s overrated, and how to combine activities
              in a realistic way.
            </li>
            <li>
              <strong>Activity variety</strong> · From bus tours and
              flightseeing to hikes, rafting, train rides, jeep safaris, and
              quieter moments just watching the light change over the
              mountains.
            </li>
            <li>
              <strong>Logistics & safety notes</strong> · Weather, daylight,
              transport, and what you really need to pack (and what you don&apos;t).
            </li>
          </ul>

          <p className="about-text-muted">
            This isn&apos;t meant to replace official park information or
            professional guiding. It&apos;s a companion: a collection of
            experience-based suggestions to help you plan smarter and enjoy
            more.
          </p>
        </section>

        <section className="about-card about-experiences">
          <h2>Some of my favorite Alaska moments</h2>
          <p className="about-text">
            These are the kinds of experiences that shaped the guides on this
            site — the things I keep recommending to anyone heading north.
          </p>

          <div className="experience-grid">
            <article className="experience-card">
              <h3>Denali bus tours</h3>
              <p>
                Long days on the park road, sharing a bus with strangers who
                become friends for a day, scanning for wildlife, and watching
                the weather decide whether you&apos;ll see The Mountain or not.
              </p>
            </article>

            <article className="experience-card">
              <h3>Rafting the Nenana River</h3>
              <p>
                Cold glacial water, big smiles, and that mix of adrenaline and
                peace as the river wraps around the park boundaries.
              </p>
            </article>

            <article className="experience-card">
              <h3>Flightseeing</h3>
              <p>
                Seeing ridgelines, glaciers, and Denali itself from above
                changes your scale for everything. It&apos;s one of those
                “if you can, do it once in your life” experiences.
              </p>
            </article>

            <article className="experience-card">
              <h3>Sled dog presentations</h3>
              <p>
                Learning how working dogs are part of Alaska&apos;s history
                and present, not just a photo opportunity. The energy of the
                dogs before a run is something you don&apos;t forget.
              </p>
            </article>

            <article className="experience-card">
              <h3>Hikes & jeep safaris</h3>
              <p>
                From quick after-work trails to longer day hikes and jeep
                roads, the land around Denali keeps surprising you with new
                views, tundra textures, and quiet moments.
              </p>
            </article>

            <article className="experience-card">
              <h3>Food & gatherings</h3>
              <p>
                Seasonal staff potlucks, local restaurants, U.S. holiday
                celebrations, and random nights out — the social side of
                seasonal life shapes your memories just as much as the views.
              </p>
            </article>
          </div>
        </section>

        <section className="about-card">
          <h2>How Alaska Explorer is built</h2>
          <p className="about-text">
            Alaska Explorer is also a learning and portfolio project. It&apos;s
            built with modern web tools and a focus on clean, maintainable
            code:
          </p>

          <ul className="about-tech-list">
            <li>
              <strong>React &amp; React Router</strong> for the single-page
              application and navigation.
            </li>
            <li>
              <strong>Firebase Authentication</strong> for login and
              registration.
            </li>
            <li>
              <strong>Cloud Firestore</strong> for storing guides, likes, and
              comments.
            </li>
            <li>
              <strong>Firebase Storage</strong> for user avatars and media.
            </li>
            <li>
              <strong>EmailJS</strong> for the live contact form.
            </li>
          </ul>

          <p className="about-text-muted">
            Under the hood, the app follows a clear separation of concerns:
            services for data access, reusable components for UI, route guards
            for public/private parts, and guarded actions for creating,
            editing, and deleting content.
          </p>
        </section>
      </div>

      <footer className="about-footer-cta">
        <div>
          <h2>Ready to explore?</h2>
          <p>
            Start with the guides catalog, save ideas for your trip, or log in
            and write your own Alaska story.
          </p>
        </div>

        <div className="about-footer-buttons">
          <Link to="/guides" className="btn primary">
            View all guides
          </Link>
          {isAuthenticated ? (
            <Link to="/my-guides" className="btn secondary">
              Go to My Guides
            </Link>
          ) : (
            <Link to="/register" className="btn secondary">
              Create an account
            </Link>
          )}
        </div>
      </footer>
    </section>
  );
}
