import React from 'react';
import { Link } from "react-router-dom";

function Sociallink () {
    return (
        <div className="logo-section-bg">
        <div className="logo-section">
            {/* <img src="../img/logo.png" alt=""/> */}
            <h1 className="logo-Fist-latter">F<span className="logo-text-color">Swebdeveloper</span></h1>
            <div className="social-link">
            <Link className="fb-icon" to="https://www.facebook.com/profile.php?id=61573635640547"><div className="social-icon-bg facebook-icon"><i class="fa-brands fa-facebook-f"></i></div></Link>
            <div className="social-icon-bg instragram-icon"><i class="fa-brands fa-instagram"></i></div>
            <div className="social-icon-bg whatsapp-icon"><i class="fa-brands fa-whatsapp"></i></div>
            <div className="social-icon-bg github-icon"><i class="fa-brands fa-github"></i></div>
            <div className="social-icon-bg linkedin-icon"><i class="fa-brands fa-linkedin-in"></i></div>
            </div>
        </div>
        </div>
    );
};

export default Sociallink;