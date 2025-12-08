import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import * as guideService from "../services/guideService.js";
import { Spinner } from "../components/Spinner.jsx";

import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const initialFormValues = {
  title: "",
  region: "",
  type: "",
  season: "",
  duration: "",
  difficulty: "",
  shortDescription: "",
  content: "",
};

export default function CreateGuidePage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState(initialFormValues);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {

    return <p>You must be logged in to create a guide.</p>;
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onCoverFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCoverFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    } else {
      setCoverPreview("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // Basic validation
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
      if (!coverFile) {
        throw new Error("Please upload a cover image for your guide.");
      }

      const fileRef = ref(
        storage,
        `guide-covers/${user.uid}/${Date.now()}_${coverFile.name}`
      );

      await uploadBytes(fileRef, coverFile);
      const coverImageUrl = await getDownloadURL(fileRef);

      const data = {
        title: values.title.trim(),
        region: values.region.trim(),
        type: values.type.trim(),
        season: values.season.trim(),
        duration: values.duration.trim(),
        difficulty: values.difficulty.trim(),
        shortDescription: values.shortDescription.trim(),
        content: values.content.trim(),
        coverImageUrl,
      };

      const newId = await guideService.createGuide(
        data,
        user.uid,
        user.displayName || user.email
      );

      navigate(`/guides/${newId}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create guide.");
      setSubmitting(false);
    }
  };

  if (submitting) {
    return <Spinner />;
  }

  return (
    <section>
      <h1>Create New Guide</h1>
      <p>Share your Alaska experience as a structured travel guide.</p>

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

        <div className="form-row cover-upload-row">
          <label className="cover-upload-label">
            Cover image *
            <input
              type="file"
              accept="image/*"
              onChange={onCoverFileChange}
            />
            <span className="cover-upload-help">
              Upload a photo you took during this trip.
            </span>
          </label>

          {coverPreview && (
            <div className="cover-preview">
              <p>Preview:</p>
              <div
                className="cover-preview-image"
                style={{ backgroundImage: `url(${coverPreview})` }}
              />
            </div>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn primary">
          Publish guide
        </button>
      </form>
    </section>
  );
}
