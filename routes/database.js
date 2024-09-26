const express = require('express');
const router = express.Router();
const dbControlllers = require('../controllers/dbController');


router.get('/getList', dbControlllers.getEmployee);
router.post('/addEmployee', dbControlllers.createEmployee);
router.put('/updateEmployee/:id', dbControlllers.updateEmployee);
router.delete('/deleteEmployee/:id', dbControlllers.deleteEmployee);


module.exports = router;