import React from 'react';
import { useParams } from 'react-router-dom';
import products from './products';
import { Link } from 'react-router-dom';

export default function Products() {

  const { category } = useParams();

  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  return (
    <div>
    <div className='Extra-support-poducts'>

    </div>
    <div className="destination-box-section">

      <div className="Explore-section">
      <h1 className="destination-title">
          {category.toUpperCase()}
        </h1>
      <h1 className='Explore-heading'>Computer Parts</h1>
      </div>

      <div className="explore-place-img">

        {filteredProducts.map((item) => (

          <div className="container" key={item.id}>

            <img
              className=""
              src={item.imgURL}
              alt={item.title}
            />

            <div className="forgen-destion-name">
               <Link className="product-price" to={`/product-details/${item.id}`}>
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