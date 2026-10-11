import React from 'react'
import servicedetails from "./servicedetails";
import Servicsection from "./Servicesection";

const Servicedata = () => {
  return (
    <div className="about-section-bg">
    <div className="service-about-section">
      <div className="service-title-section">

          <h2 className="testimonial-title">
            Some of Our Services
          </h2>

          <div className="service-card-sec">

            {servicedetails.map(
              (servicecontent) => (
                <Servicsection
                  key={servicecontent.id}
                  id={servicecontent.id}
                  imgURL={
                    servicecontent.imgURL
                  }
                  title={
                    servicecontent.title
                  }
                  about={
                    servicecontent.about
                  }
                />
              )
            )}

          </div>

          <a
            className="more-info"
            href=""
          >
            View All Of Our Services »
          </a>

        </div>
        </div>
    </div>
  )
}

export default Servicedata;
