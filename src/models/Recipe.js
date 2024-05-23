const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

const recipeSchema = new Schema({
  dishName: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [ingredientSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);