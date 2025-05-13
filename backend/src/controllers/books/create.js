import cloudinary from "../../lib/cloudinary.js";
import Book from "../../models/Book.js";

export const createPost = async (req, res) => {
  try {
    const { title, caption, image, rating } = req.body;

    if (!title || !caption || !image || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const upload = await cloudinary.uploader.upload(image);
    const imageUrl = upload.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating: parsedRating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save();

    return res.status(201).json({
      data: newBook,
    });
  } catch (error) {
    console.error("ERROR CREATING POST", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
