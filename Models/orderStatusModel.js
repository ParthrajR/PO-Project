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
  vendorName: {
    type: String,
    required: true,
  },
  shipName: {
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
