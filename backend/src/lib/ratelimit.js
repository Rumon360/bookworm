import rateLimit from "express-rate-limit";

const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests to /auth, please try again later.",
  headers: true,
});

const bookRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests to /book, please try again later.",
  headers: true,
});

export { authRateLimiter, bookRateLimiter, globalRateLimiter };
