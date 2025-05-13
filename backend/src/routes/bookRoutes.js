import express from "express";
import { createPost } from "../controllers/books/create.js";
import protectRoute from "../middleware/auth.middleware.js";
import { getPosts } from "../controllers/books/fetch.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.get("/", protectRoute, getPosts);

export default router;
