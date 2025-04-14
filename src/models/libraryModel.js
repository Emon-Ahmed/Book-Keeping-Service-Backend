import mongoose from "mongoose";

const LibrarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const libraryModel = mongoose.model("Library", LibrarySchema);
export default libraryModel;
