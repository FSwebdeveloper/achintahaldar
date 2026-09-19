import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

// =====================================================
// SINGLE REVIEW ITEM
// =====================================================
function ReviewItem({
  item,
  index,
  currentUserEmail,
  handleLike,
}) {
  // ==============================
  // READ MORE STATE
  // ==============================
  const [expanded, setExpanded] =
    useState(false);

  const reviewTextRef =
    useRef(null);

  const [isLongReview, setIsLongReview] =
    useState(false);

  // ==============================
  // CHECK REVIEW MORE THAN 2 LINES
  // ==============================
  useEffect(() => {
    const checkReviewHeight = () => {
      const element =
        reviewTextRef.current;

      if (!element) return;

      // Remove clamp temporarily
      element.classList.remove(
        "review-collapsed"
      );

      const fullHeight =
        element.scrollHeight;

      const lineHeight =
        parseFloat(
          window
            .getComputedStyle(element)
            .lineHeight
        );

      // 2 line height
      const twoLineHeight =
        lineHeight * 2;

      // Add clamp again
      if (!expanded) {
        element.classList.add(
          "review-collapsed"
        );
      }

      setIsLongReview(
        fullHeight >
          twoLineHeight + 2
      );
    };

    checkReviewHeight();

    window.addEventListener(
      "resize",
      checkReviewHeight
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkReviewHeight
      );
    };
  }, [item.review, expanded]);

  // ==============================
  // OWN REVIEW
  // ==============================
  const isOwnReview =
    item.email ===
    currentUserEmail;

  // ==============================
  // ALREADY LIKED
  // ==============================
  const isLiked =
    item.likedBy.includes(
      currentUserEmail
    );

  return (
    <div className="client-section">

      {/* ==============================
          USER
      ============================== */}

      <div className="client-content">

        <img
          src={item.imgURL}
          alt="comment-img"
        />

        <h3>
          {item.name} -
        </h3>

        <span className="service-category">
          {item.post}
        </span>

      </div>


      {/* ==============================
          RATING + DATE
      ============================== */}

      <p className="client-details">

        {"⭐".repeat(item.rating)}

        <span>
          {" "}
          {getTimeAgo(item.date)}
        </span>

      </p>


      {/* ==============================
          REVIEW
      ============================== */}

      <div>

        <p
          ref={reviewTextRef}
          className={`
            client-details
            review-text
            ${
              !expanded
                ? "review-collapsed"
                : "review-expanded"
            }
          `}
        >
          {item.review}
        </p>


        {/* ==============================
            READ MORE / READ LESS
        ============================== */}

        {isLongReview && (
          <button
            type="button"
            className="review-read-more"
            onClick={() =>
              setExpanded(!expanded)
            }
          >
            {expanded
              ? "Read Less"
              : "Read More"}
          </button>
        )}


        {/* ==============================
            CATEGORY
        ============================== */}

        <h4 className="client-content">

          <span className="service-category">
            Service :
          </span>

          <p>
            {item.category}
          </p>

        </h4>

        <br />


        {/* ==============================
            LIKE BUTTON
        ============================== */}

        <div>

          {isOwnReview ? (

            <button
              className="btn-outline"
              disabled
              style={{
                cursor:
                  "not-allowed",
                opacity: 0.6,
              }}
            >
              ❤️{" "}
              <span>
                {item.likes}
              </span>
            </button>

          ) : (

            <button
              className="btn-outline"
              onClick={() =>
                handleLike(index)
              }
            >
              {isLiked
                ? "❤️"
                : "🤍"}{" "}

              <span>
                {item.likes}
              </span>
            </button>

          )}

        </div>

      </div>

    </div>
  );
}


// =====================================================
// RELATIVE DATE
// =====================================================
function getTimeAgo(reviewDate) {

  const now = new Date();

  const date =
    new Date(reviewDate);

  const difference =
    now - date;

  const days =
    Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    );

  // Today
  if (days === 0) {
    return "Today";
  }

  // Days
  if (days < 30) {
    return `${days} day${
      days > 1
        ? "s"
        : ""
    } ago`;
  }

  // Months
  const months =
    Math.floor(
      days / 30
    );

  if (months < 12) {
    return `${months} month${
      months > 1
        ? "s"
        : ""
    } ago`;
  }

  // Years
  const years =
    Math.floor(
      months / 12
    );

  return `${years} year${
    years > 1
      ? "s"
      : ""
  } ago`;
}


// =====================================================
// MAIN COMPONENT
// =====================================================
function Clientsection({
  reviews,
  setReviews,
  currentUserEmail,
}) {

  // ===================================================
  // VIEW ALL / VIEW LESS
  // ===================================================

  const [
    showAllReviews,
    setShowAllReviews,
  ] = useState(false);


  // ===================================================
  // LIKE / UNLIKE
  // ===================================================

  function handleLike(index) {

    // No email
    if (
      currentUserEmail === ""
    ) {

      alert(
        "Please submit a review first."
      );

      return;
    }


    setReviews(
      (prevReviews) => {

        return prevReviews.map(
          (review, i) => {

            // Only clicked review
            if (i !== index) {
              return review;
            }


            // Own review
            if (
              review.email ===
              currentUserEmail
            ) {
              return review;
            }


            // Check already liked
            const alreadyLiked =
              review.likedBy.includes(
                currentUserEmail
              );


            // ==============================
            // UNLIKE
            // ==============================

            if (alreadyLiked) {

              return {

                ...review,

                likes:
                  review.likes - 1,

                likedBy:
                  review.likedBy.filter(
                    (email) =>
                      email !==
                      currentUserEmail
                  ),

              };
            }


            // ==============================
            // LIKE
            // ==============================

            return {

              ...review,

              likes:
                review.likes + 1,

              likedBy: [
                ...review.likedBy,
                currentUserEmail,
              ],

            };
          }
        );
      }
    );
  }


  // ===================================================
  // NO REVIEWS
  // ===================================================

  if (
    reviews.length === 0
  ) {

    return (

      <div>

        <p>
          No Reviews Yet.
        </p>

        <br />

        <a href="#review-form">

          <button
            className="contact-page-submit"
          >
            Write A Review
          </button>

        </a>

      </div>
    );
  }


  // ===================================================
  // FIRST 2 REVIEWS
  // ===================================================

  const firstTwoReviews =
    reviews.slice(0, 2);


  // ===================================================
  // 3RD REVIEW ONWARD
  //
  // THIS IS THE SCROLL AREA
  // ===================================================

  const additionalReviews =
    reviews.slice(2);


  return (

    <div>

      {/* =================================================
          FIRST 2 REVIEWS

          These NEVER scroll.
      ================================================= */}

      <div className="reviews-first-two">

        {firstTwoReviews.map(
          (item, index) => (

            <ReviewItem

              key={
                item._id ||
                index
              }

              item={item}

              index={index}

              currentUserEmail={
                currentUserEmail
              }

              handleLike={
                handleLike
              }

            />

          )
        )}

      </div>


      {/* =================================================
          VIEW ALL

          Review 3 onward will appear here
          and ONLY this area will scroll.
      ================================================= */}

      {showAllReviews &&
        additionalReviews.length >
          0 && (

          <div className="reviews-scroll-area">

            {additionalReviews.map(
              (item, index) => (

                <ReviewItem

                  key={
                    item._id ||
                    `additional-${index}`
                  }

                  item={item}

                  /*
                    IMPORTANT

                    Review 3
                    index = 2

                    Review 4
                    index = 3

                    Review 5
                    index = 4
                  */

                  index={
                    index + 2
                  }

                  currentUserEmail={
                    currentUserEmail
                  }

                  handleLike={
                    handleLike
                  }

                />

              )
            )}

          </div>

        )}


      {/* =================================================
          VIEW ALL / VIEW LESS BUTTON
      ================================================= */}

      {additionalReviews.length >
        0 && (

        <div className="reviews-view-button">

          <button
            type="button"
            className="review-view-all"
            onClick={() =>
              setShowAllReviews(
                !showAllReviews
              )
            }
          >

            {showAllReviews
              ? "View Less"
              : "View All Reviews"}

          </button>

        </div>

      )}


      {/* =================================================
          WRITE REVIEW
      ================================================= */}

      <br />

      <a href="#review-form">

        <button
          className="contact-page-submit"
        >
          Write A Review
        </button>

      </a>

    </div>
  );
}


export default Clientsection;