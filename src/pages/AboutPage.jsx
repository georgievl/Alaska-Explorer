import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AboutPage() {
    const { isAuthenticated } = useAuth();

    return (
        <section className="about-page">
            {/* HERO */}
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

            {/* LAYOUT GRID */}
            <div className="about-layout">
                {/* MY ALASKA STORY */}
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
                            <figure className="about-photo">
                                <img
                                    src="public/images/about/summer1.jpg"
                                    alt="First summer in Denali"
                                />
                                <figcaption>Summer 1 · First steps into Denali.</figcaption>
                            </figure>
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
                            <figure className="about-photo">
                                <img
                                    src="public/images/about/summer2.jpg"
                                    alt="Second summer exploring Denali"
                                />
                                <figcaption>Summer 2 · Exploring further into the park.</figcaption>
                            </figure>
                            <h3>Summers 2–3 · Exploring deeper</h3>
                            <p>
                                With each returning season, I went further: longer hikes, more
                                bus routes, rafting on the Nenana River, sled dog
                                presentations, train rides, and the kind of little side trips
                                you only hear about from people who live and work there.
                            </p>
                        </div>

                        <div className="about-timeline-item">
                            <figure className="about-photo">
                                <img
                                    src="public/images/about/summer3.jpg"
                                    alt="Third summer in Alaska"
                                />
                                <figcaption>Summer 3 · Mixing work, hikes, and side trips.</figcaption>
                            </figure>
                            <h3>Summer 3 · Finding rhythm</h3>
                            <p>
                                By the third season, I had a rhythm: work, trail, repeat.
                                I started repeating favorite routes with new friends, finding
                                quieter spots, and paying more attention to weather, light,
                                and little details you only notice when you keep coming back.
                            </p>
                        </div>

                        <div className="about-timeline-item">
                            <figure className="about-photo">
                                <img
                                    src="public/images/about/summer4.jpg"
                                    alt="Fourth summer around Denali"
                                />
                                <figcaption>Summer 4 · Feeling more like a local seasonal.</figcaption>
                            </figure>
                            <h3>Summer 4 · Feeling like a local seasonal</h3>
                            <p>
                                Denali wasn&apos;t just a workplace anymore; it felt like a
                                small village that woke up every May. I helped friends plan
                                hikes, recommended tours to guests, discovered local food
                                spots, joined staff gatherings and U.S. holiday parties, and
                                watched the season shift from snow to tundra greens.
                            </p>
                        </div>

                        <div className="about-timeline-item">
                            <figure className="about-photo">
                                <img
                                    src="public/images/about/summer5.jpg"
                                    alt="Fifth summer in Denali"
                                />
                                <figcaption>
                                    Summer 5 · Coming back to a familiar home in the north.
                                </figcaption>
                            </figure>
                            <h3>Summer 5 · Coming back “home”</h3>
                            <p>
                                The last seasons felt less like travel and more like returning to a second
                                home. By then, I knew the rhythm of the place — when the first buses would
                                start rolling down the park road, when the crowds would peak and thin out,
                                which trails stayed quiet even in July, and the exact hour the light hit my
                                favorite ridge just right.
                            </p>
                            <p>
                                I wasn’t just discovering Alaska anymore; I was reconnecting with a familiar
                                world of coworkers, returning seasonal friends, local spots that only opened
                                for a few months each year, and that strange feeling of belonging in a place
                                that most people only pass through once.
                            </p>
                            <p>
                                On my days off, I slipped easily into a routine of revisiting the views that
                                meant the most to me — the overlook that felt like breathing room, the tundra
                                ridge that glowed at midnight, the riverbank where we’d gather after work.
                                Each return felt like a quiet reminder of how much this place had shaped me.
                            </p>
                            <p>
                                By the fifth summer, Denali wasn’t an adventure anymore. It was a chapter of
                                life — familiar, wild, demanding, breathtaking, and unforgettable in a way
                                that stays with you long after the snow returns and the park grows quiet again.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAVORITE EXPERIENCES — now side-by-side with story */}
                <section className="about-card about-experiences">
                    <h2>Some of my favorite Alaska moments</h2>
                    <p className="about-text">
                        These are the kinds of experiences that shaped the guides on this
                        site — the things I keep recommending to anyone heading north.
                    </p>

                    <div className="experience-grid">
                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/bus-tour.jpg"
                                    alt="Denali bus tour on the park road"
                                />
                            </figure>
                            <h3>Denali bus tours</h3>
                            <p>
                                Long days on the park road, sharing a bus with strangers who
                                become friends for a day, scanning for wildlife, and watching
                                the weather decide whether you&apos;ll see The Mountain or not.
                            </p>
                        </article>

                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/rafting.jpg"
                                    alt="Rafting the Nenana River"
                                />
                            </figure>
                            <h3>Rafting the Nenana River</h3>
                            <p>
                                Cold glacial water, big smiles, and that mix of adrenaline and
                                peace as the river wraps around the park boundaries.
                            </p>
                        </article>

                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/flightseeing.jpg"
                                    alt="Flightseeing over Alaska mountains"
                                />
                            </figure>
                            <h3>Flightseeing</h3>
                            <p>
                                Seeing ridgelines, glaciers, and Denali itself from above
                                changes your scale for everything. It&apos;s one of those
                                “if you can, do it once in your life” experiences.
                            </p>
                        </article>

                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/sled-dogs.jpg"
                                    alt="Sled dog presentation in Alaska"
                                />
                            </figure>
                            <h3>Sled dog presentations</h3>
                            <p>
                                Learning how working dogs are part of Alaska&apos;s history
                                and present, not just a photo opportunity. The energy of the
                                dogs before a run is something you don&apos;t forget.
                            </p>
                        </article>

                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/hikes-jeep.jpg"
                                    alt="Hiking and jeep safari near Denali"
                                />
                            </figure>
                            <h3>Hikes & jeep safaris</h3>
                            <p>
                                From quick after-work trails to longer day hikes and jeep
                                roads, the land around Denali keeps surprising you with new
                                views, tundra textures, and quiet moments.
                            </p>
                        </article>

                        {/* BONFIRE NIGHTS */}
                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/bonfire.jpg"
                                    alt="Bonfire gatherings with seasonal workers"
                                />
                            </figure>
                            <h3>Bonfire nights</h3>
                            <p>
                                Late-night bonfires surrounded by mountains, stories from seasonal workers,
                                guitar music, and the soft glow of midnight sun — or complete darkness in
                                early spring and late fall. These nights create friendships faster than
                                anything else in seasonal life.
                            </p>
                        </article>

                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/aurora.jpg"
                                    alt="Aurora Borealis over Alaska landscape"
                                />
                            </figure>
                            <h3>Aurora Borealis nights</h3>
                            <p>
                                On the right nights, the sky stops being just “dark” and turns
                                into a moving curtain of green and purple. Standing outside,
                                half-frozen, watching the aurora dance over the mountains is
                                one of those moments that stays with you long after the season ends.
                            </p>
                        </article>

                        {/* GLACIER LANDING (HELICOPTER) */}
                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/glacier-landing.jpg"
                                    alt="Helicopter glacier landing in Alaska"
                                />
                            </figure>
                            <h3>Glacier landing</h3>
                            <p>
                                A helicopter ride over jagged ridges that ends with landing on a remote
                                glacier — hearing complete silence except for wind and ice crackles.
                                Standing on ancient ice with mountains in every direction is an unreal,
                                humbling experience.
                            </p>
                        </article>

                        {/* HIKING — PEAKS, LAKES, TRAILS */}
                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/hiking.jpg"
                                    alt="Hiking Denali peaks, lakes, and trails"
                                />
                            </figure>
                            <h3>Hiking peaks & lakes</h3>
                            <p>
                                From steep ridgelines to hidden tundra lakes, Denali&apos;s unofficial
                                trails offer endless variety. Every hike feels different — new light,
                                new wildlife, new colors on the tundra. Some of the best moments came
                                from simple after-work hikes with unforgettable views.
                            </p>
                        </article>

                        {/* WILDLIFE SPOTTING */}
                        <article className="experience-card">
                            <figure className="experience-photo">
                                <img
                                    src="public/images/experiences/wildlife.jpg"
                                    alt="Wildlife spotting in Denali National Park"
                                />
                            </figure>
                            <h3>Wildlife spotting</h3>
                            <p>
                                One of the biggest thrills in Alaska: watching grizzlies roam the tundra,
                                seeing caribou cross the road, spotting moose with calves, following
                                golden eagles in the sky, or catching a glimpse of wolves. Wildlife makes
                                every outing unpredictable and unforgettable.
                            </p>
                        </article>
                    </div>
                </section>

                {/* WHAT YOU'LL FIND HERE — now row 2, col 1 */}
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

                {/* HOW THIS SITE IS BUILT — row 2, col 2 */}
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

            {/* CTA FOOTER */}
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
