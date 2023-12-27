const OrderStatus = require("../Models/orderStatusModel")
const Vender = require("../Models/venderModel")
const Ship = require("../Models/shipModel")
const Bill = require("../Models/billModel")
const ShipVia = require("../Models/shipViaModel")
const Item = require("../Models/itemModel")

// const { ObjectId } = require('mongoose').Types;


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

        // Find multiple items based on itemId array
        const itemData = await Item.find({ _id: { $in: itemId } });

        // Create an array of item objects
        const items = itemData.map(({ _id, itemCode, desc, expectedDate, qty, uom, unitPrice, disc, netRate, receivedMaterial, receivedDate }) => ({
            _id,
            itemCode,
            desc,
            expectedDate,
            qty,
            uom,
            unitPrice,
            disc,
            netRate,
            receivedMaterial,
            receivedDate
        }));

        const statusRecords = new OrderStatus({
            status,
            purchaseOrderNumber,
            generateDate,
            vendorId: venderData,
            shipId: shipData,
            billId: BillData,
            itemId: items, // Assign the array of item objects
            orderId: orderData,
            total,
        });

        console.log(statusRecords);

        await statusRecords.save();

        res.status(201).json({ message: 'Details Created Successfully..', statusRecords });
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
            // Map receivedMaterial and receivedDate values from items array
            const receivedMaterials = item.map((singleItem) => singleItem.receivedMaterial);
            const receivedDates = item.map((singleItem) => singleItem.receivedDate);

            const updatedOrder = await OrderStatus.findByIdAndUpdate(orderId, {
                status,
                $set: { 
                    receivedMaterials: receivedMaterials,
                    receivedDates: receivedDates,
                },
            }, { new: true });

            // Update each item in the array
            for (const singleItem of item) {
                const itemId = singleItem._id;
                const material = singleItem.receivedMaterial;
                const date = singleItem.receivedDate;

                console.log("Updating item:", itemId, material, date);

                const itemExist = await Item.findOne({ _id: itemId });

                if (!itemExist) {
                    console.log(`Item ${itemId} not found`);
                    // Handle the case where the item is not found
                } else {
                    // Update the item with receivedMaterial and receivedDate
                    const updatedItem = await Item.findByIdAndUpdate(itemId, { receivedMaterial: material, receivedDate: date });
                    console.log(`Item ${itemId} updated successfully`);

                    const updateStatus = await OrderStatus.findOne({ _id: orderId })
                    console.log(updateStatus)
                    const itemData = await Item.find({ _id: { $in: updateStatus.itemId } });
                    console.log("uuuuuuuu", itemData)
                    const upDateStatus = await OrderStatus.findOneAndUpdate(
                        {_id: orderId},
                        {$set : {itemId: itemData}}
                    )
                    await Item.findByIdAndUpdate(itemId, { receivedMaterial: " ", receivedDate: " " });
                    console.log("updateDaataaaaa", upDateStatus)
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