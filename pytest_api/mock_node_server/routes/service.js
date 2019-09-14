const express = require('express');

const serviceController = require('../controllers/serviceController');
const router = express.Router();

router.post('/service/create', serviceController.postService);
router.get('/servicies', serviceController.getServicies);
module.exports = router;