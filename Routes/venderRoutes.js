const express = require('express');
const { createVender, readAllVender, deleteVender } = require("../Controllers/venderControllers")

const router = express.Router();


router.post('/create', createVender);
router.get('/readAll', readAllVender)
router.delete('/delete/:id', deleteVender)

module.exports = router;