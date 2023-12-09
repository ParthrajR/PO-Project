const express = require('express');
const { createItem, readAllItem, updateItem, deleteItem} = require("../Controllers/itemController")


const router = express.Router();

router.post('/create', createItem);
router.get('/readAll', readAllItem);
router.put('/update/:id', updateItem)
router.delete('/delete/:id', deleteItem)



module.exports = router;