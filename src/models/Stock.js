const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unitName: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  shelfLife: { type: Number, required: true } // in days
});

module.exports = mongoose.model('Stock', stockSchema);