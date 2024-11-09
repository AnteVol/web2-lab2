const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');

router.post('/api/login', authController.login);
router.post('/api/logout', authController.logout);

router.get('/api/protected-data', dataController.getProtectedData);
router.post('/api/comments', dataController.handleComments);

module.exports = router;