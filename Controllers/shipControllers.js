const Ship = require("../Models/shipModel")

const createShip = async (req, res) => {

    const {companyName, address, gstNo, contactPerson, contactNo, email, site} = req.body
    console.log(req.body)
    try {   
        if (!companyName || !address || !gstNo || !contactPerson || !contactNo || !email || !site) {
            return res.status(400).json({ message: 'All fields are mandatory.' });
        }
        else{
            const shipRecords = new Ship({
                companyName: companyName,
                address: address,
                gstNo: gstNo,
                contactPerson: contactPerson,
                contactNo: contactNo,
                email: email,
                site: site
              });

              await shipRecords.save();

              res.status(201).json({ message: 'Ship Details Created Successfully..' });

        }
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const readAllShip = async (req, res) => {
    try {
        const ships = await Ship.find();
        res.status(200).json({ status: "success", ships: ships }); 
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });  
    }
}

const updateShip = async (req, res) =>{
    try {
        const id = req.params.id;
        const shipExist = await Ship.findOne({_id:id})
        if(!shipExist){
            return res.status(404).json({ message: 'Ship not found' });
        }
        else{
            const updatedShip = await Ship.findByIdAndUpdate(id, req.body, {new: true})
            res.status(201).json({ message: 'Ship details updated successfully', updatedShip });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const deleteShip = async (req, res) => {
    try {
        const deleteddShip = await Ship.findByIdAndDelete(req.params.id);

        if (!deleteddShip) {
            return res.status(404).json({ message: 'Ship not found' });
        } else {
            res.json({ message: 'Ship details deleted successfully', deleteddShip });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports = { createShip, readAllShip, updateShip, deleteShip};
