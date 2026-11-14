import React from 'react';
import { Link } from 'react-router-dom';

function Herosection () {
    return (
        <div className="hero-section-bg">
        <div className="hero-section">
        <div className="hero-img-sec">
        <img className="hero-img" src="../img/Achinta-preview.avif" alt=""/>
        </div>
        <div className="hero-sec-details">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-title"><i className="f-name">A<span className="hero-title-sub-front">CHINTA</span></i> <i>H<span className="hero-title-sub-front">ALDAR</span></i></h1>
        <h2 className="web-highlight">Frontend Web Developer</h2>
        <br></br>
        <p className="hero-about">I create modern, responsive websites and provide practical digital services including computer & laptop support, online applications, hearing aid services, and electronics.</p>
        <br></br>
        <div className="service-n-div">
        <button aria-label="Web Design" data-tooltip="Web Design" className="service-name"><i className="fa-solid fa-code"></i> </button>
        <button aria-label="Computer & Laptop" data-tooltip="Computer & Laptop" className="service-name"><i className="fa-solid fa-display"></i> </button>
        <Link to="/product/hearingaids"><button aria-label="Hearing AIDS" data-tooltip="Hearing AIDS" className="service-name"><i className="fa-solid fa-headphones"></i> </button></Link>
        <button aria-label="Apply Online" data-tooltip="Apply Online" className="service-name"><i className="fa-solid fa-file-lines"></i> </button>
        {/* <button className="service-name"><i class="fa-solid fa-radio"></i> Vintage Audio</button> */}
        </div>
        <a className="hero-about-details" href="#all-service">READ MORE »</a>
        </div>
        </div>
        </div>
    )
}


export default Herosection;
