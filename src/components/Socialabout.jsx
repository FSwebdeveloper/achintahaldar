
import React, { useState } from "react";
import { toast } from "react-toastify";

const Socialabout = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    post: "",
    category: "",
    rating: "",
    review: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // ==========================================
  // CONVERT STAR TO NUMBER
  // ==========================================
  function getRatingNumber(rating) {
    if (rating === "⭐") return 1;
    if (rating === "⭐⭐") return 2;
    if (rating === "⭐⭐⭐") return 3;
    if (rating === "⭐⭐⭐⭐") return 4;
    if (rating === "⭐⭐⭐⭐⭐") return 5;

    return 0;
  }

  // ==========================================
  // HANDLE FORM SUBMIT
  // ==========================================
  async function handleSubmit(event) {
    event.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // ========================================
    // NAME VALIDATION
    // ========================================
    if (formData.name.trim() === "") {
      toast.error("Please enter your name.");
      return;
    }

    if (formData.name.trim().length < 6) {
      toast.error("Name must be at least 6 characters.");
      return;
    }

    // ========================================
    // EMAIL VALIDATION
    // ========================================
    if (formData.email.trim() === "") {
      toast.error("Please enter your email.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // ========================================
    // PROFESSION VALIDATION
    // ========================================
    if (formData.post.trim() === "") {
      toast.error("Please enter your profession.");
      return;
    }

    // ========================================
    // CATEGORY VALIDATION
    // ========================================
    if (formData.category === "") {
      toast.error("Please select a category.");
      return;
    }

    // ========================================
    // RATING VALIDATION
    // ========================================
    if (formData.rating === "") {
      toast.error("Please select a rating.");
      return;
    }

    const ratingNumber = getRatingNumber(formData.rating);

    if (ratingNumber === 0) {
      toast.error("Please select a valid rating.");
      return;
    }

    // ========================================
    // REVIEW VALIDATION
    // ========================================
    if (formData.review.trim() === "") {
      toast.error("Please write your review.");
      return;
    }

    const reviewWords = formData.review
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (reviewWords.length < 6) {
      toast.error("Review must contain at least 6 words.");
      return;
    }

    // ========================================
    // PREPARE REVIEW DATA
    // ========================================
    const reviewData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      post: formData.post.trim(),
      category: formData.category,
      rating: ratingNumber,
      review: formData.review.trim(),
    };

    try {
      setIsSubmitting(true);

      // ======================================
      // POST REVIEW TO BACKEND
      // ======================================
      const response = await fetch(
        "https://achintahaldar-backend.onrender.com/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Send and receive the anonymous visitor cookie
          credentials: "include",

          body: JSON.stringify(reviewData),
        }
      );

      // ======================================
      // BACKEND RESPONSE
      // ======================================
      const data = await response.json();

      // console.log("Backend response:", data);

      // ======================================
      // CHECK BACKEND ERROR
      // ======================================
      if (!response.ok) {
        toast.error(
          data.message || "Review submission failed."
        );
        return;
      }

      // ======================================
      // SUCCESS MESSAGE
      // ======================================
      toast.success("Review submitted successfully!");

      toast.info("Your review is waiting for approval.");

      // ======================================
      // CLEAR FORM
      // ======================================
      setFormData({
        name: "",
        email: "",
        post: "",
        category: "",
        rating: "",
        review: "",
      });

      // ======================================
      // CLOSE POPUP AFTER SUCCESS
      // ======================================
      if (typeof onSubmitSuccess === "function") {
        onSubmitSuccess();
      }
    } catch (error) {
  //  console.error("Review submit error:", error);

  toast.error("Unable to connect to backend.");
  } finally {
  setIsSubmitting(false);
  }
  }

  // ==========================================
  // FORM UI
  // ==========================================
  return (
    <section id="review-form">
      <div className="social-about-bg socialabout-sec">
        <div className="social-about">
          <div className="social-about-col">
            <hr className="separation" />

            <p className="latest-heading">
              Write a Client Review
            </p>

            <form
              className="review-section"
              onSubmit={handleSubmit}
            >
              {/* NAME */}
              <div className="floating-field">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  className="contact-page"
                  type="text"
                  placeholder=" "
                  onChange={handleChange}
                  autoComplete="name"
                />

                <label htmlFor="name">
                  Your Name
                </label>
              </div>

              {/* EMAIL */}
              <div className="floating-field">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  className="contact-page"
                  type="email"
                  placeholder=" "
                  onChange={handleChange}
                  autoComplete="email"
                />

                <label htmlFor="email">
                  Your Email
                </label>
              </div>

              {/* PROFESSION */}
              <div className="floating-field">
                <input
                  id="post"
                  name="post"
                  value={formData.post}
                  className="contact-page"
                  type="text"
                  placeholder=" "
                  onChange={handleChange}
                />

                <label htmlFor="post">
                  Your Profession
                </label>
              </div>

              {/* CATEGORY */}
              <select
                className="contact-page-select-otp"
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

              {/* RATING */}
              <select
                className="contact-page-select-otp"
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

              {/* REVIEW */}
              <div className="floating-field">
                <textarea
                  id="review"
                  name="review"
                  className="contact-page-massage"
                  value={formData.review}
                  rows={5}
                  placeholder=" "
                  onChange={handleChange}
                />

                <label htmlFor="review">
                  Your Review
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="contact-page-submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Your Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Socialabout;
