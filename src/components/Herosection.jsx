import React from 'react';

function Herosection () {
    return (
        <div className="hero-section-bg">
        <div className="hero-section">
        <div className="hero-img-sec">
        <img className="hero-img" src="../img/Achinta-preview.png" alt=""/>
        </div>
        <div>
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-title"><i className="f-name">A<span className="hero-title-sub-front">CHINTA</span></i> <i>H<span className="hero-title-sub-front">ALDAR</span></i></h1>
        <h2 className="web-highlight">Frontend Web Developer</h2>
        <br></br>
        <p className="hero-about">I create modern, responsive websites and provide practical digital services including computer & laptop support, online applications, hearing aid services, and electronics.</p>
        <br></br>
        <div className="service-n-div">
        <button className="service-name"><i class="fa-solid fa-globe"></i> Web Design</button>
        <button className="service-name"><i class="fa-solid fa-desktop"></i> Computer & Laptop</button>
        <button className="service-name"><i class="fa-solid fa-ear-listen"></i> Hearing AIDS</button>
        <button className="service-name"><i class="fa-solid fa-file-circle-check"></i> Apply Online</button>
        <button className="service-name"><i class="fa-solid fa-radio"></i> Vintage Audio</button>
        </div>
        <a className="hero-about-details" href="">READ MORE »</a>
        </div>
        </div>
        </div>
    )
}


export default Herosection;
