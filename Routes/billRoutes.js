const express = require('express');
const { createBill, readAllBill, updateBill, deleteBill} = require("../Controllers/billControllers")

const router = express.Router();


router.post('/create', createBill);
router.get('/readAll', readAllBill)
router.delete('/delete/:id', deleteBill)
router.put('/update/:id', updateBill)

module.exports = router;