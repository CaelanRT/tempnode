const express = require('express');

const {readData, getLatest} = require('../controllers/data');


const router = express.Router();

// data route
router.route('/').post(readData).get(getLatest);

module.exports = router;