import Library from "../models/libraryModel.js";
import Book from "../models/bookModel.js";

// Get all libraries
export const getAllLibraries = async (req, res, next) => {
  try {
    const libraries = await Library.find();
    res.json({
      success: true,
      data: libraries,
      message: "Libraries retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get single library
export const getLibrary = async (req, res, next) => {
  try {
    const library = await Library.findById(req.params.id).populate({
      path: "books",
      populate: [
        { path: "borrower", select: "name email" },
        { path: "author", select: "name" },
        { path: "library", select: "name" },
      ],
    });
    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }

    res.json({
      success: true,
      data: library,
      message: "Library retrieved successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Create library
export const createLibrary = async (req, res) => {
  const { name } = req.body;

  try {
    const library = new Library({
      name,
    });

    await library.save();

    res.status(201).json({
      success: true,
      data: library,
      message: "Library created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update library
export const updateLibrary = async (req, res, next) => {
  const { name } = req.body;

  try {
    const library = await Library.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }

    res.json({
      success: true,
      data: library,
      message: "Library updated successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete library
export const deleteLibrary = async (req, res, next) => {
  try {
    const library = await Library.findByIdAndDelete(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }

    await Book.deleteMany({ library: req.params.id });

    res.json({
      success: true,
      data: {},
      message: "Library deleted successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get library inventory
export const getLibraryInventory = async (req, res, next) => {
  try {
    const books = await Book.find({ library: req.params.id })
      .populate("library", "name")
      .populate("borrower", "name email")
      .populate("author", "name email");
    res.json({
      success: true,
      count: books.length,
      data: books,
      message: "Library inventory retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Add book to library inventory
export const addBookToInventory = async (req, res, next) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { library: req.params.id },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const library = await Library.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { books: bookId } },
      { new: true }
    );
    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }
    res.json({
      success: true,
      data: {
        addedBook: {
          name: book.name,
        },
        library: {
          name: library.name,
          books: library.books,
        },
      },
      message: "Book added to library inventory successfully",
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

// Remove book from library inventory
export const removeBookFromInventory = async (req, res, next) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.bookId, library: req.params.id },
      { library: null },
      { new: true }
    );
    await Library.findByIdAndUpdate(req.params.id, {
      $pull: { books: req.params.bookId },
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found in this library",
      });
    }

    res.json({
      success: true,
      data: book,
      message: "Book removed from library inventory successfully",
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
