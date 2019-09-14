const express = require('express');

const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/order/create', orderController.postOrder);
router.get('/orders', orderController.getOrders);
router.delete('/orders/:id', orderController.deleteOrder)
router.patch('/orders/:id', orderController.updateOrder)
router.get('/orders/:id', orderController.getOrder)

module.exports = router;