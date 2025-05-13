import Book from "../../models/Book.js";

export const getPosts = async (req, res) => {
  try {
    const page = res.query.page || 1;
    const limit = res.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const total = await Book.countDocuments();

    return res.status(200).json({
      data: {
        books: books,
        currentPage: page,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("ERROR FETCHING POSTS", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
