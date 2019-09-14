const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/users/signup', authController.signUp);
router.post('/users/signin', authController.signIn);
router.delete('/users/:id', authController.deleteUser);
//get routers
router.get('/users', authController.getUsers);

module.exports = router;