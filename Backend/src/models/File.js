const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "File name is required"],
    },
    url: {
      type: String,
      required: [true, "File URL is required"],
    },
    type: {
      type: String,
      required: [true, "File type is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const fileModel = mongoose.model("File", fileSchema);

module.exports = fileModel;
