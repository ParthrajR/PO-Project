const Item = require("../Models/itemModel")

const createItem = async (req, res) => {

    const {itemCode, desc, expectedDate, qty, uom, netRate, receivedMaterial, receivedDate} = req.body
    console.log(req.body)
    try {   
        if (!itemCode || !desc || !expectedDate || !qty || !uom || !netRate) {
            return res.status(400).json({ message: 'All fields are mandatory.' });
        }
        else{
            const billRecords = new Item({
                itemCode: itemCode,
                desc: desc,
                expectedDate: expectedDate,
                qty: qty,
                uom: uom,
                netRate: netRate,
                receivedMaterial:receivedMaterial,
                receivedDate: receivedDate
              });

              await billRecords.save();

              res.status(201).json({ message: 'Item Details Created Successfully..' });

        }
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const readAllItem = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.status(200).json({ status: "success", items: items }); 
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });  
    }
}

const updateItem = async (req, res) =>{
    try {
        const id = req.params.id;
        const itemExist = await Item.findOne({_id:id})
        if(!itemExist){
            return res.status(404).json({ message: 'Item not found' });
        }
        else{
            const updatedItem = await Item.findByIdAndUpdate(id, req.body, {new: true})
            res.status(201).json({ message: 'Item details updated successfully', updatedItem });
        }
    } catch (error) {
       console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item deleted successfully', deletedItem });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }           
};

module.exports = { createItem, readAllItem, updateItem, deleteItem };
