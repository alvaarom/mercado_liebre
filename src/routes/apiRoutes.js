const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/products/list', apiController.list);


module.exports = router;