const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    sousCategorie:{ type: String, required: true },
    composition: { type: Array },
    price: { type: Number, required: true },
    nombrePieces:{type:Number,required:true},
    inStock: { type: Boolean, default: true },
    creationDate:{type: Date, default: Date.now},
    lastModificationDate:{type: Date, default: Date.now},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
