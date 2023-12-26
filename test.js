const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB
const Order = require('./models/Order'); // Import your Order model

// Assuming newItemIdArray is the new array of items with updated values
const newItemIdArray = [
  {
    _id: new ObjectId('65882738bb57da57905df2c1'),
    itemCode: '15965',
    desc: 'cscsc',
    expectedDate: 'cscsccscsc',
    qty: 'cscs',
    uom: 'cscs',
    unitPrice: 'cscs',
    disc: 'cscs',
    netRate: 'cscs',
    receivedMaterial: 'Parthhhhhh',
    receivedDate: '26/12/2023',
    createdAt: new Date('2023-12-24T12:42:32.490Z'),
    updatedAt: new Date('2023-12-26T04:15:27.951Z'),
    __v: 0
  },
  {
    _id: new ObjectId('658950a1b93785a9a622c464'),
    itemCode: '15965',
    desc: 'cscsc',
    expectedDate: 'cscsccscsc',
    qty: 'cscs',
    uom: 'cscs',
    unitPrice: 'cscs',
    disc: 'cscs',
    netRate: 'cscs',
    receivedMaterial: 'Anjali',
    receivedDate: '26/12/2023',
    createdAt: new Date('2023-12-25T09:51:29.494Z'),
    updatedAt: new Date('2023-12-26T04:15:28.055Z'),
    __v: 0
  }
];

const orderId = '658a5226a5da4ae30bfd9c2c'; // Replace with the actual order ID

// Update the order in the database
Order.findOneAndUpdate(
  { _id: orderId },
  { $set: { itemId: newItemIdArray } },
  { new: true },
  (err, updatedOrder) => {
    if (err) {
      console.error(err);
      // Handle the error
      return;
    }

    // Handle the case where the order is not found
    if (!updatedOrder) {
      console.log('Order not found');
      return;
    }

    console.log('Order updated successfully:', updatedOrder);
    // Perform any additional actions if needed
  }
);
