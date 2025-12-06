const HERO_IMAGE =
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"; // Alaska-like placeholder
const FEATURED_GUIDES = [
  {
    id: "exit-glacier",
    title: "Hiking Exit Glacier Trail",
    region: "Kenai Peninsula",
    season: "Summer",
    image:
      "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  },
  {
    id: "denali-drive",
    title: "Scenic Drive Through Denali",
    region: "Denali National Park",
    season: "All Year",
    image:
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
  },
  {
    id: "whale-watching",
    title: "Whale Watching in Juneau",
    region: "Inside Passage",
    season: "Summer",
    image:
      "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg",
  },
];

const REGIONS = [
  { name: "Kenai Peninsula", description: "Glaciers, fjords and coastal towns." },
  { name: "Denali", description: "High peaks, wildlife and backcountry trails." },
  { name: "Inside Passage", description: "Fjords, whales and coastal cruises." },
  { name: "Arctic & North", description: "Northern lights and remote villages." },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-eyebrow">Travel Blog & Guide</p>
            <h1 className="hero-title">Discover Alaska, the way locals see it.</h1>
            <p className="hero-subtitle">
              Curated guides, personal experiences and practical tips from real trips
              across Alaska&apos;s wild landscapes.
            </p>
            <div className="hero-actions">
              <a href="/guides" className="btn primary">
                Explore all guides
              </a>
              <a href="/about" className="btn ghost">
                Learn about the project
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="home-main">
        {/* Featured guides */}
        <section className="section">
          <div className="section-header">
            <h2>Featured Guides</h2>
            <a href="/guides" className="section-link">
              View all guides →
            </a>
          </div>

          <div className="card-grid">
            {FEATURED_GUIDES.map((guide) => (
              <article key={guide.id} className="guide-card">
                <div
                  className="guide-card-image"
                  style={{ backgroundImage: `url(${guide.image})` }}
                />
                <div className="guide-card-body">
                  <p className="guide-card-meta">
                    <span>{guide.region}</span> · <span>{guide.season}</span>
                  </p>
                  <h3 className="guide-card-title">{guide.title}</h3>
                  <a href={`/guides/${guide.id}`} className="guide-card-link">
                    Read guide →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Regions overview */}
        <section className="section">
          <div className="section-header">
            <h2>Explore by Region</h2>
            <p className="section-subtitle">
              Not sure where to start? Pick a part of Alaska and dive into curated
              guides for that area.
            </p>
          </div>

          <div className="region-grid">
            {REGIONS.map((region) => (
              <article key={region.name} className="region-card">
                <h3>{region.name}</h3>
                <p>{region.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* About teaser */}
        <section className="section about-teaser">
          <div className="about-content">
            <h2>About AlaskaExplorer</h2>
            <p>
              This project grew out of a real trip across Alaska. Every guide is
              based on first-hand experience: what&apos;s worth the drive, what to
              skip, and how to stay safe in the wild.
            </p>
            <p>
              In the app, you&apos;ll be able to browse all guides, save your own,
              and share your experiences once you log in.
            </p>
            <a href="/about" className="btn secondary">
              Read the full story
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
