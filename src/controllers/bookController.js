import bookModel from "../models/bookModel.js";

// Get all books
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookModel.find();
    //   .populate("author", "name email")
    //   .populate("library", "name location")
    //   .populate("borrower", "name email");

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
export const createBook = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    // let imageUrl = '';
    // if (req.file) {
    //   imageUrl = await uploadImage(req.file);
    // }

    const book = new bookModel({
      title,
      description,
      //   author,
      //   library,
      //   imageUrl
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
