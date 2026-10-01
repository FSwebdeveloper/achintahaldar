import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "react-toastify";

// =====================================================
// BACKEND URL
// =====================================================

const API_URL =
  "https://achintahaldar-backend.onrender.com";

// =====================================================
// SINGLE REVIEW ITEM
// =====================================================

function ReviewItem({
  item,
  index,
  currentUserEmail,
  handleLike,
  onExpandChange,
}) {
  // ===================================================
  // READ MORE STATE
  // ===================================================

  const [expanded, setExpanded] = useState(false);

  // ===================================================
  // REVIEW TEXT REF
  // ===================================================

  const reviewTextRef = useRef(null);

  // ===================================================
  // REVIEW ITEM REF
  // ===================================================

  const reviewItemRef = useRef(null);

  // ===================================================
  // LONG REVIEW
  // ===================================================

  const [isLongReview, setIsLongReview] =
    useState(false);

  // ===================================================
  // CURRENT USER EMAIL
  // ===================================================

  const loggedInEmail =
    currentUserEmail ||
    localStorage.getItem("currentUserEmail") ||
    "";

  // ===================================================
  // CHECK REVIEW HEIGHT
  // ===================================================

  useEffect(() => {
    const checkReviewHeight = () => {
      const element = reviewTextRef.current;

      if (!element) return;

      // Remove clamp temporarily
      element.classList.remove(
        "review-collapsed"
      );

      // Full review height
      const fullHeight = element.scrollHeight;

      // Get line height
      const lineHeight = parseFloat(
        window.getComputedStyle(element).lineHeight
      );

      // Three line height
      const threeLineHeight =
        lineHeight * 3;

      // Restore clamp
      if (!expanded) {
        element.classList.add(
          "review-collapsed"
        );
      }

      // Check whether review is longer than 3 lines
      setIsLongReview(
        fullHeight > threeLineHeight + 2
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

  // ===================================================
  // OWN REVIEW
  // ===================================================

  const isOwnReview =
    item.email &&
    loggedInEmail &&
    item.email.toLowerCase() ===
      loggedInEmail.toLowerCase();

  // ===================================================
  // ALREADY LIKED
  // ===================================================

  const isLiked =
    Array.isArray(item.likedBy) &&
    loggedInEmail &&
    item.likedBy.some(
      (email) =>
        email.toLowerCase() ===
        loggedInEmail.toLowerCase()
    );

  // ===================================================
  // READ MORE / READ LESS
  // ===================================================

  const handleReadMore = () => {
    const nextExpanded = !expanded;

    setExpanded(nextExpanded);

    // Tell parent
    if (onExpandChange) {
      onExpandChange(
        item._id || item.id || index,
        nextExpanded
      );
    }

    // Scroll after opening
    if (nextExpanded) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          reviewItemRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        });
      });
    }
  };

  // ===================================================
  // REVIEW ITEM
  // ===================================================

  return (
    <div
      className="client-section"
      ref={reviewItemRef}
    >
      {/* ===============================================
          USER
      =============================================== */}

      <div className="client-content">
        <img
          src={
            item.imgURL ||
            "https://lh3.googleusercontent.com/a/default-user=s32-cc"
          }
          alt="comment-img"
        />

        <h3>{item.name} -</h3>

        <span className="service-category">
          {item.post}
        </span>
      </div>

      {/* ===============================================
          RATING + DATE
      =============================================== */}

      <p className="client-details">
        {"⭐".repeat(Number(item.rating) || 0)}

        <span>
          {" "}
          {getTimeAgo(
            item.createdAt || item.date
          )}
        </span>
      </p>

      {/* ===============================================
          REVIEW
      =============================================== */}

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

        {/* =============================================
            READ MORE / READ LESS
        ============================================= */}

        {isLongReview && (
          <button
            type="button"
            className="review-read-more"
            onClick={handleReadMore}
          >
            {expanded
              ? "Read Less"
              : "Read More"}
          </button>
        )}

        {/* =============================================
            CATEGORY
        ============================================= */}

        <h4 className="client-content">
          <span className="service-category">
            Service :
          </span>

          <p>{item.category}</p>
        </h4>

        <br />

        {/* =============================================
            LIKE BUTTON
        ============================================= */}

        <div>
          {isOwnReview ? (
            // ==========================================
            // OWN REVIEW
            // ==========================================

            <button
              type="button"
              className="btn-outline"
              disabled
              style={{
                cursor: "not-allowed",
                opacity: 0.6,
              }}
            >
              ❤️{" "}
              <span>
                {item.likes || 0}
              </span>
            </button>
          ) : (
            // ==========================================
            // OTHER USER REVIEW
            // ==========================================

            <button
              type="button"
              className="btn-outline"
              onClick={() => handleLike(index)}
            >
              {isLiked ? "❤️" : "🤍"}{" "}
              <span>
                {item.likes || 0}
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
  if (!reviewDate) {
    return "Recently";
  }

  const now = new Date();
  const date = new Date(reviewDate);
  const difference = now - date;

  // Invalid / future date
  if (
    isNaN(difference) ||
    difference < 0
  ) {
    return "Recently";
  }

  // Milliseconds → days
  const days = Math.floor(
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
      days > 1 ? "s" : ""
    } ago`;
  }

  // Months
  const months = Math.floor(
    days / 30
  );

  if (months < 12) {
    return `${months} month${
      months > 1 ? "s" : ""
    } ago`;
  }

  // Years
  const years = Math.floor(
    months / 12
  );

  return `${years} year${
    years > 1 ? "s" : ""
  } ago`;
}

// =====================================================
// MAIN CLIENT SECTION
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
  // EXPANDED FIRST TWO
  // ===================================================

  const [
    expandedFirstTwo,
    setExpandedFirstTwo,
  ] = useState(new Set());

  // ===================================================
  // FIRST TWO REF
  // ===================================================

  const firstTwoReviewsRef =
    useRef(null);

  // ===================================================
  // CURRENT USER EMAIL
  // ===================================================

  const loggedInEmail =
    currentUserEmail ||
    localStorage.getItem(
      "currentUserEmail"
    ) ||
    "";

  // ===================================================
  // SAVE EMAIL TO LOCAL STORAGE
  // ===================================================

  useEffect(() => {
    if (currentUserEmail) {
      localStorage.setItem(
        "currentUserEmail",
        currentUserEmail.trim()
      );
    }
  }, [currentUserEmail]);

  // ===================================================
  // EXPAND CHANGE
  // ===================================================

  function handleExpandChange(
    reviewId,
    expanded
  ) {
    setExpandedFirstTwo(
      (previous) => {
        const next = new Set(previous);

        if (expanded) {
          next.add(reviewId);
        } else {
          next.delete(reviewId);
        }

        return next;
      }
    );
  }

  // ===================================================
  // VIEW ALL / VIEW LESS
  // ===================================================

  function toggleShowAllReviews() {
    setExpandedFirstTwo(new Set());

    setShowAllReviews(
      (previous) => !previous
    );
  }

  // ===================================================
  // LIKE / UNLIKE
  // ===================================================

  async function handleLike(index) {
    // =================================================
    // GET CURRENT USER EMAIL
    // =================================================

    const userEmail =
      currentUserEmail ||
      localStorage.getItem(
        "currentUserEmail"
      ) ||
      "";

    // =================================================
    // NO EMAIL
    // =================================================

    if (!userEmail) {
      toast.error(
        "Please submit a review first."
      );

      return;
    }

    // =================================================
    // SELECT REVIEW
    // =================================================

    const selectedReview =
      reviews[index];

    if (!selectedReview) {
      toast.error(
        "Review not found."
      );

      return;
    }

    // =================================================
    // REVIEW ID CHECK
    // =================================================

    if (!selectedReview._id) {
      toast.error(
        "Review ID not found."
      );

      return;
    }

    // =================================================
    // OWN REVIEW CHECK
    // =================================================

    if (
      selectedReview.email &&
      selectedReview.email.toLowerCase() ===
        userEmail.toLowerCase()
    ) {
      toast.error(
        "You cannot like your own review."
      );

      return;
    }

    // =================================================
    // SEND LIKE / UNLIKE TO BACKEND
    // =================================================

    try {
      const response = await fetch(
        `${API_URL}/api/reviews/${selectedReview._id}/like`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: userEmail.trim(),
          }),
        }
      );

      // =================================================
      // BACKEND RESPONSE
      // =================================================

      const data =
        await response.json();

      console.log(
        "Like API response:",
        data
      );

      // =================================================
      // BACKEND ERROR
      // =================================================

      if (!response.ok) {
        toast.error(
          data.message ||
            "Like operation failed."
        );

        return;
      }

      // =================================================
      // UPDATE REVIEW
      // =================================================

      if (data.review) {
        setReviews(
          (previousReviews) =>
            previousReviews.map(
              (review) => {
                if (
                  review._id ===
                  data.review._id
                ) {
                  return data.review;
                }

                return review;
              }
            )
        );
      }

      // =================================================
      // SUCCESS MESSAGE
      // =================================================

      if (
        data.message ===
        "Review liked."
      ) {
        toast.success(
          "Review liked."
        );
      }

      // =================================================
      // UNLIKE MESSAGE
      // =================================================

      if (
        data.message ===
        "Review unliked."
      ) {
        toast.info(
          "Review unliked."
        );
      }

    } catch (error) {
      console.error(
        "Like / Unlike error:",
        error
      );

      toast.error(
        "Unable to connect to server."
      );
    }
  }

  // ===================================================
  // SAFETY CHECK
  // ===================================================

  const reviewList =
    Array.isArray(reviews)
      ? reviews
      : [];

  // ===================================================
  // NO REVIEWS
  // ===================================================

  if (reviewList.length === 0) {
    return (
      <div>
        <p>No Reviews Yet.</p>

        <br />

        <a href="#review-form">
          <button
            type="button"
            className="contact-page-submit"
          >
            Write A Review
          </button>
        </a>
      </div>
    );
  }

  // ===================================================
  // FIRST TWO REVIEWS
  // ===================================================

  const firstTwoReviews =
    reviewList.slice(0, 2);

  // ===================================================
  // ADDITIONAL REVIEWS
  // ===================================================

  const additionalReviews =
    reviewList.slice(2);

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <div>

      {/* =================================================
          FIRST TWO REVIEWS
      ================================================= */}

      {!showAllReviews && (
        <div
          ref={firstTwoReviewsRef}
          className={`
            reviews-first-two
            ${
              expandedFirstTwo.size > 0
                ? "reviews-first-two-scroll-active"
                : ""
            }
          `}
        >
          {firstTwoReviews.map(
            (item, index) => (
              <ReviewItem
                key={
                  item._id || index
                }
                item={item}
                index={index}
                currentUserEmail={
                  loggedInEmail
                }
                handleLike={
                  handleLike
                }
                onExpandChange={
                  handleExpandChange
                }
              />
            )
          )}
        </div>
      )}

      {/* =================================================
          ADDITIONAL REVIEWS
      ================================================= */}

      {showAllReviews &&
        additionalReviews.length > 0 && (
          <div className="reviews-scroll-area">
            {additionalReviews.map(
              (item, index) => (
                <ReviewItem
                  key={
                    item._id ||
                    `additional-${index}`
                  }
                  item={item}
                  index={index + 2}
                  currentUserEmail={
                    loggedInEmail
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
          VIEW ALL / VIEW LESS
      ================================================= */}

      {additionalReviews.length > 0 && (
        <div className="reviews-view-button">
          <button
            type="button"
            className="review-view-all"
            onClick={
              toggleShowAllReviews
            }
          >
            {showAllReviews
              ? "View Less Reviews"
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
          type="button"
          className="contact-page-submit"
        >
          Write A Review
        </button>
      </a>

    </div>
  );
}

export default Clientsection;