
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    customId: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
