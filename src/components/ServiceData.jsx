import React, { useState } from 'react';
import servicedetails from "./servicedetails";
import Servicsection from "./Servicesection";

const ServiceData = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll
    ? servicedetails
    : servicedetails.slice(0, 3);

  return (
    <div className="about-section-bg">
      <div className="service-about-section">
        <div className="service-title-section">

          <h2 className="testimonial-title">
            Some of Our Services
          </h2>

          <div className="service-card-sec">
            {visibleServices.map((servicecontent) => (
              <Servicsection
                key={servicecontent.id}
                id={servicecontent.id}
                imgURL={servicecontent.imgURL}
                title={servicecontent.title}
                about={servicecontent.about}
              />
            ))}
          </div>

          <button
            type="button"
            className="view-all-button"
            onClick={() => setShowAll((previous) => !previous)}
          >
            {showAll
              ? "View Less Services »"
              : "View All Our Services »"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ServiceData;
