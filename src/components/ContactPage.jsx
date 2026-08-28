import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, CheckCircle, ArrowRight, ShieldCheck, MessageSquare, Package, Lock, Key, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { createJWTToken, decodeJWTToken } from '../utils/jwt';

export const ContactPage = () => {
  const location = useLocation();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');

  // UI & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // JWT Token States
  const [jwtToken, setJwtToken] = useState('');
  const [showDecodedJwt, setShowDecodedJwt] = useState(false);
  const [copiedJwt, setCopiedJwt] = useState(false);

  // Submissions state for local storage persistence
  const [submissions, setSubmissions] = useState([]);

  // Load submissions on mount and handle query params
  useEffect(() => {
    const saved = localStorage.getItem('contact_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved submissions', e);
      }
    }

    const params = new URLSearchParams(location.search);
    const productParam = params.get('product');
    if (productParam) {
      setProduct(productParam);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.product;
        return next;
      });
    }

    const type = params.get('type');
    if (type === 'current') {
      setDescription('Application for: Current Apply\n');
    } else if (type === 'passport') {
      setDescription('Application for: Passport Apply\n');
    } else if (type === 'fresh-passport') {
      setDescription('Application for: Fresh Passport Apply\n');
    } else if (type === 'reissue-passport') {
      setDescription('Application for: Reissue Passport Apply\n');
    }
  }, [location.search]);

  // Save submissions to local storage
  const saveSubmissions = (newSubmissions) => {
    setSubmissions(newSubmissions);
    localStorage.setItem('contact_submissions', JSON.stringify(newSubmissions));
  };

  // Helper to count words in description
  const countWords = (text) => {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Validate fields in real-time
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    // 1. Name validation: 6 letters and above
    if (fieldName === 'name') {
      if (!value.trim()) {
        newErrors.name = 'Full Name is required';
      } else if (value.trim().length < 6) {
        newErrors.name = 'Name must be at least 6 letters (6 characters or more)';
      } else {
        delete newErrors.name;
      }
    }

    // 2. Phone validation: Indian country phone format
    if (fieldName === 'phone') {
      if (!value.trim()) {
        newErrors.phone = 'Phone number is required';
      } else {
        const cleanNum = value.trim().replace(/[\s\-\(\)]/g, '');
        const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
        if (!indianPhoneRegex.test(cleanNum)) {
          newErrors.phone = 'Please enter a valid 10-digit Indian phone number (e.g. 9876543210 or +91 9876543210)';
        } else {
          delete newErrors.phone;
        }
      }
    }

    // 3. Product validation
    if (fieldName === 'product') {
      if (!value.trim()) {
        newErrors.product = 'Products/ Services is required';
      } else {
        delete newErrors.product;
      }
    }

    // 4. Description validation: minimum 10 words
    if (fieldName === 'description') {
      const wordsCount = countWords(value);
      if (!value.trim()) {
        newErrors.description = 'Description is required';
      } else if (wordsCount < 10) {
        newErrors.description = `Description must be at least 10 words (currently ${wordsCount} word${wordsCount === 1 ? '' : 's'})`;
      } else {
        delete newErrors.description;
      }
    }

    setErrors(newErrors);
  };

  // Handle inputs
  const handleInputChange = (field, value) => {
    if (field === 'name') setName(value);
    if (field === 'phone') setPhone(value);
    if (field === 'product') setProduct(value);
    if (field === 'description') setDescription(value);

    // Clear duplicate errors if name or phone is edited
    if (errors.general && (field === 'name' || field === 'phone')) {
      const updatedErrors = { ...errors };
      delete updatedErrors.general;
      if (updatedErrors.name === 'Name and Phone Number already exist') {
        delete updatedErrors.name;
      }
      if (updatedErrors.phone === 'Name and Phone Number already exist') {
        delete updatedErrors.phone;
      }
      setErrors(updatedErrors);
    }

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    const val = field === 'name' ? name : field === 'phone' ? phone : field === 'product' ? product : description;
    validateField(field, val);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields
    const allTouched = { name: true, phone: true, product: true, description: true };
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Full Name is required';
    } else if (name.trim().length < 6) {
      newErrors.name = 'Name must be at least 6 letters (6 characters or more)';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanNum = phone.trim().replace(/[\s\-\(\)]/g, '');
      const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(cleanNum)) {
        newErrors.phone = 'Please enter a valid 10-digit Indian phone number (e.g. 9876543210 or +91 9876543210)';
      }
    }

    if (!product.trim()) {
      newErrors.product = 'Products/ Services is required';
    }

    const wordsCount = countWords(description);
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (wordsCount < 10) {
      newErrors.description = `Description must be at least 10 words (currently ${wordsCount} word${wordsCount === 1 ? '' : 's'})`;
    }

    // Check for duplicate Name and Phone Number in submissions
    if (Object.keys(newErrors).length === 0) {
      const normalizedNewName = name.trim().toLowerCase();
      const normalizedNewPhone = phone.trim().replace(/[^0-9]/g, '');

      const isDuplicate = submissions.some((sub) => {
        const existingName = sub.name.trim().toLowerCase();
        const existingPhone = sub.phone.trim().replace(/[^0-9]/g, '');
        return existingName === normalizedNewName && existingPhone === normalizedNewPhone;
      });

      if (isDuplicate) {
        newErrors.general = 'Name and Phone Number already exist on Enquiry Form Fill';
        newErrors.name = 'Name and Phone Number already exist';
        newErrors.phone = 'Name and Phone Number already exist';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Set Submitting
    setIsSubmitting(true);

    try {
      const timestamp = new Date().toLocaleString();
      const payloadData = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        phone: phone.trim(),
        product: product.trim(),
        description: description.trim(),
        timestamp
      };

      // 4. Encrypt form data using JWT token
      const token = await createJWTToken(payloadData);
      setJwtToken(token);

      const newSubmission = {
        ...payloadData,
        token
      };

      const updatedSubmissions = [newSubmission, ...submissions];
      saveSubmissions(updatedSubmissions);

      setIsSubmitting(false);
      setIsSuccess(true);

      // Connect to WhatsApp on successful form submission
      const whatsappNumber = '919093931042';
      const formattedMessage = `Hello FSwebdeveloper!\n\nI have successfully filled out the Enquiry Form with the following details:\n\n👤 *Name:* ${name.trim()}\n📱 *Phone:* ${phone.trim()}\n📦 *Products/ Services:* ${product.trim()}\n📝 *Description:* ${description.trim()}\n\n🔐 *JWT Token Encrypted:* ${token.substring(0, 24)}...`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
      
      try {
        window.open(whatsappUrl, '_blank');
      } catch (err) {
        console.error('Failed to open WhatsApp automatically', err);
      }
    } catch (err) {
      console.error('Error encrypting and submitting form data:', err);
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setProduct('');
    setDescription('');
    setJwtToken('');
    setShowDecodedJwt(false);
    setCopiedJwt(false);
    setTouched({});
    setErrors({});
    setIsSuccess(false);
  };

  const handleCopyJwt = () => {
    if (!jwtToken) return;
    navigator.clipboard.writeText(jwtToken);
    setCopiedJwt(true);
    setTimeout(() => setCopiedJwt(false), 2000);
  };

  const currentWordCount = countWords(description);
  const decodedJwtObj = jwtToken ? decodeJWTToken(jwtToken) : null;

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
                    <Lock size={13} className="badge-icon-secure" /> Encrypted & Private
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="signup-form" noValidate>
                  {/* Name Field - Validation 6 letters and above */}
                  <div className="form-field-group">
                    <div className="form-label-row">
                      <label htmlFor="name" className="form-field-label">
                        Full Name <span className="required-star">*</span>
                      </label>
                      <span className={`field-hint-badge ${name.trim().length >= 6 ? 'badge-valid' : ''}`}>
                        {name.trim().length}/6+ letters
                      </span>
                    </div>
                    <div className="form-field-wrapper">
                      <span className="form-field-icon">
                        <User size={18} />
                      </span>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="John Doe (min. 6 characters)"
                        className={`form-field-input ${
                          touched.name && errors.name
                            ? 'form-field-input-error'
                            : touched.name && !errors.name && name
                            ? 'form-field-input-success'
                            : ''
                        }`}
                      />
                    </div>
                    {touched.name && errors.name ? (
                      <p className="form-field-error-message">
                        {errors.name}
                      </p>
                    ) : (
                      <p className="field-subtext-info">Must be at least 6 letters long.</p>
                    )}
                  </div>

                  {/* Phone Number Field - Validate with Indian country format */}
                  <div className="form-field-group">
                    <div className="form-label-row">
                      <label htmlFor="phone" className="form-field-label">
                        Phone Number (India) <span className="required-star">*</span>
                      </label>
                      <span className="country-flag-tag">🇮🇳 +91</span>
                    </div>
                    <div className="form-field-wrapper">
                      <span className="form-field-icon">
                        <Phone size={18} />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="98765 43210 or +91 9876543210"
                        className={`form-field-input ${
                          touched.phone && errors.phone
                            ? 'form-field-input-error'
                            : touched.phone && !errors.phone && phone
                            ? 'form-field-input-success'
                            : ''
                        }`}
                      />
                    </div>
                    {touched.phone && errors.phone ? (
                      <p className="form-field-error-message">
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="field-subtext-info">Must be a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.</p>
                    )}
                  </div>

                  {/* Products/ Services Field */}
                  <div className="form-field-group">
                    <label htmlFor="product" className="form-field-label">
                      Products / Services <span className="required-star">*</span>
                    </label>
                    <div className="form-field-wrapper">
                      <span className="form-field-icon">
                        <Package size={18} />
                      </span>
                      <input
                        id="product"
                        type="text"
                        value={product}
                        onChange={(e) => handleInputChange('product', e.target.value)}
                        onBlur={() => handleBlur('product')}
                        placeholder="e.g. Hearing AIDS, Apply Online, Web Design..."
                        className={`form-field-input ${
                          touched.product && errors.product
                            ? 'form-field-input-error'
                            : touched.product && !errors.product && product
                            ? 'form-field-input-success'
                            : ''
                        }`}
                      />
                    </div>
                    {touched.product && errors.product && (
                      <p className="form-field-error-message">
                        {errors.product}
                      </p>
                    )}
                  </div>

                  {/* Description Field - Validation minimum 10 words */}
                  <div className="form-field-group">
                    <div className="form-label-row">
                      <label htmlFor="description" className="form-field-label">
                        Description <span className="required-star">*</span>
                      </label>
                      <span className={`word-counter-badge ${currentWordCount >= 10 ? 'word-counter-valid' : ''}`}>
                        {currentWordCount} / 10 words min
                      </span>
                    </div>
                    <div className="form-field-wrapper">
                      <span className="form-field-icon form-field-icon-textarea">
                        <MessageSquare size={18} />
                      </span>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        onBlur={() => handleBlur('description')}
                        placeholder="Please write at least 10 words describing your request or enquiry..."
                        rows={4}
                        className={`form-field-input form-field-textarea ${
                          touched.description && errors.description
                            ? 'form-field-input-error'
                            : touched.description && !errors.description && description
                            ? 'form-field-input-success'
                            : ''
                        }`}
                      />
                    </div>
                    {touched.description && errors.description ? (
                      <p className="form-field-error-message">
                        {errors.description}
                      </p>
                    ) : (
                      <p className="field-subtext-info">Write a minimum of 10 words to provide clear enquiry details.</p>
                    )}
                  </div>

                  {errors.general && (
                    <div className="duplicate-alert-container" id="signup-duplicate-alert">
                      <span className="duplicate-alert-dot"></span>
                      <div className="duplicate-alert-text">{errors.general}</div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="form-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="spinner-icon" fill="none" viewBox="0 0 24 24">
                          <circle className="spinner-circle-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="spinner-circle-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Encrypting & Submitting...
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Submit & Encrypt Form
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
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="success-icon-badge"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                </div>

                <h3 className="success-title">Enquiry Submitted & Encrypted!</h3>
                <p className="success-description">
                  Thank you, <span className="success-name-highlight">{name}</span>! Your contact information has been validated and encrypted with a JWT token signature.
                </p>

                {/* JWT Token Card */}
                {jwtToken && (
                  <div className="jwt-security-card">
                    <div className="jwt-card-header">
                      <div className="jwt-badge-title">
                        <Key size={16} className="jwt-key-icon" />
                        <span>JWT Encrypted Token (HS256)</span>
                      </div>
                      <button
                        onClick={handleCopyJwt}
                        className="jwt-copy-btn"
                        title="Copy JWT Token"
                      >
                        {copiedJwt ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span>{copiedJwt ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="jwt-token-display">
                      <code>{jwtToken}</code>
                    </div>

                    <div className="jwt-toggle-row">
                      <button
                        onClick={() => setShowDecodedJwt(!showDecodedJwt)}
                        className="jwt-toggle-payload-btn"
                      >
                        {showDecodedJwt ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span>{showDecodedJwt ? 'Hide Decrypted Payload' : 'View Decrypted Payload'}</span>
                      </button>
                    </div>

                    <AnimatePresence>
                      {showDecodedJwt && decodedJwtObj && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="jwt-decoded-container"
                        >
                          <p className="jwt-decoded-label">Decoded JWT Payload Data:</p>
                          <pre className="jwt-decoded-pre">
                            {JSON.stringify(decodedJwtObj.payload, null, 2)}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div className="success-info-box">
                  <p className="success-info-header">Registered Information</p>
                  <div className="success-info-row">
                    <span className="success-info-label">Name:</span>
                    <span className="success-info-value">{name}</span>
                  </div>
                  <div className="success-info-row">
                    <span className="success-info-label">Phone:</span>
                    <span className="success-info-value">{phone}</span>
                  </div>
                  <div className="success-info-row">
                    <span className="success-info-label">Products/ Services:</span>
                    <span className="success-info-value">{product}</span>
                  </div>
                  <div className="success-info-row success-info-row-column">
                    <span className="success-info-label">Description:</span>
                    <span className="success-info-value success-info-value-block">{description}</span>
                  </div>
                </div>

                <div className="success-actions">
                  <a
                    href={`https://wa.me/919093931042?text=${encodeURIComponent(
                      `Hello FSwebdeveloper!\n\nI have successfully filled out the Enquiry Form with the following details:\n\n👤 *Name:* ${name.trim()}\n📱 *Phone:* ${phone.trim()}\n📦 *Products/ Services:* ${product.trim()}\n📝 *Description:* ${description.trim()}\n\n🔐 *JWT Token:* ${jwtToken}`
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

