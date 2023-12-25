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
    type: Object,
    required: true,
  },
  shipId: {
    type: Object,
    required: true,
  },
  orderId: {
    type: Object,
    required: true,
  },
  itemId: {
    type: [Object], // Array of item IDs
    required: true,
  },
  billId: {
    type: Object,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

module.exports = OrderStatus;
