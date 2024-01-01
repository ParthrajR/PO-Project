const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    expectedDate: {
      type: String,
      required: true,
    },
    qty: {
      type: String,
      required: true,
    },
    uom: {
      type: String,
      required: true,
    },
    netRate: {  
        type: String,
        required: true,
    },
    receivedMaterial: {  
      type: String,
      required: false,
    },
    receivedDate: {  
      type: String,
      required: false,
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
