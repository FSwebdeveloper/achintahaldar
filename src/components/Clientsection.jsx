
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Socialabout from "./Socialabout";

// Backend URL
const API_URL = "https://achintahaldar-backend.onrender.com";

// =====================================================
// SINGLE REVIEW ITEM
// =====================================================
function ReviewItem({
  item,
  index,
  isLiked,
  likeLoading,
  handleLike,
  onExpandChange,
}) {
  const [expanded, setExpanded] = useState(false);
  const reviewTextRef = useRef(null);
  const reviewItemRef = useRef(null);
  const [isLongReview, setIsLongReview] = useState(false);

  // Check review height
  useEffect(() => {
    const checkReviewHeight = () => {
      const element = reviewTextRef.current;

      if (!element) return;

      // Temporarily remove line clamp
      element.classList.remove("review-collapsed");

      const fullHeight = element.scrollHeight;

      const lineHeight = parseFloat(
        window.getComputedStyle(element).lineHeight
      );

      const threeLineHeight = lineHeight * 3;

      // Restore line clamp when collapsed
      if (!expanded) {
        element.classList.add("review-collapsed");
      }

      setIsLongReview(fullHeight > threeLineHeight + 2);
    };

    checkReviewHeight();

    window.addEventListener("resize", checkReviewHeight);

    return () => {
      window.removeEventListener("resize", checkReviewHeight);
    };
  }, [item.review, expanded]);

  // Read More / Read Less
  const handleReadMore = () => {
    const nextExpanded = !expanded;

    setExpanded(nextExpanded);

    if (onExpandChange) {
      onExpandChange(
        item._id || item.id || index,
        nextExpanded
      );
    }

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

  return (
    <div className="client-section" ref={reviewItemRef}>
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

      <p className="client-details">
        {"⭐".repeat(Number(item.rating) || 0)}

        <span>
          {" "}
          {getTimeAgo(item.createdAt || item.date)}
        </span>
      </p>

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

        {isLongReview && (
          <button
            type="button"
            className="review-read-more"
            onClick={handleReadMore}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}

        <h4 className="client-content">
          <span className="service-category">
            Service :
          </span>

          <p>{item.category}</p>
        </h4>

        <br />

        <div>
          <button
            type="button"
            className="btn-outline"
            onClick={() => handleLike(item._id)}
            disabled={likeLoading}
            style={{
              cursor: likeLoading ? "not-allowed" : "pointer",
              opacity: likeLoading ? 0.6 : 1,
            }}
          >
            {isLiked ? "❤️" : "🤍"}{" "}
            <span>{item.likes || 0}</span>
          </button>
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

  // Invalid or future date
  if (isNaN(difference) || difference < 0) {
    return "Recently";
  }

  // Milliseconds to days
  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  if (days === 0) {
    return "Today";
  }

  if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);

  return `${years} year${years > 1 ? "s" : ""} ago`;
}

// =====================================================
// MAIN CLIENT SECTION
// =====================================================
function Clientsection({ reviews }) {
  // Review popup state
  const [showReviewModal, setShowReviewModal] = useState(false);


useEffect(() => {
  if (!showReviewModal) return;

  const body = document.body;
  const html = document.documentElement;

  // Save previous scroll settings
  const previousBodyOverflow = body.style.overflow;
  const previousHtmlOverflow = html.style.overflow;

  // Lock background scrolling
  body.style.overflow = "hidden";
  html.style.overflow = "hidden";

  return () => {
    // Restore previous settings
    body.style.overflow = previousBodyOverflow;
    html.style.overflow = previousHtmlOverflow;
  };
}, [showReviewModal]);

  // Close popup with Escape and prevent background scrolling
  useEffect(() => {
    if (!showReviewModal) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowReviewModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [showReviewModal]);

  // Review popup
  const reviewModal = showReviewModal ? (
    <div
      className="review-modal-overlay"
      onClick={() => setShowReviewModal(false)}
    >
      <div
        className="review-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        {/* <button
          type="button"
          className="review-modal-close"
          aria-label="Close review form"
          
        >
          ×
        </button> */}

        <i class="fa fa-window-close" aria-hidden="true" onClick={() => setShowReviewModal(false)}></i>


        <Socialabout
          onSubmitSuccess={() => setShowReviewModal(false)}
        />
      </div>
    </div>
  ) : null;

  // View All / View Less
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Track expanded reviews
  const [expandedFirstTwo, setExpandedFirstTwo] = useState(
    new Set()
  );

  // First two reviews ref
  const firstTwoReviewsRef = useRef(null);

  // Like status
  const [likedReviews, setLikedReviews] = useState({});

  // Like loading status
  const [likeLoading, setLikeLoading] = useState({});

  // Like counts updated from backend
  const [likeCounts, setLikeCounts] = useState({});

  // Check like statuses
  useEffect(() => {
    const checkLikeStatuses = async () => {
      const reviewList = Array.isArray(reviews) ? reviews : [];

      if (reviewList.length === 0) {
        setLikedReviews({});
        return;
      }

      try {
        const statusResults = await Promise.all(
          reviewList.map(async (review) => {
            if (!review._id) {
              return null;
            }

            try {
              const response = await fetch(
                `${API_URL}/api/reviews/${review._id}/like-status`,
                {
                  method: "GET",
                  credentials: "include",
                }
              );

              const data = await response.json();

              if (!response.ok) {
                console.error(
                  "Like status error:",
                  data.message
                );

                return null;
              }

              return {
                reviewId: review._id,
                liked: Boolean(data.liked),
              };
            } catch (error) {
              console.error(
                "Like status request error:",
                error
              );

              return null;
            }
          })
        );

        const newLikedReviews = {};

        statusResults.forEach((result) => {
          if (!result) return;

          newLikedReviews[result.reviewId] = result.liked;
        });

        setLikedReviews(newLikedReviews);
      } catch (error) {
        console.error(
          "Check like statuses error:",
          error
        );
      }
    };

    checkLikeStatuses();
  }, [reviews]);

  // Track expanded review changes
  function handleExpandChange(reviewId, expanded) {
    setExpandedFirstTwo((previous) => {
      const next = new Set(previous);

      if (expanded) {
        next.add(reviewId);
      } else {
        next.delete(reviewId);
      }

      return next;
    });
  }

  // View All / View Less
  function toggleShowAllReviews() {
    setExpandedFirstTwo(new Set());
    setShowAllReviews((previous) => !previous);
  }

  // Like / Unlike
  async function handleLike(reviewId) {
    if (!reviewId) {
      toast.error("Review ID not found.");
      return;
    }

    if (likeLoading[reviewId]) {
      return;
    }

    setLikeLoading((previous) => ({
      ...previous,
      [reviewId]: true,
    }));

    try {
      const response = await fetch(
        `${API_URL}/api/reviews/${reviewId}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Like API response:", data);

      if (!response.ok) {
        toast.error(
          data.message || "Like operation failed."
        );

        return;
      }

      // Update Like status
      setLikedReviews((previous) => ({
        ...previous,
        [reviewId]: Boolean(data.liked),
      }));

      // Update Like count
      setLikeCounts((previous) => ({
        ...previous,
        [reviewId]: Number(data.likes || 0),
      }));

      if (data.liked) {
        toast.success("Review liked.");
      } else {
        toast.info("Review unliked.");
      }
    } catch (error) {
      console.error("Like / Unlike error:", error);
      toast.error("Unable to connect to server.");
    } finally {
      setLikeLoading((previous) => ({
        ...previous,
        [reviewId]: false,
      }));
    }
  }

  // Safety check
  const reviewList = Array.isArray(reviews) ? reviews : [];

  // No reviews yet
  if (reviewList.length === 0) {
    return (
      <div>
        <p>No Reviews Yet.</p>

        <br />

        <button
          type="button"
          className="contact-page-submit"
          onClick={() => setShowReviewModal(true)}
        >
          Write A Review
        </button>

        {reviewModal}
      </div>
    );
  }

  // First two reviews
  const firstTwoReviews = reviewList.slice(0, 2);

  // Additional reviews
  const additionalReviews = reviewList.slice(2);

  // Main return
  return (
    <div>
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
          {firstTwoReviews.map((item, index) => (
            <ReviewItem
              key={item._id || index}
              item={item}
              index={index}
              isLiked={Boolean(likedReviews[item._id])}
              likeLoading={Boolean(likeLoading[item._id])}
              handleLike={handleLike}
              onExpandChange={handleExpandChange}
            />
          ))}
        </div>
      )}

      {showAllReviews && additionalReviews.length > 0 && (
        <div className="reviews-scroll-area">
          {additionalReviews.map((item, index) => (
            <ReviewItem
              key={item._id || `additional-${index}`}
              item={item}
              index={index + 2}
              isLiked={Boolean(likedReviews[item._id])}
              likeLoading={Boolean(likeLoading[item._id])}
              handleLike={handleLike}
            />
          ))}
        </div>
      )}

      {additionalReviews.length > 0 && (
        <div className="reviews-view-button">
          <button
            type="button"
            className="review-view-all"
            onClick={toggleShowAllReviews}
          >
            {showAllReviews
              ? "View Less Reviews"
              : "View All Reviews"}
          </button>
        </div>
      )}

    </div>
  );
}

export default Clientsection;
