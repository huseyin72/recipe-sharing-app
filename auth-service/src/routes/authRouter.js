const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//REGISTER
router
    .route('/register')
    .post(authController.register);

//LOGIN
router
    .route('/login')
    .post(authController.login);


//LOGOUT
router
    .route('/logout')
    .get(authController.logout);


module.exports = router;