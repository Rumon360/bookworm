import express from "express";
import { createPost } from "../controllers/books/create.js";
import protectRoute from "../middleware/auth.middleware.js";
import { getPosts } from "../controllers/books/fetch.js";
import { deletePost } from "../controllers/books/delete.js";
import { recommendationPosts } from "../controllers/books/recommendation.js";
import { bookRateLimiter } from "../lib/ratelimit.js";

const router = express.Router();

router.post("/", protectRoute, bookRateLimiter, createPost);
router.get("/", protectRoute, bookRateLimiter, getPosts);
router.delete("/:id", protectRoute, bookRateLimiter, deletePost);
router.delete("/user", protectRoute, bookRateLimiter, recommendationPosts);

export default router;
