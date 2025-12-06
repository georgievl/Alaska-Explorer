import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import GuidesCatalogPage from "./pages/GuidesCatalogPage.jsx";
import GuideDetailsPage from "./pages/GuideDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MyGuidesPage from "./pages/MyGuidesPage.jsx";
import CreateGuidePage from "./pages/CreateGuidePage.jsx";
import EditGuidePage from "./pages/EditGuidePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <>
      {/* Later we’ll add Header here */}

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/guides" element={<GuidesCatalogPage />} />
          <Route path="/guides/:guideId" element={<GuideDetailsPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private routes (will be protected later) */}
          <Route path="/my-guides" element={<MyGuidesPage />} />
          <Route path="/guides/create" element={<CreateGuidePage />} />
          <Route path="/guides/:guideId/edit" element={<EditGuidePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
