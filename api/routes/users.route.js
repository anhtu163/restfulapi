const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller')

router.get('/',controller.indexUser)
.post('/',controller.newUser);


module.exports = router;

