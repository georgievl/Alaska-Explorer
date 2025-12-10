import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";
import * as guideService from "../services/guideService.js";

const HERO_IMAGE = "public/images/home/hero.jpg";
const FALLBACK_FEATURED_IMAGE = "/images/home/featured-fallback.jpg";

export default function HomePage() {
    const [featuredGuides, setFeaturedGuides] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [featuredError, setFeaturedError] = useState("");

    useEffect(() => {
        async function loadFeaturedGuides() {
            try {
                setFeaturedError("");
                const result = await guideService.getTopGuidesByLikes(3);
                setFeaturedGuides(result);
            } catch (err) {
                console.error(err);
                setFeaturedError("Failed to load featured guides.");
            } finally {
                setLoadingFeatured(false);
            }
        }

        loadFeaturedGuides();
    }, []);

    return (
        <div className="home">
            <section
                className="hero"
                style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            >
                <div className="hero-overlay">
                    <div className="hero-content">
                        <p className="hero-eyebrow">Travel Blog &amp; Guide</p>
                        <h1 className="hero-title">Discover Alaska - the way you see it and want to experience it.</h1>
                        <p className="hero-subtitle">
                            A collection of guides, practical tips, and lived experiences gathered while exploring Alaska’s rugged wilderness.
                        </p>
                        <div className="hero-actions">
                            <Link to="/guides" className="btn primary">
                                Explore all guides
                            </Link>
                            <Link to="/about" className="btn ghost">
                                Learn about the project
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <main className="home-main">
                <section className="section">
                    <div className="section-header">
                        <h2>Featured Guides</h2>
                        <Link to="/guides" className="section-link">
                            View all guides →
                        </Link>
                    </div>

                    {loadingFeatured ? (
                        <Spinner />
                    ) : featuredError ? (
                        <p className="form-error">{featuredError}</p>
                    ) : featuredGuides.length === 0 ? (
                        <p>
                            No guides yet. Once people start creating guides and liking them, the
                            top three will appear here.
                        </p>
                    ) : (
                        <div className="card-grid">
                            {featuredGuides.map((guide) => (
                                <article key={guide.id} className="guide-card">
                                    <div
                                        className="guide-card-image"
                                        style={{
                                            backgroundImage: `url(${guide.coverImageUrl || FALLBACK_FEATURED_IMAGE
                                                })`,
                                        }}
                                    />
                                    <div className="guide-card-body">
                                        <p className="guide-card-meta">
                                            <span>{guide.region || "Unknown region"}</span>
                                            {guide.season && (
                                                <>
                                                    {" · "}
                                                    <span>{guide.season}</span>
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
                                        <Link
                                            to={`/guides/${guide.id}`}
                                            className="guide-card-link"
                                        >
                                            Read guide →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
