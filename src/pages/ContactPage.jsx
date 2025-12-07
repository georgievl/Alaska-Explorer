import { useState } from "react";
import emailjs from "@emailjs/browser";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!values.email.trim() || !values.message.trim()) {
      setErrorMsg("Email and message are required.");
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setErrorMsg(
        "Email service is not configured. Please check your EmailJS environment variables."
      );
      return;
    }

    setSubmitting(true);

    try {
      const templateParams = {
        from_name: values.name || "Guest",
        from_email: values.email,
        subject: values.subject || "Alaska Explorer contact form",
        message: values.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSuccessMsg("Message sent successfully! I’ll get back to you soon.");
      setValues(initialValues);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        "Something went wrong while sending your message. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      <header className="contact-header">
        <h1>Contact</h1>
        <p>
          Have a question about Alaska, need help planning a trip, or want to
          report an issue with Alaska Explorer? Send a message using the form
          below.
        </p>
      </header>

      <div className="contact-center">
        <div className="contact-card">
          <h2>Get in touch</h2>
          <p className="contact-text">
            This form uses EmailJS to send messages directly to my inbox. Fields
            marked with * are required.
          </p>

          <form className="contact-form" onSubmit={onSubmit} autoComplete="off">
            <div className="form-row">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={onChange}
                />
              </label>

              <label>
                Email *
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={onChange}
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
                value={values.subject}
                onChange={onChange}
              />
            </label>

            <label>
              Message *
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me what you're planning or what you need help with..."
                value={values.message}
                onChange={onChange}
                required
              />
            </label>

            {errorMsg && <p className="form-error">{errorMsg}</p>}
            {successMsg && <p className="form-success">{successMsg}</p>}

            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
