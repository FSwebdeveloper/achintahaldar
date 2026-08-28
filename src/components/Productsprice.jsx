import React, {useState, useEffect} from 'react'

// import Destination from '../Destination/Destination';

const Productsprice = () => {

  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    // Disable scroll when modal is open
    if (popUp) {
      document.body.style.overflowY = 'hidden';
    } else {
      // Re-enable scroll when modal is closed
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [popUp]);

  return (
    <div>
    <div className='Extra-support-poducts'>

    </div>
    {/* <Destination/> */}
      <div className='destination-box-section'>
      <div className='Explore-section'>
       <h5 className='destination-title'>Product</h5>
       <h1 className='Explore-heading'>Keyboard</h1>
       </div>
      {/* <div className='andaman-section'>
      <img className='andaman-img' src='https://images.unsplash.com/photo-1682687981630-cefe9cd73072?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt=''/>
      <div className='price-tag-quote'>
      <div className='price-tag'>
       <div className='price-tag-sec'>
       <p className='get-quote-content-title price-basic'>Starting from</p>
       <div className='price-pax'>
       <p className='get-quote-content price-pax-sec'>₹ 18,000</p>
       <p className='get-quote-content per-person-sec'>Per Person</p>
       </div>
       </div>
      </div>
      <div className='get-quote'>
      <p className='get-quote-content-title'>Tour Details</p>
      <p className='get-quote-content'><i class="fa-solid package-icon-color fa-location-dot"></i> Destination: Andaman</p>
      <p className='get-quote-content'><i class="fa-solid package-icon-color fa-calendar-days"></i> Duration: 6 Nights 7 Days</p>
      
      <p className='get-quote-content get-quote-content-ex'> <i class="fa-solid package-icon-color fa-right-left"></i> Ex: Kolkata</p>
      <div>
      <div className='sign-destination-btn quote-btn' type='submit'> <img className='call-gif' src='https://lh4.googleusercontent.com/proxy/b5nvuM_z5To41IjlaQJUf64asxJNl-Yfwl9xl0Zn1gPEqhePoy_OHYJ54KLnjSexjDcF3_Qb6jVu3Dw' alt=''/>Get a FREE Quote</div>
      </div>

      </div>
      </div>
      </div> */}

      {/* Quote Function */}

      <div className={popUp === true ? "opacity" : "opacity-none"}></div>
      <div className={popUp === false ? "sign-destination-box-item-close" : "sign-destination-box-item-popup" }>
      {/* <div className='sign-destination'>
      </div> */}
      {/* <i class="fa fa-window-close" aria-hidden="true" onClick={()=> setPopUp(false)}></i> */}
      </div>

      <div className='andaman-section'>
      <div className='andaman-sec-img'>
      <img className='andaman-img' src="https://rukminim1.flixcart.com/image/1366/1366/xif0q/keyboard/desktop-keyboard/f/l/m/quest-ivoomi-original-imah5usscvbmswjk.jpeg?q=90" alt=''/>
      </div>
      <div className='package-detail'>
      <div className='price-tag'>
       <div className='price-tag-sec'>
       <p className='get-quote-content-title price-basic'>iVoomi</p>
       <p className='get-quote-content-title price-basic'>iVoomi Quest + Wired USB Standard Desktop Keyboard Compatible with Desktop, Laptop, Mac stand support,IVOOMI QUEST (Black)</p>
       <div className='price-pax'>
       <p className='get-quote-content price-pax-sec'>₹ 299</p>
       {/* <p className='get-quote-content per-person-sec'>Per Piece</p> */}
       </div>
       </div>
      </div>

      {/* <div className='get-quote'>
      <p className='get-quote-content-title'>iVoomi</p>
      <p className='get-quote-content'><i class="fa-solid package-icon-color fa-location-dot"></i> Destination: Andaman</p>
      {/* <p className='get-quote-content'><i class="fa-solid package-icon-color fa-calendar-days"></i>Duration: 6 Nights 7 Days</p>
      
      <p className='get-quote-content get-quote-content-ex'> <i class="fa-solid package-icon-color fa-right-left"></i>Ex: Kolkata</p> */}
      
      {/* <div onClick={()=> setPopUp(true)}>
      <div className='sign-destination-btn quote-btn' type='submit'> <img className='call-gif' src='https://i.pinimg.com/originals/68/85/87/688587d89bcaad9109cda401fed39b66.gif' alt='' />Get a FREE Quote</div>
      </div> */}

      {/* </div> */} 
      </div>
      </div>

      {/* Quote Function */}

      {/* <div className='andaman-section'>
      <div className='andaman-sec-img'>
      <img className='andaman-img' src='https://images.unsplash.com/photo-1682687981630-cefe9cd73072?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt=''/>
      </div>
      <div className='package-detail'>
      <div className='price-tag'>
       <div className='price-tag-sec'>
       <p className='get-quote-content-title price-basic'>Starting from</p>
       <div className='price-pax'>
       <p className='get-quote-content price-pax-sec'>₹ 18,000</p>
       <p className='get-quote-content per-person-sec'>Per Person</p>
       </div>
       </div>
      </div>

      <div className='get-quote'>
      <p className='get-quote-content-title'>Tour Details</p>
      <p className='get-quote-content'><i class="fa-solid package-icon-color fa-location-dot"></i> Destination: Andaman</p>
      <p className='get-quote-content'><i class="fa-solid package-icon-color fa-calendar-days"></i> Duration: 6 Nights 7 Days</p>
      
      <p className='get-quote-content get-quote-content-ex'> <i class="fa-solid package-icon-color fa-right-left"></i> Ex: Kolkata</p>
      <div>
      <div className='sign-destination-btn quote-btn' type='submit'> <img className='call-gif' src='https://i.pinimg.com/originals/68/85/87/688587d89bcaad9109cda401fed39b66.gif' alt=''/>Get a FREE Quote</div>
      </div>

      </div>
      </div>
      </div> */}
      
      {/* <div className='Itinerary-heading'>
      <h1 className='I-heading'>7Days Package Including</h1>
      </div>
      
      <div className='andaman-section'>
      <div className='Inclution-section'>
      <p className='I-heading'>Accommodation, Food, Ship, Speed boats & cruise tkt, all entry fee your tour program.</p>
      </div>
      </div>
      <div className='Itinerary-heading'>
      <h1 className='I-heading'>7Days Package Excluding</h1>
      </div>
      <div className='andaman-section'>
      <div className='Inclution-section'>
      <p className='I-heading'>Mineral Water, Camera charges, any other personal activities (Glass bottom boat, snorkeling, Scuba diving etc ) & Any extra tour pragm.</p>
      </div>
      </div>
      <div className='Itinerary-heading'>
      <h1 className='I-heading'>Accommodation Details</h1>
      </div>
      <div className='andaman-section'>
      <div className='Inclution-section'>
      <div className='I-heading'>
      <h4>Hotel Name </h4>
        <li>Valley Luxury hotel- Portblair </li>
        <li>Orient Legend beach Resort at Have lock Island.</li>
        <li>Deep sea Resort at Neal Island.</li>
      </div>
      </div>
      </div> */}
      
      {/* <div className='Itinerary-heading'>
      <h1 className='I-heading-policy'>Booking Policy</h1>
      </div>
      <div className='andaman-section'>
      <div className='Inclution-section'>
      <div className='I-heading-policy'>
      <li>All hotels and resorts check-in time is 9am and check-out time is 8am.</li>
      <li>As on your conform booking whichever above mentioned hotel will have available room that hotel will be reserve for your package.</li>
      <li>For 3year child there will be no tour charges but for entry fee and cruise ticket the charges should be pay by the party.</li>
      <li>30% of your total package cost should pay in the below mention account number and the remaining 70% on check-in time.</li>
      <li>On check-out day if are require to have lunch then the charges should be pay by the party.</li>
      </div>
      </div>
      </div> */}
      </div>
    </div>
  )
}

export default Productsprice;

