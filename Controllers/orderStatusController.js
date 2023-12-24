const OrderStatus = require("../Models/orderStatusModel")

const createStatus = async (req, res) => {

    const {status, purchaseOrderNumber, generateDate, vendorName, shipName, total} = req.body
    try {
        if (!status || !purchaseOrderNumber || !generateDate || !vendorName || !shipName || !total) {
            return res.status(400).json({ message: 'All fields are mandatory.' });
        }
        else{
            const statusRecords = new OrderStatus({
                status: status,
                purchaseOrderNumber: purchaseOrderNumber,
                generateDate: generateDate,
                vendorName: vendorName,
                shipName: shipName,
                total: total,
              });

              await statusRecords.save();

              res.status(201).json({ message: 'Details Created Successfully..' });

        }
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });
    }

}

const updateStatus = async (req, res) =>{
    try {
        const id = req.params.id;
        const orderExist = await OrderStatus.findOne({_id:id})
        if(!orderExist){
            return res.status(404).json({ message: 'Order not found' });
        }
        else{
            const updatedOrder = await OrderStatus.findByIdAndUpdate(id, req.body)
            res.status(201).json({ message: 'Order status updated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

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