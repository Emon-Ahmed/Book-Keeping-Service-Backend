import Book from "../models/bookModel.js";

// Borrow a book
export const borrowBook = async (req, res, next) => {
  const { bookId, charge } = req.body;
  const borrowerId = req.user.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Book is not available for borrowing",
      });
    }

    book.borrower = borrowerId;
    book.borrowDate = new Date();
    book.borrowCharge = charge || 0;
    book.status = "borrowed";

    await book.save();

    res.json({
      success: true,
      data: book,
      message: "Book borrowed successfully",
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

// Return a book
export const returnBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found by Id",
      });
    }

    if (book.status !== "borrowed") {
      return res.status(400).json({
        success: false,
        message: "Book is not currently borrowed",
      });
    }

    book.borrower = undefined;
    book.borrowCharge = 0;
    book.borrowDate = undefined;
    book.returnDate = new Date();
    book.status = "available";

    await book.save();

    res.json({
      success: true,
      data: book,
      message: "Book returned successfully",
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
