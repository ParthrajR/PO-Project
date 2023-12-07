const express = require('express');
const { createShip, readAllShip, updateShip, deleteShip } = require("../Controllers/shipControllers")

const router = express.Router();


router.post('/create', createShip);
router.get('/readAll', readAllShip)
router.put('/update/:id', updateShip)
router.delete('/delete/:id', deleteShip)


module.exports = router;