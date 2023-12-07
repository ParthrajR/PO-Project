const express = require('express');
const { createVender, readAllVender, deleteVender, updateVender } = require("../Controllers/venderControllers")

const router = express.Router();


router.post('/create', createVender);
router.get('/readAll', readAllVender)
router.delete('/delete/:id', deleteVender)
router.put('/update/:id', updateVender)

module.exports = router;