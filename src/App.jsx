import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import Productsprice from './components/Productsprice';

import Product from './components/Product';


function AppContent() {

  const navigate = useNavigate();

  const handleNavigateToContact = (productName) => {

    if (productName) {

      navigate(
        `/contact?product=${encodeURIComponent(productName)}`
      );

    } else {

      navigate('/contact');

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


          {/* Product pages */}

          <Route
            path="/product/:category"
            element={<Product/>}
          />


          <Route
          path="/product/iVoomi keyboard"
          element={<Productsprice />}
        />

          {/* Fallback */}

          <Route
            path="*"
            element={
              <HomePage
                onNavigateToContact={handleNavigateToContact}
              />
            }
          />

        </Routes>

      </main>

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