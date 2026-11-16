import React, { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { Navigation } from "./components/Navigation";

// Homepage eager import — LCP-এর জন্য
import { HomePage } from "./components/HomePage";

// Other pages lazy load
const ContactPage = lazy(() =>
  import("./components/ContactPage").then((module) => ({
    default: module.ContactPage,
  }))
);

const AboutPage = lazy(() =>
  import("./components/AboutPage").then((module) => ({
    default: module.AboutPage,
  }))
);

const Productsprice = lazy(() =>
  import("./components/Productsprice")
);

const Product = lazy(() =>
  import("./components/Product")
);

function AppContent() {
  const navigate = useNavigate();

  const handleNavigateToContact = (productName) => {
    if (productName) {
      navigate(
        `/contact?product=${encodeURIComponent(productName)}`
      );
    } else {
      navigate("/contact");
    }
  };

  return (
    <div
      className="app-container"
      id="app-main-container"
    >
      <Navigation />

      <main
        className="main-content"
        id="app-main-content"
      >
        <Suspense fallback={<div className="page-loading" />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onNavigateToContact={handleNavigateToContact}
                />
              }
            />

            <Route
              path="/home"
              element={
                <HomePage
                  onNavigateToContact={handleNavigateToContact}
                />
              }
            />

            <Route
              path="/about"
              element={<AboutPage />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />

            <Route
              path="/product/:category"
              element={<Product />}
            />

            <Route
              path="/product-details/:id"
              element={<Productsprice />}
            />

            <Route
              path="*"
              element={
                <HomePage
                  onNavigateToContact={handleNavigateToContact}
                />
              }
            />
          </Routes>
        </Suspense>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
