export default function ContactPage() {
  return (
    <section className="contact-page">
      <header className="contact-header">
        <h1>Contact</h1>
        <p>
          Have a question about Alaska, need help planning a trip, or want to
          report an issue with the platform? Send a message and I’ll get back to
          you.
        </p>
      </header>

      <div className="contact-center">
        <div className="contact-card">
          <h2>Get in touch</h2>
          <p className="contact-text">
            This contact form is part of the Alaska Explorer project. It's a demo
            form, so messages are not actually sent — but in a real application,
            they would be delivered by email or stored in the backend.
          </p>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message submitted (demo).");
            }}
          >
            <div className="form-row">
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>

              <label>
                Email *
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <label>
              Subject
              <input
                type="text"
                name="subject"
                placeholder="Planning a trip to Alaska…"
              />
            </label>

            <label>
              Message *
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me what you're planning or what you need help with..."
                required
              />
            </label>

            <button type="submit" className="btn primary">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
