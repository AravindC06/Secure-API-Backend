# Secure Node.js Backend with JWT Authentication

This project is a robust and secure backend application built with **Node.js**, implementing **JWT-based authentication** and advanced security practices. It is designed with scalability and performance in mind, leveraging modern middleware for logging, rate limiting, and protection against common vulnerabilities like XSS and NoSQL injection.

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
