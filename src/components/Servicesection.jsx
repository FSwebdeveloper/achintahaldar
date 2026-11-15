import React from "react";

function Servicsection(props) {
  return (
    <div className="service-details">
      <div className="service-content">
        <div className="service-i-img">
          <img
            className="service-content-img"
            src={props.imgURL}
            alt={props.title}
            width="35"
            height="35"
            loading="lazy"
          />
        </div>
        <div className="service-con-about">
          <h2 className="service-title">{props.title}</h2>
          <p>{props.about}</p>
        </div>
      </div>
    </div>
  );
}

export default Servicsection;
