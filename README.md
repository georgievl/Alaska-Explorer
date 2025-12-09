# Alaska Explorer

**Alaska Explorer** is a React single-page application that combines a personal travel blog with a community-style guide catalog focused on **Alaska** – especially the **Denali** area.

It’s based on five real summers spent living and working in Denali National Park and is built as a **portfolio / course project** using **React + Firebase** (Auth, Firestore, Storage) and **EmailJS**.

---

## ✨ Features

- **Public area**
  - Home page with hero section and featured guides (top liked guides)
  - Guides catalog – browse all published guides
  - Guide details page with full content
  - About page with real-story timeline and favorite Alaska moments
  - Contact page with a **live EmailJS contact form**
  - 404 – “Not Found” fallback route

- **Authentication & profile**
  - Register, login, logout (Firebase Authentication – email/password)
  - Protected routes (only logged-in users can create/edit/delete)
  - Profile page:
    - Display name & avatar (URL or uploaded image)
    - Upload avatar to Firebase Storage
    - Personal stats: guides created, total likes received, comments written
    - Password reset email

- **Guides (CRUD + engagement)**
  - Create new guide with:
    - Title, region, type, season, duration, difficulty
    - Short description
    - Full content
    - Cover image uploaded to **Firebase Storage**
  - Edit guide (including optional cover image change)
  - Delete guide (owner-only)
  - “My Guides” page – list of guides created by the logged-in user
  - Likes:
    - Logged-in users can like/unlike guides
    - Live likes count and top 3 most liked guides on the home page
  - Comments:
    - Logged-in users can add comments to guides
    - Authors can delete their own comments

- **Styling & UX**
  - Custom, cohesive design (no UI library) tuned to Alaska imagery
  - Responsive layout for desktop and mobile
  - Sticky header with navigation
  - Consistent “panel” design across pages (cards, forms, profile, about)
  - Loading states (spinners) and clear error / success messages

---

## 🧱 Tech Stack

- **Frontend**
  - React
  - React Router
- **Backend / services**
  - Firebase Authentication
  - Cloud Firestore
  - Firebase Storage
  - EmailJS (contact form)
- **Tooling**
  - Vite
  - npm / Node.js

---
