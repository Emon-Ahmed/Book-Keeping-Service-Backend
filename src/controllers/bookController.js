import bookModel from "../models/bookModel.js";

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
      message: "Books Fetch Done",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Try Again",
    });
  }
};

// Create book
export const createBook = async (req, res) => {
  const { name } = req.body;
  const authorId = req.user.id;
  try {
    const book = new bookModel({
      name,
      author: authorId,
    });

    await book.save();

    res.status(201).json({
      success: true,
      data: book,
      message: "Book Created Done",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Try Again",
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
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      data: book,
      message: "Book retrieved successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
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
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      data: book,
      message: "Book updated successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
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
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      data: {},
      message: "Book deleted successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
