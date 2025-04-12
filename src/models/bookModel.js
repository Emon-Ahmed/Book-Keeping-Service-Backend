import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const bookModel = mongoose.models.books || mongoose.model("Books", bookSchema);

export default bookModel;
