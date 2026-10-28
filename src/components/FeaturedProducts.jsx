
import React from 'react';
import products from './products';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {

  return (
    <div>
      <div className='Extra-support-poducts'>

      </div>

      <div className="destination-box-section">

        <div className="Explore-section">
          <h1 className="destination-title">
            ALL PRODUCTS
          </h1>

          <h1 className='Explore-heading'>
            Computer Parts
          </h1>
        </div>
         
        <div className="explore-place-img">

          {products.slice(0, 3).map((item) => (

            <div className="container" key={item.id}>

              <img
                className=""
                src={item.imgURL}
                alt={item.title}
              />

              <div className="forgen-destion-name">

                <Link
                  className="product-price"
                  to={`/product-details/${item.id}`}
                >
                  <h5 className="country-city">
                    {item.title}
                  </h5>
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}
