import bookModel from "../models/bookModel.js";
import { uploadToCloudinary } from "../services/cloudinaryService.js";

// Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel
      .find()
      .populate("library", "name")
      .populate("borrower", "name email")
      .populate("author", "name email");

    res.json({
      success: true,
      data: books,
      message: res.__("Books Fetched"),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: res.__("Server Error"),
    });
  }
};

// Create book
export const createBook = async (req, res) => {
  const { name } = req.body;
  const authorId = req.user.id;
  try {
    let image = "";
    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer);
    }

    const book = new bookModel({
      name,
      imageUrl: image.url,
      author: authorId,
    });

    await book.save();

    res.status(201).json({
      success: true,
      data: book,
      message: res.__("Book Created"),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: res.__("Server Error"),
    });
  }
};

// Get single book
export const getBook = async (req, res) => {
  try {
    const book = await bookModel
      .findById(req.params.id)
      .populate("library", "name")
      .populate("borrower", "name email")
      .populate("author", "name email");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: res.__("Book Not Found"),
      });
    }

    res.json({
      success: true,
      data: book,
      message: res.__("Book retrieved successfully"),
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: res.__("Book Not Found"),
      });
    }
    res.status(500).json({
      success: false,
      message: res.__("Server Error"),
    });
  }
};

// Update book
export const updateBook = async (req, res) => {
  const { name } = req.body;

  try {
    let updateFields = {
      name,
    };

    const book = await bookModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: res.__("Book Not Found"),
      });
    }

    res.json({
      success: true,
      data: book,
      message: res.__("Book updated successfully"),
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: res.__("Book Not Found"),
      });
    }
    res.status(500).json({
      success: false,
      message: res.__("Server Error"),
    });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: res.__("Book Not Found"),
      });
    }

    res.json({
      success: true,
      data: {},
      message: res.__("Book deleted successfully"),
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: res.__("Book Not Found"),
      });
    }
    res.status(500).json({
      success: false,
      message: res.__("Server Error"),
    });
  }
};
