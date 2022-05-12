const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/ct_search');
const K = require('../app/controllers/ct_checkaccess'); // kiểm tra truy cập

router.get('/type', Controller.getTypes);
router.get('/', Controller.search);

module.exports = router;