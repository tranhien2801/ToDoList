const express = require('express');
const router = express.Router();

const DataController = require('../app/controllers/ct_todolist');
const K = require('../app/controllers/ct_checkaccess'); // kiểm tra truy cập

router.get('/get_list', DataController.get_list);
router.get('/get_step', DataController.get_steps);
router.get('/get_substep', DataController.get_substeps);
router.get('/get_author', DataController.get_author);
router.get('/get_comment', DataController.get_comments);
router.get('/get_vote', DataController.get_vote);
router.post('/make_comment', DataController.make_comment);
router.post('/make_vote', DataController.make_vote);
router.post('/set_list', DataController.set_list);
router.post('/download', DataController.increase_download);

module.exports = router;