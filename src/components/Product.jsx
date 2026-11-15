
import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "./products";

export default function Products() {
  const { category } = useParams();

  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  return (
    <div>
      <div className="Extra-support-poducts"></div>

      <div className="destination-box-section">
        <div className="Explore-section">

          {/* Main Page Heading */}
          <h1 className="destination-title">
            {category.toUpperCase()}
          </h1>

          {/* Section Heading */}
          <h2 className="Explore-heading">
            Computer Parts
          </h2>

        </div>

        <div className="explore-place-img-two">
          {filteredProducts.map((item) => (
            <div className="container" key={item.id}>

              <img
                src={item.imgURL}
                alt={item.title}
                loading="lazy"
                width="300"
                height="300"
              />

              <div className="forgen-destion-name">
                <Link
                  className="product-price"
                  to={`/product-details/${item.id}`}
                >
                  {/* Product Card Heading */}
                  <h3 className="country-city">
                    {item.title}
                  </h3>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
