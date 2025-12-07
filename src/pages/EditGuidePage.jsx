import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import * as guideService from "../services/guideService.js";
import { Spinner } from "../components/Spinner.jsx";

const initialFormValues = {
  title: "",
  region: "",
  type: "",
  season: "",
  duration: "",
  difficulty: "",
  shortDescription: "",
  content: "",
  coverImageUrl: "",
};

export default function EditGuidePage() {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [values, setValues] = useState(initialFormValues);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notOwner, setNotOwner] = useState(false);

  useEffect(() => {
    async function loadGuide() {
      try {
        const guide = await guideService.getGuideById(guideId);

        if (!isAuthenticated || !user || guide.authorId !== user.uid) {
          setNotOwner(true);
        } else {
          setValues({
            title: guide.title || "",
            region: guide.region || "",
            type: guide.type || "",
            season: guide.season || "",
            duration: guide.duration || "",
            difficulty: guide.difficulty || "",
            shortDescription: guide.shortDescription || "",
            content: guide.content || "",
            coverImageUrl: guide.coverImageUrl || "",
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load guide for editing.");
      } finally {
        setLoading(false);
      }
    }

    loadGuide();
  }, [guideId, isAuthenticated, user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (!values.title.trim()) {
        throw new Error("Title is required.");
      }
      if (!values.region.trim()) {
        throw new Error("Region is required.");
      }
      if (!values.shortDescription.trim()) {
        throw new Error("Short description is required.");
      }
      if (!values.content.trim()) {
        throw new Error("Content is required.");
      }

      const data = {
        title: values.title.trim(),
        region: values.region.trim(),
        type: values.type.trim(),
        season: values.season.trim(),
        duration: values.duration.trim(),
        difficulty: values.difficulty.trim(),
        shortDescription: values.shortDescription.trim(),
        content: values.content.trim(),
        coverImageUrl: values.coverImageUrl.trim(),
      };

      await guideService.updateGuide(guideId, data);

      navigate(`/guides/${guideId}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update guide.");
      setSubmitting(false);
    }
  };

  if (loading || submitting) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section>
        <h1>Edit Guide</h1>
        <p className="form-error">{error}</p>
        <Link to={`/guides/${guideId}`} className="guide-card-link">
          ← Back to guide
        </Link>
      </section>
    );
  }

  if (notOwner) {
    return (
      <section>
        <h1>Edit Guide</h1>
        <p>You are not allowed to edit this guide.</p>
        <Link to={`/guides/${guideId}`} className="guide-card-link">
          ← Back to guide
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Edit Guide</h1>
      <p>Update your Alaska guide details and content.</p>

      <form onSubmit={onSubmit} className="guide-form">
        <div className="form-row">
          <label>
            Title *
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Region *
            <input
              type="text"
              name="region"
              placeholder="e.g. Kenai Peninsula"
              value={values.region}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Type
            <input
              type="text"
              name="type"
              placeholder="Hike, Cruise, City Walk..."
              value={values.type}
              onChange={onChange}
            />
          </label>

          <label>
            Season
            <input
              type="text"
              name="season"
              placeholder="Summer, Winter, All Year..."
              value={values.season}
              onChange={onChange}
            />
          </label>

          <label>
            Duration
            <input
              type="text"
              name="duration"
              placeholder="Half-day, 3 days..."
              value={values.duration}
              onChange={onChange}
            />
          </label>

          <label>
            Difficulty
            <input
              type="text"
              name="difficulty"
              placeholder="Easy, Moderate, Hard..."
              value={values.difficulty}
              onChange={onChange}
            />
          </label>
        </div>

        <label>
          Short description *
          <textarea
            name="shortDescription"
            rows={2}
            value={values.shortDescription}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Full content *
          <textarea
            name="content"
            rows={6}
            value={values.content}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Cover image URL
          <input
            type="url"
            name="coverImageUrl"
            placeholder="https://example.com/photo.jpg"
            value={values.coverImageUrl}
            onChange={onChange}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem" }}>
          <button type="submit" className="btn primary">
            Save changes
          </button>
          <Link to={`/guides/${guideId}`} className="btn ghost">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
