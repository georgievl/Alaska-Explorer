import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

export default function EditGuidePage() {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [values, setValues] = useState(initialFormValues);
  const [existingCoverUrl, setExistingCoverUrl] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notOwner, setNotOwner] = useState(false);

  useEffect(() => {
    async function loadGuide() {
      try {
        setError("");
        setLoading(true);

        const guide = await guideService.getGuideById(guideId);

        if (!isAuthenticated || !user || guide.authorId !== user.uid) {
          setNotOwner(true);
          return;
        }

        setValues({
          title: guide.title || "",
          region: guide.region || "",
          type: guide.type || "",
          season: guide.season || "",
          duration: guide.duration || "",
          difficulty: guide.difficulty || "",
          shortDescription: guide.shortDescription || "",
          content: guide.content || "",
        });

        const url = guide.coverImageUrl || "";
        setExistingCoverUrl(url);
        setCoverPreview(url);
      } catch (err) {
        console.error(err);
        setError("Failed to load guide for editing.");
      } finally {
        setLoading(false);
      }
    }

    loadGuide();
  }, [guideId, isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <section>
        <h1>Edit Guide</h1>
        <p>You must be logged in to edit a guide.</p>
        <Link to="/login" className="btn primary">
          Go to login
        </Link>
      </section>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  if (notOwner) {
    return (
      <section>
        <h1>Edit Guide</h1>
        <p>You are not allowed to edit this guide.</p>
        <Link to={`/guides/${guideId}`} className="btn ghost">
          Back to guide
        </Link>
      </section>
    );
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

      setCoverPreview(existingCoverUrl);
    }
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

      let coverImageUrl = existingCoverUrl;

      if (coverFile) {
        const fileRef = ref(
          storage,
          `guide-covers/${user.uid}/${Date.now()}_${coverFile.name}`
        );

        await uploadBytes(fileRef, coverFile);
        coverImageUrl = await getDownloadURL(fileRef);
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
        coverImageUrl,
      };

      await guideService.updateGuide(guideId, data);

      navigate(`/guides/${guideId}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update guide.");
      setSubmitting(false);
    }
  };

  if (submitting) {
    return <Spinner />;
  }

  return (
    <section>
      <h1>Edit Guide</h1>
      <p>Update your Alaska guide with improved details or a new cover photo.</p>

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
            Cover image
            <input
              type="file"
              accept="image/*"
              onChange={onCoverFileChange}
            />
            <span className="cover-upload-help">
              Upload a new photo if you want to replace the current cover.
            </span>
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn primary">
          Save changes
        </button>
      </form>
    </section>
  );
}
