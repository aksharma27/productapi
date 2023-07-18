const express = require('express');
const {initDb, getSale} = require('../controller/prouctController');

const router = express.Router();

router.route('/init').get(initDb);
router.route('/getsale').get(getSale);

module.exports = router;