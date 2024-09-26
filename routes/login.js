const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();


router.post('/', loginController.login);
router.post('/register', loginController.register);
router.get('/checkEmpty', loginController.checkEmpty);  

module.exports = router;