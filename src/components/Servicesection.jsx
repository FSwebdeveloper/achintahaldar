import React from 'react';

function Servicsection (props) {
    return (
        <div className="service-details">
        <div className="service-content">
            <img className="service-content-img" src={props.imgURL} alt=""/>
          <div>
           <h2 className="service-title">{props.title}</h2>
           <p>{props.about}</p>
          </div>
          </div>
        </div>
    )
}

export default Servicsection;