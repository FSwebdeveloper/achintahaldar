
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";

import {
  User,
  Phone,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Package,
  Lock,
} from "lucide-react";

export const ContactPage = () => {
  const location = useLocation();

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  // UI & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Submissions state
  const [submissions, setSubmissions] = useState([]);

  // Load submissions and handle query params
  useEffect(() => {
    const saved = localStorage.getItem("contact_submissions");

    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved submissions", e);
      }
    }

    const params = new URLSearchParams(location.search);
    const productParam = params.get("product");

    if (productParam) {
      setProduct(productParam);

      setErrors((prev) => {
        const next = { ...prev };
        delete next.product;
        return next;
      });
    }

    const type = params.get("type");

    if (type === "current") {
      setDescription("Application for: Current Apply\n");
    } else if (type === "passport") {
      setDescription("Application for: Passport Apply\n");
    } else if (type === "fresh-passport") {
      setDescription("Application for: Fresh Passport Apply\n");
    } else if (type === "reissue-passport") {
      setDescription("Application for: Reissue Passport Apply\n");
    }
  }, [location.search]);

  // Save submissions
  const saveSubmissions = (newSubmissions) => {
    setSubmissions(newSubmissions);
    localStorage.setItem(
      "contact_submissions",
      JSON.stringify(newSubmissions)
    );
  };

  // Count words
  const countWords = (text) => {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Validate Indian phone numbers
  const validateIndianPhone = (value) => {
    const cleanNum = value.trim().replace(/[\s()-]/g, "");
    const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    return indianPhoneRegex.test(cleanNum);
  };

  // Validate fields silently. Toastify only appears on Submit.
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    const trimmedValue = value.trim();

    if (fieldName === "name") {
      if (!trimmedValue) {
        newErrors.name = "Full Name is required";
      } else if (trimmedValue.length < 6) {
        newErrors.name = "Full Name must contain at least 6 characters";
      } else if (trimmedValue.length > 50) {
        newErrors.name = "Full Name cannot exceed 50 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (fieldName === "phone") {
      if (!trimmedValue) {
        newErrors.phone = "Phone number is required";
      } else if (!validateIndianPhone(value)) {
        newErrors.phone =
          "Please enter a valid 10-digit Indian phone number (e.g. 9876543210 or +91 9876543210)";
      } else {
        delete newErrors.phone;
      }
    }

    if (fieldName === "product") {
      if (!trimmedValue) {
        newErrors.product = "Products / Services is required";
      } else if (trimmedValue.length < 10) {
        newErrors.product =
          "Products / Services must contain at least 10 characters";
      } else if (trimmedValue.length > 100) {
        newErrors.product =
          "Products / Services cannot exceed 100 characters";
      } else {
        delete newErrors.product;
      }
    }

    if (fieldName === "description") {
      const wordsCount = countWords(value);

      if (!trimmedValue) {
        newErrors.description = "Description is required";
      } else if (wordsCount < 10) {
        newErrors.description =
          `Description must contain at least 10 words (currently ${wordsCount})`;
      } else if (trimmedValue.length > 500) {
        newErrors.description =
          "Description cannot exceed 500 characters";
      } else {
        delete newErrors.description;
      }
    }

    setErrors(newErrors);
  };

  // Handle inputs
  const handleInputChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "product") setProduct(value);
    if (field === "description") setDescription(value);

    if (errors.general && (field === "name" || field === "phone")) {
      const updatedErrors = { ...errors };

      delete updatedErrors.general;

      if (updatedErrors.name === "Name and Phone Number already exist") {
        delete updatedErrors.name;
      }

      if (updatedErrors.phone === "Name and Phone Number already exist") {
        delete updatedErrors.phone;
      }

      setErrors(updatedErrors);
    }

    if (touched[field]) {
      validateField(field, value);
    }
  };

  // Blur validation: updates field border only
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    const val =
      field === "name"
        ? name
        : field === "phone"
          ? phone
          : field === "product"
            ? product
            : description;

    validateField(field, val);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      product: true,
      description: true,
    });

    // Validate all fields
    const newErrors = {};

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedProduct = product.trim();
    const trimmedDescription = description.trim();

    // Name validation
    if (!trimmedName) {
      newErrors.name = "Full Name is required";
    } else if (trimmedName.length < 6) {
      newErrors.name = "Full Name must contain at least 6 characters";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Full Name cannot exceed 50 characters";
    }

    // Phone validation
    if (!trimmedPhone) {
      newErrors.phone = "Phone number is required";
    } else if (!validateIndianPhone(phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit Indian phone number (e.g. 9876543210 or +91 9876543210)";
    }

    // Product validation
    if (!trimmedProduct) {
      newErrors.product = "Products / Services is required";
    } else if (trimmedProduct.length < 10) {
      newErrors.product =
        "Products / Services must contain at least 10 characters";
    } else if (trimmedProduct.length > 100) {
      newErrors.product =
        "Products / Services cannot exceed 100 characters";
    }

    // Description validation
    const wordsCount = countWords(description);

    if (!trimmedDescription) {
      newErrors.description = "Description is required";
    } else if (wordsCount < 10) {
      newErrors.description =
        `Description must contain at least 10 words (currently ${wordsCount})`;
    } else if (trimmedDescription.length > 500) {
      newErrors.description =
        "Description cannot exceed 500 characters";
    }

    // Check duplicate only after all fields are valid
    if (Object.keys(newErrors).length === 0) {
      const normalizedNewName = trimmedName.toLowerCase();
      const normalizedNewPhone = trimmedPhone.replace(/[^0-9]/g, "");

      const isDuplicate = submissions.some((sub) => {
        const existingName = sub.name.trim().toLowerCase();
        const existingPhone = sub.phone.trim().replace(/[^0-9]/g, "");

        return (
          existingName === normalizedNewName &&
          existingPhone === normalizedNewPhone
        );
      });

      if (isDuplicate) {
        newErrors.general =
          "Name and Phone Number already exist on Enquiry Form Fill";

        newErrors.name = "Name and Phone Number already exist";
        newErrors.phone = "Name and Phone Number already exist";
      }
    }

    setErrors(newErrors);

    // Show only ONE Toastify message per submit click
    if (Object.keys(newErrors).length > 0) {
      const firstError =
        newErrors.general ||
        newErrors.name ||
        newErrors.phone ||
        newErrors.product ||
        newErrors.description;

      toast.error(firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      const timestamp = new Date().toLocaleString();

      const payloadData = {
        id: crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 9),
        name: trimmedName,
        phone: trimmedPhone,
        product: trimmedProduct,
        description: trimmedDescription,
        timestamp,
      };

      const newSubmission = { ...payloadData };
      const updatedSubmissions = [newSubmission, ...submissions];

      saveSubmissions(updatedSubmissions);

      // Connect to WhatsApp
      const whatsappNumber = "919093931042";

      const formattedMessage = `Hello FSwebdeveloper!

I have successfully filled out the Enquiry Form with the following details:

👤 *Name:* ${trimmedName}

📱 *Phone:* ${trimmedPhone}

📦 *Products/ Services:* ${trimmedProduct}

📝 *Description:* ${trimmedDescription}`;

      const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

      toast.success(
        "Enquiry prepared successfully! Opening WhatsApp."
      );

      setIsSuccess(true);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Form
  const handleResetForm = () => {
    setName("");
    setPhone("");
    setProduct("");
    setDescription("");
    setTouched({});
    setErrors({});
    setIsSuccess(false);
  };

  const currentWordCount = countWords(description);

  return (
    <div className="signup-page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="signup-card"
      >
        <div className="signup-card-body">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="signup-header">
                  <h2 className="signup-title">Enquiry Form</h2>

                  <span className="signup-badge">
                    <Lock size={13} className="badge-icon-secure" />
                    WhatsApp Enquiry
                  </span>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="signup-form"
                  noValidate
                >
                  {/* Name Field */}
                  <div className="form-field-group">
                    <div className="form-label-row">
                      <label
                        htmlFor="name"
                        className="form-field-label"
                      >
                        Full Name{" "}
                        <span className="required-star">*</span>
                      </label>

                      <span
                        className={`field-hint-badge ${
                          name.trim().length >= 6 ? "badge-valid" : ""
                        }`}
                      >
                        {name.trim().length}/50 characters
                      </span>
                    </div>

                    <div className="form-field-wrapper">
                      <span className="form-field-icon">
                        <User size={18} />
                      </span>

                      <input
                        id="name"
                        type="text"
                        maxLength={50}
                        value={name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        onBlur={() => handleBlur("name")}
                        placeholder="John Doe (min. 6 characters)"
                        className={`form-field-input ${
                          touched.name && errors.name
                            ? "form-field-input-error"
                            : touched.name && !errors.name && name
                              ? "form-field-input-success"
                              : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="form-field-group">
                    <div className="form-label-row">
                      <label
                        htmlFor="phone"
                        className="form-field-label"
                      >
                        Phone Number (India){" "}
                        <span className="required-star">*</span>
                      </label>

                      <span className="country-flag-tag">
                        🇮🇳 +91
                      </span>
                    </div>

                    <div className="form-field-wrapper">
                      <span className="form-field-icon">
                        <Phone size={18} />
                      </span>

                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        onBlur={() => handleBlur("phone")}
                        placeholder="98765 43210 or +91 9876543210"
                        className={`form-field-input ${
                          touched.phone && errors.phone
                            ? "form-field-input-error"
                            : touched.phone && !errors.phone && phone
                              ? "form-field-input-success"
                              : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Products / Services Field */}
                  <div className="form-field-group">
                    <div className="form-label-row">
                      <label
                        htmlFor="product"
                        className="form-field-label"
                      >
                        Products / Services{" "}
                        <span className="required-star">*</span>
                      </label>

                      <span
                        className={`field-hint-badge ${
                          product.trim().length >= 10 ? "badge-valid" : ""
                        }`}
                      >
                        {product.trim().length}/100 characters
                      </span>
                    </div>

                    <div className="form-field-wrapper">
                      <span className="form-field-icon">
                        <Package size={18} />
                      </span>

                      <input
                        id="product"
                        type="text"
                        maxLength={100}
                        value={product}
                        onChange={(e) =>
                          handleInputChange("product", e.target.value)
                        }
                        onBlur={() => handleBlur("product")}
                        placeholder="e.g. Hearing AIDS, Apply Online, Web Design..."
                        className={`form-field-input ${
                          touched.product && errors.product
                            ? "form-field-input-error"
                            : touched.product && !errors.product && product
                              ? "form-field-input-success"
                              : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="form-field-group">
                    <div className="form-label-row">
                      <label
                        htmlFor="description"
                        className="form-field-label"
                      >
                        Description{" "}
                        <span className="required-star">*</span>
                      </label>

                      <span
                        className={`word-counter-badge ${
                          currentWordCount >= 10
                            ? "word-counter-valid"
                            : ""
                        }`}
                      >
                        {currentWordCount} / 10 words min ·{" "}
                        {description.length}/500 chars
                      </span>
                    </div>

                    <div className="form-field-wrapper">
                      <span className="form-field-icon form-field-icon-textarea">
                        <MessageSquare size={18} />
                      </span>

                      <textarea
                        id="description"
                        value={description}
                        maxLength={500}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        onBlur={() => handleBlur("description")}
                        placeholder="Please write at least 10 words describing your request or enquiry..."
                        rows={4}
                        className={`form-field-input form-field-textarea ${
                          touched.description && errors.description
                            ? "form-field-input-error"
                            : touched.description &&
                                !errors.description &&
                                description
                              ? "form-field-input-success"
                              : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="form-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="spinner-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="spinner-circle-bg"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="spinner-circle-path"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>

                        Preparing WhatsApp...
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Submit Enquiry
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="success-card"
              >
                <div className="success-icon-container">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="success-icon-badge"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                </div>

                <h3 className="success-title">
                  Enquiry Prepared Successfully!
                </h3>

                <p className="success-description">
                  Thank you,{" "}
                  <span className="success-name-highlight">{name}</span>! Your
                  enquiry details are ready to send through WhatsApp.
                </p>

                <div className="success-info-box">
                  <p className="success-info-header">
                    Registered Information
                  </p>

                  <div className="success-info-row">
                    <span className="success-info-label">Name:</span>
                    <span className="success-info-value">{name}</span>
                  </div>

                  <div className="success-info-row">
                    <span className="success-info-label">Phone:</span>
                    <span className="success-info-value">{phone}</span>
                  </div>

                  <div className="success-info-row">
                    <span className="success-info-label">
                      Products/ Services:
                    </span>
                    <span className="success-info-value">{product}</span>
                  </div>

                  <div className="success-info-row success-info-row-column">
                    <span className="success-info-label">Description:</span>
                    <span className="success-info-value success-info-value-block">
                      {description}
                    </span>
                  </div>
                </div>

                <div className="success-actions">
                  <a
                    href={`https://wa.me/919093931042?text=${encodeURIComponent(
                      `Hello FSwebdeveloper!

I have successfully filled out the Enquiry Form with the following details:

👤 *Name:* ${name.trim()}

📱 *Phone:* ${phone.trim()}

📦 *Products/ Services:* ${product.trim()}

📝 *Description:* ${description.trim()}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="success-reset-btn success-whatsapp-btn"
                  >
                    <MessageSquare size={16} />
                    Open WhatsApp
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="success-reset-btn"
                  >
                    Register Another User
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
