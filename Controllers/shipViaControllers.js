const ShipVia = require("../Models/shipViaModel")

const createShipVia = async (req, res) => {

    const {shipVia, deliveryAt, shippingTerms, purchaseDate, purchaseOrderNo} = req.body
    console.log(req.body)
    try {   
        if (!shipVia || !deliveryAt || !shippingTerms) {
            return res.status(400).json({ message: 'All fields are mandatory.' });
        }
        else{
            const shipViaRecords = new ShipVia({
                shipVia: shipVia,
                deliveryAt: deliveryAt,
                shippingTerms: shippingTerms,
                purchaseDate: purchaseDate,
                purchaseOrderNo: purchaseOrderNo,
              });

              await shipViaRecords.save();

              res.status(201).json({ message: 'Order Details Created Successfully..' });

        }
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const readAllShipVia = async (req, res) => {
    try {
        const ships = await ShipVia.find();
        res.status(200).json({ status: "success", ships: ships }); 
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });  
    }
}

const updateShipVia = async (req, res) =>{
    try {
        const id = req.params.id;
        const shipExist = await ShipVia.findOne({_id:id})
        if(!shipExist){
            return res.status(404).json({ message: 'Order not found' });
        }
        else{
            const updatedShip = await ShipVia.findByIdAndUpdate(id, req.body, {new: true})
            res.status(201).json({ message: 'Ship details updated successfully', updatedShip });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const deleteShipVia = async (req, res) => {
    try {
        const deleteddShip = await ShipVia.findByIdAndDelete(req.params.id);

        if (!deleteddShip) {
            return res.status(404).json({ message: 'Order not found' });
        } else {
            res.json({ message: 'Order details deleted successfully', deleteddShip });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createShipVia, readAllShipVia, updateShipVia, deleteShipVia };
