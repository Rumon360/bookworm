import cloudinary from "../../lib/cloudinary.js";
import Book from "../../models/Book.js";

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "Missing Book Id",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log(`ERROR DELETING CLOUDINARY IMAGE - ${book.image}`, error);
      }
    }

    await book.deleteOne();

    return res.status(204).json({
      message: "Book deleted sucessfully!",
    });
  } catch (error) {
    console.error("ERROR DELETING POST", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
