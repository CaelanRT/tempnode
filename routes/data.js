const express = require('express');

const readData = require('../controllers/data');

const router = express.Router();

//still need to do things
router.route('/').post(readData);

module.exports = router;