import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    borrowDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
    borrowCharge: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.models.books || mongoose.model("Books", bookSchema);

export default bookModel;
