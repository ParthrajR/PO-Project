const Bill = require("../Models/billModel")

const createBill = async (req, res) => {

    const {CompanyName, Address, GSTNo, ContactPerson, ContactNo, Email, Site} = req.body
    console.log(req.body)
    try {   
        if (!CompanyName || !Address || !GSTNo || !ContactPerson || !ContactNo || !Email || !Site) {
            return res.status(400).json({ message: 'All fields are mandatory.' });
        }
        else{
            const billRecords = new Bill({
                companyName: CompanyName,
                address: Address,
                gstNo: GSTNo,
                contactPerson: ContactPerson,
                contactNo: ContactNo,
                email: Email,
                site: Site
              });

              await billRecords.save();

              res.status(201).json({ message: 'Bill Details Created Successfully..' });

        }
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const readAllBill = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json({ status: "success", bills: bills }); 
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Something went wrong' });  
    }
}

const updateBill = async (req, res) =>{
    try {
        const id = req.params.id;
        const BillExist = await Bill.findOne({_id:id})
        if(!BillExist){
            return res.status(404).json({ message: 'Bill not found' });
        }
        else{
            const updatedBill = await Bill.findByIdAndUpdate(id, req.body, {new: true})
            res.status(201).json({ message: 'Bill updated successfully', updatedBill });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const deleteBill = async (req, res) => {
    try {
        const deleteddBill = await Bill.findByIdAndDelete(req.params.id);

        if (!deleteddBill) {
            return res.status(404).json({ message: 'Bill not found' });
        } else {
            res.json({ message: 'Bill deleted successfully', deleteddBill });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createBill, readAllBill, updateBill, deleteBill };
