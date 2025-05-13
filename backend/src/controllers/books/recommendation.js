import Book from "../../models/Book.js";

export const recommendationPosts = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      data: {
        books: books,
      },
    });
  } catch (error) {
    console.error("ERROR FETCHING RECOMMENDATION POSTS", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
