import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import * as guideService from "../services/guideService.js";
import { Spinner } from "../components/Spinner.jsx";

import { auth } from "../config/firebase";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfilePage() {
  const { user, isAuthenticated, logout, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");
  const [guidesCount, setGuidesCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  const [avatarUploading, setAvatarUploading] = useState(false);

  const [resetSending, setResetSending] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    async function loadStats() {
      try {
        setStatsError("");
        setStatsLoading(true);

        const guides = await guideService.getGuidesByAuthor(user.uid);
        setGuidesCount(guides.length);

        const likes = guides.reduce(
          (sum, g) => sum + (g.likesCount || 0),
          0
        );
        setTotalLikes(likes);

        const comments = await guideService.getCommentsByAuthor(user.uid);
        setCommentsCount(comments.length);
      } catch (err) {
        console.error(err);
        setStatsError("Failed to load your activity statistics.");
      } finally {
        setStatsLoading(false);
      }
    }

    loadStats();
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return (
      <section>
        <h1>Profile</h1>
        <p>You must be logged in to view your profile.</p>
        <Link to="/login" className="btn primary">
          Go to login
        </Link>
      </section>
    );
  }

  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "";

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileMessage("");

    if (!auth.currentUser) {
      setProfileError("No authenticated user.");
      return;
    }

    try {
      setProfileSaving(true);

      await updateProfile(auth.currentUser, {
        displayName: displayName.trim() || null,
        photoURL: photoURL.trim() || null,
      });

      await refreshUser();

      setProfileMessage("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setProfileError("Failed to update profile. Please try again.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setAvatarUploading(true);
      setProfileError("");
      setProfileMessage("");

      const fileRef = ref(
        storage,
        `avatars/${user.uid}/${Date.now()}_${file.name}`
      );
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      await updateProfile(auth.currentUser, { photoURL: url });

      await refreshUser();

      setPhotoURL(url);
      setProfileMessage("Avatar updated successfully.");
    } catch (err) {
      console.error(err);
      setProfileError("Failed to upload avatar. Please try again.");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!user.email) {
      setResetError("No email is associated with this account.");
      return;
    }

    try {
      setResetError("");
      setResetMessage("");
      setResetSending(true);

      await sendPasswordResetEmail(auth, user.email);
      setResetMessage(
        `Password reset email sent to ${user.email}. Please check your inbox.`
      );
    } catch (err) {
      console.error(err);
      setResetError("Failed to send password reset email.");
    } finally {
      setResetSending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const initials =
    user.displayName?.[0]?.toUpperCase() ||
    user.email?.[0]?.toUpperCase() ||
    "?";

  return (
    <section className="profile-page">
      <header className="profile-header">
        <div className="profile-avatar-wrap">
          {photoURL ? (
            <img src={photoURL} alt="Avatar" className="profile-avatar" />
          ) : (
            <div className="profile-avatar-fallback">{initials}</div>
          )}

          <label className="avatar-upload-btn">
            {avatarUploading ? "Uploading..." : "Change avatar"}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarFileChange}
              disabled={avatarUploading}
              hidden
            />
          </label>
        </div>

        <div className="profile-main-info">
          <h1>{user.displayName || "Unnamed Explorer"}</h1>
          <p className="profile-email">{user.email}</p>
          {memberSince && (
            <p className="profile-member-since">Member since {memberSince}</p>
          )}

          <div className="profile-actions">
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate("/my-guides")}
            >
              View my guides
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() => navigate("/guides/create")}
            >
              Create new guide
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="profile-layout">
        <section className="profile-card">
          <h2>Your activity</h2>

          {statsLoading ? (
            <Spinner />
          ) : statsError ? (
            <p className="form-error">{statsError}</p>
          ) : (
            <ul className="profile-stats">
              <li>
                <span className="profile-stat-label">Guides created</span>
                <span className="profile-stat-value">{guidesCount}</span>
              </li>
              <li>
                <span className="profile-stat-label">Total likes received</span>
                <span className="profile-stat-value">{totalLikes}</span>
              </li>
              <li>
                <span className="profile-stat-label">Comments written</span>
                <span className="profile-stat-value">{commentsCount}</span>
              </li>
            </ul>
          )}
        </section>

        <section className="profile-card">
          <h2>Edit profile</h2>
          <p className="profile-card-text">
            Update your display name and avatar URL. Avatar can also be changed
            by uploading an image above.
          </p>

          <form onSubmit={handleSaveProfile} className="profile-form">
            <label>
              Display name
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How you want to appear in guides & comments"
              />
            </label>

            <label>
              Avatar URL
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </label>

            {profileError && <p className="form-error">{profileError}</p>}
            {profileMessage && (
              <p className="form-success">{profileMessage}</p>
            )}

            <button
              type="submit"
              className="btn primary"
              disabled={profileSaving}
            >
              {profileSaving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        <section className="profile-card">
          <h2>Account security</h2>
          <p className="profile-card-text">
            If you forgot your password or want to change it, you can send a
            password reset email to your account address.
          </p>

          {resetError && <p className="form-error">{resetError}</p>}
          {resetMessage && <p className="form-success">{resetMessage}</p>}

          <button
            type="button"
            className="btn secondary"
            onClick={handleSendPasswordReset}
            disabled={resetSending}
          >
            {resetSending ? "Sending..." : "Send password reset email"}
          </button>
        </section>
      </div>
    </section>
  );
}
