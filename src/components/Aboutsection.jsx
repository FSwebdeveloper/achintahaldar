import React from 'react';
import Clientsection from './Clientsection';
import servicedetails from './servicedetails';
import Servicsection from './Servicesection';


function Aboutsection ({reviews, setReviews, currentUserEmail}) {
    return (
        <div className="about-section-bg">
        <div className="about-section">
        <div className="about-title-section">
        <h2 className="testimonial-title">A Little About Us</h2>
        <img src="../img/about_image.jpg" alt=""/>
        <p className="testimonial-about">I'm a Frontend Web Developer passionate about creating responsive, user-friendly, and modern web applications. Alongside web development, I specialize in collecting vintage audio systems, providing sales and service for hearing aids, and offering quality desktop and laptop accessories.</p>
        <p className="testimonial-about-more"> I combine technical expertise with practical solutions to deliver reliable products and exceptional customer service.</p>
        <a className="more-info" href="">Read More About Us »</a>
        </div>
        <div className="about-title-section">
        <h2 className="testimonial-title">Some of Our Services</h2>
        <div>

            {servicedetails.map(servicecontent =>

              <Servicsection
              
              id={servicecontent.id}
              imgURL={servicecontent.imgURL}
              title={servicecontent.title}
              about={servicecontent.about}

              />

              )
            }
         
        </div>
        <a className="more-info" href="">View All Of Our Services »</a>
        </div>
        <div className="about-title-section">
        <h2 className="testimonial-title">What Our Clients Say</h2>
        <div>
             <Clientsection reviews={reviews}
                setReviews={setReviews}
                currentUserEmail={currentUserEmail}
                /> 
            

          
           
        </div>
        </div>
        </div>
        </div>
    )
}

export default Aboutsection;