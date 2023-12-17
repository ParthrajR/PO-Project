const mongoose = require('mongoose');

const shipViaSchema = new mongoose.Schema(
  {
    shipVia: {
      type: String,
      required: true,
    },
    deliveryAt: {
      type: String,
      required: true,
    },
    shippingTerms: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: String,
      required: true,
    },
    purchaseOrderNo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const shipVia = mongoose.model('shipVia', shipViaSchema);

module.exports = shipVia;
