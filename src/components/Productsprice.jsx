import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from './products';

const Productsprice = () => {

  // URL থেকে ID নেওয়া
  const { id } = useParams();


  // ID দিয়ে exact product খোঁজা
  const product = products.find(
    (item) => item.id === Number(id)
  );


  // Popup
  const [popUp, setPopUp] = useState(false);


  // Popup open হলে page scroll বন্ধ
  useEffect(() => {

    if (popUp) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };

  }, [popUp]);


  // Product পাওয়া না গেলে
  if (!product) {

    return (

      <div className="destination-box-section">

        <h1>
          Product Not Found
        </h1>

        <p>
          এই product টি পাওয়া যায়নি।
        </p>

      </div>

    );

  }


  return (

    <div>

      <div className="Extra-support-poducts">
      </div>


      <div className="destination-box-section">


        {/* Page Heading */}

        <div className="Explore-section">

          <h5 className="destination-title">
            Product
          </h5>

          <h1 className="Explore-heading">
            {product.title}
          </h1>

        </div>



        {/* Popup Background */}

        <div
          className={
            popUp
              ? "opacity"
              : "opacity-none"
          }
        >
        </div>



        {/* Popup */}

        <div
          className={
            popUp
              ? "sign-destination-box-item-popup"
              : "sign-destination-box-item-close"
          }
        >

          {/* <i
            className="fa fa-window-close"
            aria-hidden="true"
            onClick={() => setPopUp(false)}
          >
          </i> */}

        </div>



        {/* PRODUCT DETAILS */}

        <div className="andaman-section">

          {/* Product Image */}

          <div className="andaman-sec-img">

            <img
              className="andaman-img"
              src={product.imgURL}
              alt={product.title}
            />

          </div>

          <div className="andaman-sec-img">

            <img
              className="andaman-img"
              src={product.imgURLB}
              alt={product.title}
            />

          </div>




          {/* Product Information */}

          <div className="package-detail">


            <div className="price-tag">

              <div className="price-tag-sec">


                {/* Product Name */}

                {/* <p className="get-quote-content-title price-basic">
                  {product.name}
                </p> */}


                {/* Product Title */}

                <p className="get-quote-content-title price-basic">
                  {product.title}
                </p>


                {/* Product Description */}

                <p className="get-quote-content">
                  {product.description}
                </p>


                {/* Product Price */}

                <div className="price-pax">

                  <p className="get-quote-content price-pax-sec">
                    ₹ {product.price} <span className="Approx-price">(Approx)</span>
                  </p>
                  

                </div>


                {/* WhatsApp Button */}

                {/* <div
                  className="sign-destination-btn quote-btn"
                  onClick={() => setPopUp(true)}
                >

                  Order on WhatsApp

                </div> */}

      {/* <div onClick={()=> setPopUp(true)}>
      <div className='sign-destination-btn quote-btn' type='submit'> <img className='call-gif' src='https://i.pinimg.com/originals/68/85/87/688587d89bcaad9109cda401fed39b66.gif' alt='' />Order on whatsapp</div>
      </div> */}


              </div>

            </div>


          </div>


        </div>


      </div>

    </div>

  );

};

export default Productsprice;