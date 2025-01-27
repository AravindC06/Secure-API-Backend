# Secure Node.js Backend with JWT Authentication for Custom Stitching E-Commerce Platform

This project is a secure backend application built with **Node.js** to support an **e-commerce platform for online custom stitching**. The application features **JWT-based authentication** and advanced security practices. It includes user authentication, secure session management, and robust protection against common vulnerabilities like XSS and NoSQL injection.

---

## 🛍️ Project Overview

This platform enables users to explore custom stitching services online, allowing them to place orders, manage profiles, and securely interact with the system. The backend focuses on delivering high performance, security, and scalability to ensure a seamless user experience.

---

## 🚀 Features

- **JWT Authentication**: Secure token-based authentication using public/private PEM keys (RS256).
- **Logging**: Detailed request logging with Morgan and a custom logger utility.
- **Rate Limiting**: Prevents excessive API requests with a configurable rate limiter.
- **Security Enhancements**:
  - CORS with custom configuration.
  - Helmet for secure HTTP headers.
  - Protection against XSS attacks with `xss-clean`.
  - Prevention of NoSQL injection attacks with `express-mongo-sanitize`.
- **Performance**: Optimized API interactions with response compression.
- **Validation**: Ensures secure and valid user input with `express-validator`.
- **Extensibility**: Modular folder structure for scalability and easy maintenance.
- **Session Management**: Refresh token mechanism for seamless session handling.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JWT with RS256 Algorithm
- **Security**: Helmet, CORS, xss-clean, express-mongo-sanitize
- **Validation**: express-validator
- **Logging**: Morgan with custom formats
- **Performance**: Compression, Rate Limiting
- **Environment Configurations**: dotenv

---

## Security Features

### Cross-Site Scripting (XSS)
- **Handled by**: `xss-clean`, `helmet`, input validation (`express-validator`).
- **Protection**: Sanitizes user inputs to prevent malicious scripts from being executed in the client’s browser.

### NoSQL Injection and MongoDB Query Injection
- **Handled by**: `express-mongo-sanitize`.
- **Protection**: Removes `$` and `.` operators from inputs to prevent malicious queries.

### Cross-Origin Resource Sharing (CORS) Misconfiguration
- **Handled by**: `cors` with `corsOptions`.
- **Protection**: Restricts allowed origins, methods, and headers to prevent unauthorized cross-origin requests.

### Content Security Policy (CSP)
- **Handled by**: `helmet`.
- **Protection**: Prevents unauthorized scripts, images, or other resources from being loaded into the application.

### Clickjacking
- **Handled by**: `helmet`.
- **Protection**: Adds `X-Frame-Options` headers to prevent the application from being embedded in iframes.

### Data Breach via Cookie Hijacking
- **Handled by**: `cookie-parser`, secure cookie configurations (`httpOnly`, `secure`, `sameSite`).
- **Protection**: Protects cookies from being accessed or manipulated by client-side scripts or in unsafe environments.

### Brute Force Attacks on Authentication
- **Handled by**: Rate limiting (`loginLimiter`, `registerLimiter`).
- **Protection**: Limits login/register attempts from a single IP within a time window.

### Denial of Service (DoS)
- **Handled by**: `compression`, rate limiting.
- **Protection**: Reduces response payload size and limits request rates to mitigate resource exhaustion.

### Unsecured HTTP Headers
- **Handled by**: `helmet`.
- **Protection**: Adds secure headers like `Strict-Transport-Security`, `X-Content-Type-Options`, etc., to protect against header-based vulnerabilities.

### Broken Authentication
- **Handled by**: JWT-based authentication and refresh token mechanisms with secure algorithms (e.g., `RS256`).
- **Protection**: Ensures token validity using private/public key pairs to avoid tampering.

### Man-in-the-Middle Attacks (MITM)
- **Handled by**: Secure HTTPS configuration.
- **Protection**: Ensures sensitive data is transmitted securely over HTTPS.

### Input Validation and Sanitization
- **Handled by**: `express-validator`.
- **Protection**: Ensures user inputs conform to expected formats, reducing risks of malformed or malicious inputs.

### Excessive Data Exposure
- **Handled by**: Explicit field selection in database queries (e.g., `user.findById(...).select(...)`).
- **Protection**: Limits unnecessary exposure of sensitive data in API responses.

### Replay Attacks
- **Handled by**: Token expiration and rotation mechanisms (access and refresh tokens).
- **Protection**: Prevents old or duplicate tokens from being reused.

## Needs to be completed

### Cross-Site Request Forgery (CSRF)
- **Protection**: When enabled, ensures requests originate from trusted sources with valid CSRF tokens.

---

## 📄 Code Overview

## 📄 Current Progress

### Completed:
- **User Authentication**:
  - Secure user registration and login with hashed passwords (bcrypt).
  - Token-based authentication using access and refresh tokens.
- **Session Management**:
  - Cookies for secure session handling.
  - Refresh token mechanism for seamless session continuation.
- **Security**:
  - Implemented Helmet for HTTP header protection.
  - Configured CORS policies for cross-origin resource sharing.
  - Sanitized inputs using `xss-clean` and `express-mongo-sanitize`.
  - Rate limiting to prevent brute-force attacks.
- **Performance Enhancements**:
  - Added response compression for optimized data transfer.
- **Validation**:
  - Validated inputs using `express-validator` to prevent malformed or malicious data.
- **Modular Codebase**:
  - Implemented a scalable and reusable folder structure.

### Pending:
- **Order Management System**:
  - Create APIs for placing and managing custom stitching orders.
  - Add CRUD operations for orders in the database.
- **Product Catalog**:
  - Develop APIs for listing available stitching services with details.
- **User Profile Management**:
  - Add APIs to manage user profiles and preferences.
- **Admin Panel**:
  - Implement admin-specific features for order and user management.
- **Testing**:
  - Perform integration and unit testing for existing and upcoming features.

---

### Core Dependencies and Middleware

- **Express.js**: Lightweight and powerful web framework for Node.js.
- **dotenv**: Manages environment variables securely.
- **cors**: Configures Cross-Origin Resource Sharing.
- **helmet**: Sets secure HTTP headers to prevent attacks.
- **xss-clean**: Sanitizes user inputs to prevent XSS attacks.
- **express-mongo-sanitize**: Protects against NoSQL injection.
- **cookie-parser**: Parses cookies in HTTP requests.
- **morgan**: Logs HTTP requests for debugging and monitoring.
- **compression**: Compresses HTTP responses for improved performance.
- **rate-limiter-flexible**: Implements configurable API request limits.

---

## 🛡️ Security Features

1. **CORS**: Restricts API access based on allowed origins, enhancing security.
2. **Helmet**: Adds secure HTTP headers to mitigate common vulnerabilities.
3. **xss-clean**: Sanitizes input data to prevent XSS attacks.
4. **express-mongo-sanitize**: Protects the database from injection attacks.
5. **Rate Limiting**: Limits repeated requests to prevent brute-force attacks.

---

## ⚡ Performance Optimizations

- **Response Compression**: Reduces payload size for faster API interactions.
- **Efficient Logging**: Logs API usage with Morgan for better debugging.
- **Modular Design**: Simplifies codebase scaling and maintenance.

---

## 🔒 Security Best Practices

- **Input Validation**: Validates all user inputs with `express-validator`.
- **Error Handling**: Uses centralized middleware for consistent error responses.
- **Token Management**: Utilizes short-lived access tokens and refresh tokens.
- **Environment Variables**: Stores sensitive information securely in `.env` files.
- **Database Security**: Protects against SQL/NoSQL injection with sanitization.

---

## 🚀 Future Improvements

- **Third-Party Integrations**: Add OAuth login options (e.g., Google, Facebook).
- **Enhanced Admin Features**: Real-time order tracking and analytics.
