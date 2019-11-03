const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller')
const controllerLogin = require('../controllers/auth.controller')

router.post('/register',controller.newUser);
router.post('/login',controllerLogin.authLogin);
router.post('/update',controller.updateUser);
router.post('/changepass',controller.changePassUser);
router.get('/me',controller.getInforUser)
module.exports = router;

