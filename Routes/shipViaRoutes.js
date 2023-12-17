const express = require('express');
const { createShipVia, readAllShipVia, updateShipVia, deleteShipVia } = require("../Controllers/shipViaControllers")

const router = express.Router();


router.post('/create', createShipVia);
router.get('/readAll', readAllShipVia)
router.put('/update/:id', updateShipVia)
router.delete('/delete/:id', deleteShipVia)


module.exports = router;