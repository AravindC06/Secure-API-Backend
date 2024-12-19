# Secure Node.js Backend with JWT Authentication

This project is a secure backend application built with **Node.js**, implementing **JWT-based authentication** and advanced security practices. It uses middleware for logging, rate limiting, and protection against vulnerabilities like XSS and NoSQL injection.

---

## 🚀 Features

- **JWT Authentication**: Secure token-based authentication.
- **Logging**: Custom logging with Morgan and a dedicated logger utility.
- **Rate Limiting**: Prevents excessive API requests using a rate limiter.
- **Security Enhancements**:
  - CORS with custom configuration.
  - Helmet for secure HTTP headers.
  - Protection against XSS attacks with `xss-clean`.
  - Prevention of NoSQL injection attacks with `express-mongo-sanitize`.
- **Performance**: Response compression for faster API interactions.
- **Modular Structure**: Well-organized code with reusable components and configuration files.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JWT with public/private PEM keys (RS256)
- **Security**: Helmet, CORS, xss-clean, express-mongo-sanitize
- **Logging**: Morgan with custom formats
- **Performance**: Compression, rate limiting
- **Environment Configurations**: dotenv

---

## 📄 Code Overview
Core Dependencies and Middleware:
- **Express.js**: Web framework for Node.js.
- **dotenv**: Manages environment variables securely.
- **cors**: Enables Cross-Origin Resource Sharing with custom configurations.
- **helmet**: Protects against common security vulnerabilities by setting HTTP headers.
- **xss-clean**: Sanitizes user input to prevent XSS attacks.
- **express-mongo-sanitize**: Prevents NoSQL injection by filtering input.
- **cookie-parser**: Parses cookies in HTTP requests.
- **morgan**: Logs HTTP requests with custom formats.
- **compression**: Compresses responses for better performance.
- **Rate Limiter**: Limits incoming requests to prevent abuse.

## 🛡️ Security Features
- **CORS**: Restricts API access based on custom configurations.
- **Helmet**: Sets secure HTTP headers to prevent attacks.
- **xss-clean**: Cleans user input to prevent cross-site scripting.
- **express-mongo-sanitize**: Protects against NoSQL injection.
- **Rate Limiting**: Prevents abuse by limiting repeated requests.
