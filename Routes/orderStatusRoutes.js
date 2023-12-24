const express = require('express');
const {createStatus, updateStatus, readAllOrder, deleteOrder} = require("../Controllers/orderStatusController")

const router = express.Router();

router.post('/create', createStatus);
router.put('/update/:id', updateStatus)
router.get('/readAll', readAllOrder);
router.delete('/delete/:id', deleteOrder)


module.exports = router;