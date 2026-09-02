import React, { useState } from "react";

const Socialabout = ({
  reviews,
  setReviews,
  setCurrentUserEmail,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    post: "",
    category: "",
    rating: "",
    review: "",
    imgURL: "https://lh3.googleusercontent.com/a/default-user=s32-cc",
    date: "",
  });

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  // ==============================
  // HANDLE FORM SUBMIT
  // ==============================

  function handleSubmit(event) {
    event.preventDefault();

    // Check all fields
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.post === "" ||
      formData.category === "" ||
      formData.rating === "" ||
      formData.review === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    // ==============================
    // CURRENT USER EMAIL
    // ==============================

    setCurrentUserEmail(formData.email);

    // ==============================
    // ADD REVIEW
    // ==============================

    const newReview = {
    ...formData,

    date: new Date().toISOString(),

    rating:
      formData.rating === "⭐"
        ? 1
        : formData.rating === "⭐⭐"
        ? 2
        : formData.rating === "⭐⭐⭐"
        ? 3
        : formData.rating === "⭐⭐⭐⭐"
        ? 4
        : 5,

    likes: 0,

    likedBy: [],
  };


  // ==============================
  // GET OLD REVIEWS
  // ==============================

  const savedReviews = localStorage.getItem("reviews");

  const oldReviews = savedReviews
    ? JSON.parse(savedReviews)
    : [];


  // ==============================
  // ADD NEW REVIEW
  // ==============================

  const updatedReviews = [
    ...oldReviews,
    newReview,
  ];


  // ==============================
  // SAVE ALL REVIEWS
  // ==============================

  localStorage.setItem(
    "reviews",
    JSON.stringify(updatedReviews)
  );


  // ==============================
  // UPDATE REACT STATE
  // ==============================

  setReviews(updatedReviews);
    

    // ==============================
    // CLEAR FORM
    // ==============================

    setFormData({
      name: "",
      email: "",
      post: "",
      category: "",
      rating: "",
      review: "",
      imgURL:
        "https://lh3.googleusercontent.com/a/default-user=s32-cc",
      date: "",
    });
  }

  return (
    <section id="review-form">
    <div className="social-about-bg">
         <div className="social-about">            
             <div className="social-about-col">
             <hr className="separation"/>
              <p className="latest-heading">Write a Client Review</p>

      <form
        className="review-section"
        onSubmit={handleSubmit}
      >
        {/* NAME */}

        

        <input
          name="name"
          value={formData.name}
          className="contact-page"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
        />

        {/* EMAIL */}

        

        <input
          name="email"
          value={formData.email}
          className="contact-page"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        {/* OCCUPATION */}

        

        <input
          name="post"
          value={formData.post}
          className="contact-page"
          type="text"
          placeholder="Enter your profession"
          onChange={handleChange}
        />

        {/* CATEGORY */}

        

        <select
          className="contact-page"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">
            Select Category
          </option>

          <option value="Web Design">
            Web Design
          </option>

          <option value="Hearing AIDS">
            Hearing AIDS
          </option>

          <option value="Electronics & Accessories">
            Electronics & Accessories
          </option>

          <option value="Vintage Audio Collection">
            Vintage Audio Collection
          </option>

          <option value="Desktop & Laptop">
            Desktop & Laptop
          </option>

          <option value="Online Application">
            Online Application
          </option>

          <option value="Upgrading & Reinstalling">
            Upgrading & Reinstalling
          </option>
        </select>

        {/* REVIEW */}

        

        <textarea
          name="review"
          className="contact-page-massage"
          value={formData.review}
          rows="5"
          cols="10"
          placeholder="Write your review..."
          onChange={handleChange}
        />

        {/* RATING */}

        

        <select
          className="contact-page"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value="">
            Select Rating
          </option>

          <option value="⭐">
            1 Star
          </option>

          <option value="⭐⭐">
            2 Stars
          </option>

          <option value="⭐⭐⭐">
            3 Stars
          </option>

          <option value="⭐⭐⭐⭐">
            4 Stars
          </option>

          <option value="⭐⭐⭐⭐⭐">
            5 Stars
          </option>
        </select>

        {/* SUBMIT */}

        <button
          type="submit"
          className="contact-page-submit"
        >
          Client Submit Review
        </button>
      </form>
      </div>
    </div>
    </div>
    </section>
  );
};

export default Socialabout;