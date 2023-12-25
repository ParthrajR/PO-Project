const Vender = require("../Models/venderModel")


const createVender = async (req, res) => {


    const {companyName, address, gstNo, contactPerson, contactNo, email, site} = req.body
    console.log(req.body)
    try {   
        if (!companyName || !address || !gstNo || !contactPerson || !contactNo || !email || !site) {
            return res.status(400).json({ message: 'All fields are mandatory.' });
        }
        else{
            const venderRecords = new Vender({
                companyName: companyName,
                address: address,
                gstNo: gstNo,
                contactPerson: contactPerson,
                contactNo: contactNo,
                email: email,
                site: site
              });

              await venderRecords.save();

              res.status(201).json({ message: 'Vender Details Created Successfully..' });

        }
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const readAllVender = async (req, res) => {
    try {
        const venders = await Vender.find().sort({ createdAt: -1 });
        res.status(200).json({ status: "success", venders: venders }); 
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });  
    }
}

const deleteVender = async (req, res) => {
    try {
        const deletedVender = await Vender.findByIdAndDelete(req.params.id);

        if (!deletedVender) {
            return res.status(404).json({ message: 'Vender not found' });
        } else {
            res.json({ message: 'Vender deleted successfully', deletedVender });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateVender = async (req, res) =>{
    try {
        const id = req.params.id;
        const venderExist = await Vender.findOne({_id:id})
        if(!venderExist){
            return res.status(404).json({ message: 'Vender not found' });
        }
        else{
            const updateVender = await Vender.findByIdAndUpdate(id, req.body, {new: true})
            res.status(201).json({ message: 'Vender updated successfully', updateVender });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = { createVender, readAllVender, deleteVender, updateVender };
