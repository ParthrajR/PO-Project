const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'inprogress',
    required: true,
  },
  purchaseOrderNumber: {
    type: String,
    required: true,
  },
  generateDate: {
    type: String,
    required: true,
  },
  vendorId: {
    type: String,
    required: true,
  },
  shipId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  itemId: {
    type: [String], // Array of item IDs
    required: true,
  },
  billId: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

module.exports = OrderStatus;
