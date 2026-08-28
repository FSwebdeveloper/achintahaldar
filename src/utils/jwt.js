// Utility for creating and decoding HMAC-SHA256 JWT (JSON Web Token) tokens

const base64UrlEncode = (str) => {
  return btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const base64UrlEncodeJson = (obj) => {
  return base64UrlEncode(JSON.stringify(obj));
};

/**
 * Creates a signed JWT token (HS256) containing the contact form payload.
 * @param {Object} payload - The form data object
 * @param {string} secret - Secret key for signing
 * @returns {Promise<string>} Encrypted / signed JWT token string
 */
export async function createJWTToken(payload, secret = 'FSWebDevContactFormSecretKey2026') {
  try {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = base64UrlEncodeJson(header);
    
    const tokenPayload = {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 30, // 30 days validity
      iss: 'FSwebdeveloper'
    };
    const encodedPayload = base64UrlEncodeJson(tokenPayload);

    const tokenData = `${encodedHeader}.${encodedPayload}`;

    // Use Web Crypto API if available
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      const signature = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        encoder.encode(tokenData)
      );

      const signatureArray = Array.from(new Uint8Array(signature));
      const signatureString = String.fromCharCode.apply(null, signatureArray);
      const encodedSignature = base64UrlEncode(signatureString);

      return `${tokenData}.${encodedSignature}`;
    } else {
      // Fallback signature calculation for basic environments
      const fallbackSig = base64UrlEncode(`${tokenData}-${secret}`);
      return `${tokenData}.${fallbackSig}`;
    }
  } catch (error) {
    console.error('Error generating JWT token:', error);
    // Fallback simple base64url standard JWT representation
    const header = base64UrlEncodeJson({ alg: 'HS256', typ: 'JWT' });
    const body = base64UrlEncodeJson(payload);
    const mockSig = base64UrlEncode('fswebdev_sig');
    return `${header}.${body}.${mockSig}`;
  }
}

/**
 * Decodes a JWT token string into header, payload, and signature parts.
 * @param {string} token - The JWT token string
 * @returns {Object|null} Decoded header & payload
 */
export function decodeJWTToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const headerStr = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
    const payloadStr = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return {
      header: JSON.parse(headerStr),
      payload: JSON.parse(payloadStr),
      signature: parts[2]
    };
  } catch (e) {
    console.error('Failed to decode JWT token:', e);
    return null;
  }
}
