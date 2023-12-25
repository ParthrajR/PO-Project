const OrderStatus = require("../Models/orderStatusModel")
const Vender = require("../Models/venderModel")
const Ship = require("../Models/shipModel")
const Bill = require("../Models/billModel")
const ShipVia = require("../Models/shipViaModel")
const Item = require("../Models/itemModel")


const createStatus = async (req, res) => {
    const { status, purchaseOrderNumber, generateDate, vendorId, shipId, billId, itemId, orderId, total } = req.body;
  
    try {
      if (!status || !purchaseOrderNumber || !generateDate || !vendorId || !shipId || !total) {
        return res.status(400).json({ message: 'All fields are mandatory.' });
      }
  
      // Assuming _id is of type ObjectId, fetch data from the Vender collection
      const venderData = await Vender.findById(vendorId);
      const shipData = await Ship.findById(shipId);
      const BillData = await Bill.findById(billId);
      const orderData = await ShipVia.findById(orderId);
      const itemData = await Item.find({ _id: { $in: itemId } });


      console.log("itemData", itemData)
  
      const statusRecords = new OrderStatus({
        status: status,
        purchaseOrderNumber: purchaseOrderNumber,
        generateDate: generateDate,
        vendorId: venderData,
        shipId: shipData,
        billId: BillData,
        itemId: itemData,
        orderId: orderData,
        total: total,
      });
  
      console.log(statusRecords);
  
      await statusRecords.save();
  
      res.status(201).json({ message: 'Details Created Successfully..' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  const updateStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status, item } = req.body;

        // Update OrderStatus
        const orderExist = await OrderStatus.findOne({ _id: orderId });
        if (!orderExist) {
            return res.status(404).json({ message: 'Order not found' });
        } else {
            const updatedOrder = await OrderStatus.findByIdAndUpdate(orderId, {
                status,
                $set: { // Update the fields in the orderStatus model
                    receivedMaterial: item.map((singleItem) => singleItem.receivedMaterial),
                    receivedDate: item.map((singleItem) => singleItem.receivedDate),
                },
            }, { new: true });

            // Update each item in the array
            for (const singleItem of item) {
                const itemId = singleItem.itemId;
                const material = singleItem.receivedMaterial;
                const date = singleItem.receivedDate;

                console.log("Updating item:", itemId, material, date);

                const itemExist = await Item.findOne({ _id: itemId });

                if (!itemExist) {
                    console.log(`Item ${itemId} not found`);
                    // Handle the case where the item is not found
                } else {
                    // Update the item with receivedMaterial and receivedDate
                    // await OrderStatus.findByIdAndUpdate(itemId, { receivedMaterial: material, receivedDate: date });
                    const updatedItem = await Item.findByIdAndUpdate(itemId, { receivedMaterial: material, receivedDate: date });
                    // const orders = await OrderStatus.find();

                    console.log(`Item ${itemId} updated successfully`);
                }
            }

            res.status(201).json({ message: 'Order status and Item details updated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};





const readAllOrder = async (req, res) => {
    try {
       
        const orders = await OrderStatus.find();

        res.status(200).json({ status: "success", orders: orders }); 
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });  
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderStatus.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        } else {
            res.json({ message: 'Order details deleted successfully'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {createStatus, updateStatus, readAllOrder, deleteOrder}