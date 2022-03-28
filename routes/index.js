const express = require('express');

const router = express.Router();
const getUser = require('../controllers/users.controller')

router.get('/',getUser.getUserData);



module.exports= router;