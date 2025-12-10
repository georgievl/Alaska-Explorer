# Alaska Explorer

**Alaska Explorer** is a React single-page application that combines a personal travel blog with a community-style guide catalog focused on **Alaska** – especially the **Denali** area.

It’s based on five real summers spent living and working in Denali National Park and is built as a **portfolio / course project** using **React + Firebase** (Auth, Firestore, Storage) and **EmailJS**.

---

## 📸 Screenshots

> Screenshots showcasing the main pages and functionality of the application.

### Home Page
![Home Page](./screenshots/home.png)

### Guides Catalog
![Guides Catalog](screenshots/guides-catalog.png)

### Guide Details
![Guide Details](screenshots/guide-details.png)

### Create / Edit Guide
![Create Guide](screenshots/create-guide.png)

### My Guides
![My Guides](screenshots/my-guides.png)

### Profile Page
![Profile Page](screenshots/profile.png)

### Contact Page
![Contact Page](screenshots/contact.png)

---

## ✨ Features

### Public area
- Home page with hero section and featured guides (top liked guides)
- Guides catalog – browse all published guides
- Guide details page with full content
- About page with real-story timeline and favorite Alaska moments
- Contact page with a **live EmailJS contact form**
- 404 – “Not Found” fallback route

### Authentication & profile
- Register, login, logout (Firebase Authentication – email/password)
- Protected routes (only logged-in users can create/edit/delete)
- Profile page:
  - Display name & avatar (URL or uploaded image)
  - Upload avatar to Firebase Storage
  - Personal stats: guides created, total likes received, comments written
  - Password reset email

### Guides (CRUD + engagement)
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

---

## 🧱 Tech Stack

### Frontend
- React
- React Router

### Backend / services
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- EmailJS (contact form)

### Tooling
- Vite
- npm / Node.js
