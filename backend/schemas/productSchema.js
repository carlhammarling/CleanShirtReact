const mongoose = require("mongoose");
const Comment = require("./commentSchema");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imgURL: { type: String, required: true },
    //Kolla den här, är det såhär vi vill göra? referera till en string eller vill vi referera till ett id?
    category: { type: [String] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
