import React from "react";
import { Link } from "react-router-dom";

function Clientsection({
  reviews,
  setReviews,
  currentUserEmail,
}) {
  // ==============================
  // RELATIVE DATE
  // ==============================

  function getTimeAgo(reviewDate) {
    const now = new Date();
    const date = new Date(reviewDate);

    const difference = now - date;

    // Milliseconds → days
    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    // Today
    if (days === 0) {
      return "Today";
    }

    // Days
    if (days < 30) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    // Months
    const months = Math.floor(days / 30);

    if (months < 12) {
      return `${months} month${
        months > 1 ? "s" : ""
      } ago`;
    }

    // Years
    const years = Math.floor(months / 12);

    return `${years} year${
      years > 1 ? "s" : ""
    } ago`;
  }

  // ==============================
  // LIKE / UNLIKE
  // ==============================

  function handleLike(index) {
    // If no user email
    if (currentUserEmail === "") {
      alert("Please submit a review first.");
      return;
    }

    setReviews((prevReviews) => {
      return prevReviews.map((review, i) => {
        // Only clicked review
        if (i !== index) {
          return review;
        }

        // ==============================
        // OWN REVIEW
        // ==============================

        if (
          review.email === currentUserEmail
        ) {
          return review;
        }

        // ==============================
        // CHECK ALREADY LIKED
        // ==============================

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

            likes: review.likes - 1,

            likedBy: review.likedBy.filter(
              (email) =>
                email !== currentUserEmail
            ),
          };
        }

        // ==============================
        // LIKE
        // ==============================

        return {
          ...review,

          likes: review.likes + 1,

          likedBy: [
            ...review.likedBy,
            currentUserEmail,
          ],
        };
      });
    });
  }

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No Reviews Yet.</p>
      ) : (
        reviews.map((item, index) => {
          // ==============================
          // OWN REVIEW?
          // ==============================

          const isOwnReview =
            item.email === currentUserEmail;

          // ==============================
          // ALREADY LIKED?
          // ==============================

          const isLiked =
            item.likedBy.includes(
              currentUserEmail
            );

          return (
            <div
              className="client-section"
              key={index}
            >
              {/* USER */}

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

              {/* RATING + DATE */}

              <p className="client-details">
                {"⭐".repeat(item.rating)}

                <span>
                  {" "}
                  {getTimeAgo(item.date)}
                </span>
              </p>

              {/* REVIEW */}

              <div>
                <p className="client-details">
                  {item.review}
                </p>

                {/* CATEGORY */}

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
                        cursor: "not-allowed",
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
                        : "🤍"}

                      {" "}

                      <span>
                        {item.likes}
                      </span>
                    </button>
                  )}
                </div>

                {/* READ MORE */}

                <a
                  className="more-info"
                  href="/"
                >
                  Read More »
                </a>
              </div>
            </div>
          );
        })
      )}
      <br></br>
      <a href="#review-form"><button className="contact-page-submit">Write A Review</button></a>
    </div>
  );
}

export default Clientsection;