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
import Footer from "./pages/Footer.jsx";

import { Header } from "./components/Header/Header.jsx";
import { PrivateRoute } from "./components/route-guards/PrivateRoute.jsx";
import { GuestRoute } from "./components/route-guards/GuestRoute.jsx";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/guides" element={<GuidesCatalogPage />} />
          <Route path="/guides/:guideId" element={<GuideDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Guest-only routes */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />

          {/* Private routes */}
          <Route
            path="/my-guides"
            element={
              <PrivateRoute>
                <MyGuidesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/guides/create"
            element={
              <PrivateRoute>
                <CreateGuidePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/guides/:guideId/edit"
            element={
              <PrivateRoute>
                <EditGuidePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      < Footer />
    </>
  );
}

export default App;
