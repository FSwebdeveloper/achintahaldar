import "react-toastify/dist/ReactToastify.css";

import {
  ToastContainer,
} from "react-toastify";


import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ContactPage } from "./components/ContactPage";
import { AboutPage } from "./components/AboutPage";
import Productsprice from "./components/Productsprice";
import Product from "./components/Product";



function AppContent() {

  const navigate = useNavigate();


  // =====================================================
  // NAVIGATE TO CONTACT
  // =====================================================

  const handleNavigateToContact = (productName) => {

    if (productName) {

      navigate(
        `/contact?product=${encodeURIComponent(
          productName
        )}`
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

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <Navigation />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main
        className="main-content"
        id="app-main-content"
      >

        <Routes>


          {/* =================================================
              HOME
          ================================================= */}

          <Route
            path="/"
            element={
              <HomePage
                onNavigateToContact={
                  handleNavigateToContact
                }
              />
            }
          />


          {/* =================================================
              HOME
          ================================================= */}

          <Route
            path="/home"
            element={
              <HomePage
                onNavigateToContact={
                  handleNavigateToContact
                }
              />
            }
          />


          {/* =================================================
              ABOUT
          ================================================= */}

          <Route
            path="/about"
            element={
              <AboutPage />
            }
          />


          {/* =================================================
              CONTACT
          ================================================= */}

          <Route
            path="/contact"
            element={
              <ContactPage />
            }
          />


          {/* =================================================
              PRODUCT CATEGORY
          ================================================= */}

          <Route
            path="/product/:category"
            element={
              <Product />
            }
          />


          {/* =================================================
              PRODUCT DETAILS
          ================================================= */}

          <Route
            path="/product-details/:id"
            element={
              <Productsprice />
            }
          />


          {/* =================================================
              FALLBACK
          ================================================= */}

          <Route
            path="*"
            element={
              <HomePage
                onNavigateToContact={
                  handleNavigateToContact
                }
              />
            }
          />

        </Routes>

      </main>


      {/* =====================================================
          GLOBAL REACT TOASTIFY
          ===================================================== */}

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



// =====================================================
// APP
// =====================================================

export default function App() {

  return (

    <Router>

      <AppContent />

    </Router>

  );

}