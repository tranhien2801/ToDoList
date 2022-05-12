const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/ct_login');

router.get('/register', loginController.register);
router.post('/register', loginController.p_register);
router.get('/', loginController.index); 
router.post('/', loginController.p_login);


module.exports = router;